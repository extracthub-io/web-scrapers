#!/usr/bin/env node
// Reads the health status of every extractor listed in the root README.md (free get_extractor calls).
//
//   node scripts/check-health.mjs              # print a table, write notes/health/latest.json
//   node scripts/check-health.mjs --precheck   # exit 0 when an ACTIVE major is broken/degraded, else exit 1
//   node scripts/check-health.mjs google-serp  # only ids containing this text
//
// Health per major comes from ExtractHub's probes (get_extractor majors[].health_status):
//   healthy | degraded | broken | blocked | unknown (not probed yet). Only active majors count as "unhealthy";
//   deprecated majors are reported but never trigger the precheck.
// The API key comes from EXTRACTHUB_API_KEY or .claude/settings.local.json; it is never printed.

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const precheck = args.includes('--precheck');
const filter = args.find((a) => !a.startsWith('--'));
// Anything but healthy / unknown needs a look (seen so far: degraded, broken, blocked).
const OK = new Set(['healthy', 'unknown']);
const isBad = (h) => !OK.has(h);

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

const key = apiKey();
if (!key) {
	console.error('EXTRACTHUB_API_KEY is not set (environment or .claude/settings.local.json).');
	process.exit(2);
}
const endpoint = process.env.EXTRACTHUB_MCP_URL || 'https://api.extracthub.io/mcp';
let session = null;
let nextId = 1;

async function post(message) {
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
}

async function tool(name, a) {
	const m = await post({ jsonrpc: '2.0', id: nextId++, method: 'tools/call', params: { name, arguments: a } });
	const t = (m.result?.content ?? []).filter((c) => c.type === 'text').map((c) => c.text).join('\n');
	if (m.result?.isError) throw new Error(t.slice(0, 200));
	return JSON.parse(t);
}

const readme = readFileSync(join(root, 'README.md'), 'utf8');
const ids = [...new Set(readme.match(/@extracthub1\/[a-z0-9-]+/g) ?? [])].filter((id) => !filter || id.includes(filter)).sort();

await post({ jsonrpc: '2.0', id: nextId++, method: 'initialize', params: { protocolVersion: '2025-06-18', capabilities: {}, clientInfo: { name: 'check-health', version: '1.0.0' } } });
await post({ jsonrpc: '2.0', method: 'notifications/initialized' });

const rows = [];
for (const id of ids) {
	let info;
	for (let attempt = 1; attempt <= 3 && !info; attempt++) {
		try {
			info = await tool('get_extractor', { extractor_id: id });
		} catch (e) {
			if (attempt === 3) rows.push({ id, error: String(e.message || e) });
		}
	}
	if (!info) continue;
	for (const m of info.majors ?? []) {
		rows.push({
			id,
			pin: m.pin,
			version: m.latest_version,
			status: m.status,
			health: m.health_status ?? 'unknown',
			target_url: info.target_url,
		});
	}
}

const unhealthy = rows.filter((r) => r.status === 'active' && isBad(r.health));
const errors = rows.filter((r) => r.error);
const report = { checked_at: new Date().toISOString(), extractors: ids.length, unhealthy, errors, rows };
mkdirSync(join(root, 'notes', 'health'), { recursive: true });
writeFileSync(join(root, 'notes', 'health', 'latest.json'), JSON.stringify(report, null, 2));

if (!precheck || unhealthy.length || errors.length) {
	for (const r of rows) {
		if (r.error) console.log(`ERROR    ${r.id}: ${r.error}`);
		else if (!precheck || (r.status === 'active' && isBad(r.health))) console.log(`${r.health.padEnd(9)}${r.pin} (${r.version}, ${r.status})`);
	}
}
console.log(`${ids.length} extractors, ${unhealthy.length} active major(s) unhealthy, ${errors.length} error(s). Report: notes/health/latest.json`);
// --precheck: run the automation only when something needs attention (lookup errors count too).
if (precheck) process.exit(unhealthy.length || errors.length ? 0 : 1);
