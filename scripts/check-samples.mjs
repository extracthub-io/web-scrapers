#!/usr/bin/env node
// Checks that every scraper's example URL, README and sample output describe the SAME page.
//
//   node scripts/check-samples.mjs                 # all scrapers, local files only (free, no key)
//   node scripts/check-samples.mjs amazon-product  # only folders whose name contains this text
//   node scripts/check-samples.mjs --catalog       # also compare with the ExtractHub catalog (free get_extractor)
//
// Checks per scrapers/<name>-scraper/:
//   1. sample-output.json mentions the example URL's page (its id, or its search words).
//   2. README.md contains the example URL (extractor.json "url") and no other URL of the same page type
//      as a usage example ("e.g." line and Quick start curl).
//   3. --catalog: the catalog's target_url equals extractor.json "url", and the catalog sample output (what the
//      extractor page shows next to the preview HTML of target_url) mentions that page too.
// Exit code 1 when any check fails.
//
// The API key (only for --catalog) comes from EXTRACTHUB_API_KEY or .claude/settings.local.json; it is never
// printed or taken from the command line.

import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const useCatalog = args.includes('--catalog');
const filter = args.find((a) => !a.startsWith('--'));

const STOP = new Set([
	'www', 'com', 'org', 'net', 'html', 'htm', 'php', 'jsp', 'search', 'searchpage', 'sch', 'site', 'item', 'itm',
	'dp', 'jobs', 'review', 'reviews', 'homes', 'for', 'sale', 'the', 'and', 'https', 'http', 'store', 'apps',
	'details', 'app', 'watch', 'channel', 'videos', 'place', 'maps', 'en', 'us', 'id', 'hl', 'gl', 'page',
]);

// Tokens that identify the page: ids (letters+digits, 6+ chars, or long numbers) and search words.
function pageTokens(url) {
	const u = new URL(url);
	const parts = [...u.pathname.split('/'), ...[...u.searchParams.values()]]
		.map((p) => decodeURIComponent(p.replace(/\+/g, ' ')).toLowerCase());
	const words = parts.flatMap((p) => p.split(/[^a-z0-9]+/)).filter(Boolean);
	const ids = [...new Set(words.filter((w) => w.length >= 6 && /\d/.test(w)))];
	// "id324684580" -> also accept the bare number
	for (const w of [...ids]) for (const m of w.matchAll(/\d{6,}/g)) if (!ids.includes(m[0])) ids.push(m[0]);
	const terms = [...new Set(words.filter((w) => !STOP.has(w) && !ids.includes(w) && (w.length >= 3 || /^\d+$/.test(w))))];
	return { ids, terms };
}

// Does the sample mention the page? An id must appear; otherwise at least half the words.
function mentionsPage(sample, url) {
	const text = JSON.stringify(sample).toLowerCase();
	const { ids, terms } = pageTokens(url);
	if (ids.length) {
		const hit = ids.filter((id) => text.includes(id));
		return hit.length ? null : `none of the ids ${ids.join(', ')} from the example URL appears in it`;
	}
	if (!terms.length) return null; // nothing page-specific in the URL (e.g. a front page)
	const hit = terms.filter((t) => text.includes(t));
	return hit.length * 2 >= terms.length ? null : `it mentions only ${hit.length}/${terms.length} of the URL words (${terms.join(', ')})`;
}

// Same page = same ids (or, without ids, the same words); ignores hl/gl and other non-page parameters.
function samePage(a, b) {
	const x = pageTokens(a);
	const y = pageTokens(b);
	const key = (t) => (t.ids.length ? t.ids : t.terms).slice().sort().join(' ');
	return key(x) === key(y);
}

function apiKey() {
	if (process.env.EXTRACTHUB_API_KEY) return process.env.EXTRACTHUB_API_KEY;
	const file = join(root, '.claude', 'settings.local.json');
	if (existsSync(file)) {
		try {
			return JSON.parse(readFileSync(file, 'utf8'))?.env?.EXTRACTHUB_API_KEY;
		} catch {}
	}
	return undefined;
}

let mcp;
async function getExtractor(id) {
	if (!mcp) {
		const key = apiKey();
		if (!key) throw new Error('EXTRACTHUB_API_KEY is not set (needed for --catalog)');
		const endpoint = process.env.EXTRACTHUB_MCP_URL || 'https://api.extracthub.io/mcp';
		let session = null;
		let nextId = 1;
		const post = async (message) => {
			const res = await fetch(endpoint, {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${key}`,
					'Content-Type': 'application/json',
					Accept: 'application/json, text/event-stream',
					...(session ? { 'Mcp-Session-Id': session } : {}),
				},
				body: JSON.stringify(message),
			});
			session = res.headers.get('mcp-session-id') ?? session;
			const text = await res.text();
			if (!res.ok && res.status !== 202) throw new Error(`MCP HTTP ${res.status}`);
			if (message.id === undefined) return null;
			const blocks = /^\s*[{[]/.test(text)
				? [text]
				: text.split(/\r?\n\r?\n/).map((b) => b.split(/\r?\n/).filter((l) => l.startsWith('data:')).map((l) => l.slice(5)).join('\n'));
			for (const b of blocks) {
				try {
					const m = JSON.parse(b);
					if (m.id === message.id) return m;
				} catch {}
			}
			throw new Error('unexpected MCP response');
		};
		mcp = async (name, a) => {
			const m = await post({ jsonrpc: '2.0', id: nextId++, method: 'tools/call', params: { name, arguments: a } });
			const t = (m.result?.content ?? []).filter((c) => c.type === 'text').map((c) => c.text).join('\n');
			return JSON.parse(t);
		};
		await post({ jsonrpc: '2.0', id: nextId++, method: 'initialize', params: { protocolVersion: '2025-06-18', capabilities: {}, clientInfo: { name: 'check-samples', version: '1.0.0' } } });
		await post({ jsonrpc: '2.0', method: 'notifications/initialized' });
	}
	return mcp('get_extractor', { extractor_id: id });
}

// Outputs with nothing that identifies the page (checked by hand instead).
const UNVERIFIABLE = {
	'youtube-transcript-scraper': 'the transcript output has no video id or title',
};

const dirs = readdirSync(join(root, 'scrapers')).filter((d) => d.endsWith('-scraper') && (!filter || d.includes(filter)));
let failures = 0;

for (const d of dirs) {
	const dir = join(root, 'scrapers', d);
	const problems = [];
	if (UNVERIFIABLE[d]) {
		console.log(`skip ${d} (${UNVERIFIABLE[d]})`);
		continue;
	}
	if (!existsSync(join(dir, 'extractor.json'))) {
		console.log(`skip ${d} (no extractor.json)`);
		continue;
	}
	let def;
	let sample;
	let readme = '';
	try {
		def = JSON.parse(readFileSync(join(dir, 'extractor.json'), 'utf8'));
		sample = JSON.parse(readFileSync(join(dir, 'sample-output.json'), 'utf8'));
		readme = readFileSync(join(dir, 'README.md'), 'utf8');
	} catch (e) {
		problems.push(`cannot read files: ${e.message}`);
	}
	if (def && sample) {
		const url = def.url;
		const why = mentionsPage(sample, url);
		if (why) problems.push(`sample-output.json is not from ${url}: ${why}`);
		const readmeUrls = [...readme.matchAll(/https?:\/\/[^\s`")<>|]+/g)].map((m) => m[0]);
		if (!readme.includes(url) && !readmeUrls.some((u) => { try { return samePage(u, url); } catch { return false; } })) problems.push(`README.md does not contain the example URL ${url}`);

		// Other usage-example URLs on the same host and path type in README ("e.g." lines and curl target_url).
		const host = new URL(url).hostname;
		const firstSeg = new URL(url).pathname.split('/')[1];
		const exampleLines = readme.split('\n').filter((l) => !l.trimStart().startsWith('|') && /e\.g\.|target_url=/.test(l)); // not the Output table
		for (const l of exampleLines) {
			for (const m of l.matchAll(/https?:\/\/[^\s`")<>]+/g)) {
				let u;
				try {
					u = new URL(m[0]);
				} catch {
					continue;
				}
				if (u.hostname === host && u.pathname.split('/')[1] === firstSeg && !samePage(m[0], url)) {
					problems.push(`README.md uses another example page ${m[0]} (expected ${url})`);
				}
			}
		}

		if (useCatalog && def.slug) {
			const id = `@${def.owner ?? 'extracthub1'}/${def.slug}`;
			try {
				const info = await getExtractor(id);
				if (info.target_url !== url) problems.push(`catalog target_url ${info.target_url} differs from extractor.json url ${url}`);
				if (info.sample_output) {
					const w = mentionsPage(info.sample_output, info.target_url);
					if (w) problems.push(`catalog sample output is not from target_url ${info.target_url}: ${w}`);
				} else problems.push('catalog has no sample output');

				// Preview HTML: the page stored with the released version (public, no key). Missing when the
				// version was released from a batch item (batches store no page).
				const site = process.env.EXTRACTHUB_SITE || 'https://extracthub.io';
				const page = await (await fetch(info.page_url || `${site}/extractor/${id}`)).text();
				const src = page.match(/data-source-url="([^"]+)"/)?.[1];
				if (!src) problems.push('catalog page has no preview HTML slot');
				else {
					const res = await fetch(new URL(src, site));
					if (res.status === 204) problems.push('catalog has NO preview HTML (released from a batch item?)');
					else {
						const body = await res.json();
						const w = mentionsPage(body.content ?? '', info.target_url);
						if (w) problems.push(`catalog preview HTML is not the target_url page: ${w}`);
					}
				}
			} catch (e) {
				problems.push(`catalog check failed: ${e.message}`);
			}
		}
	}
	if (problems.length) {
		failures++;
		console.log(`FAIL ${d}`);
		for (const p of problems) console.log(`  - ${p}`);
	} else console.log(`ok   ${d}`);
}

console.log(failures ? `\n${failures} scraper(s) with mismatched example / sample.` : '\nAll samples match their example URL.');
process.exit(failures ? 1 : 0);
