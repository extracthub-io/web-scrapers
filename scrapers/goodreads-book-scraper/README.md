# Goodreads Book Scraper (book page)

Turn a Goodreads book page into JSON: book id, title, series, authors and other contributors with their Goodreads
links, average rating, ratings and reviews counts, the 5-to-1 star distribution, description (text and HTML),
genres, pages, format, publication info, publisher, language, ISBN / ISBN-13 / ASIN, awards and cover image. Good
for book databases, reading and recommendation apps, publishing research and tracking ratings over time.

**Catalog:** [extracthub.io/extractor/@extracthub1/goodreads-book](https://extracthub.io/extractor/@extracthub1/goodreads-book)
**Extractor id:** `@extracthub1/goodreads-book@1` · **Price:** $0.0025 per page

## Input

A Goodreads book page:

```
https://www.goodreads.com/book/show/<book-id>
```

e.g. `https://www.goodreads.com/book/show/5907.The_Hobbit`.

## Output

| Field | Type | Description |
|---|---|---|
| `bookId` | number \| null | Goodreads book (edition) id, e.g. `5907` |
| `title` | string | e.g. `The Hobbit, or There and Back Again` |
| `url` | string | canonical book link |
| `series` | string \| null | series and number, e.g. `Middle Earth #1` |
| `seriesUrl` | string \| null | series page |
| `author` | string \| null | main author, e.g. `J.R.R. Tolkien` |
| `contributors[]` | array | all authors, editors, illustrators and translators of this edition |
| `contributors[].name` | string | e.g. `Douglas A. Anderson` |
| `contributors[].url` | string | Goodreads author page |
| `rating` | number \| null | average rating out of 5, e.g. `4.3` |
| `ratingsCount` | number \| null | e.g. `4669436` |
| `reviewsCount` | number \| null | text reviews, e.g. `96411` |
| `ratingDistribution[]` | array | one entry per star level, 5 to 1 |
| `ratingDistribution[].stars` | number | `5` ... `1` |
| `ratingDistribution[].count` | number \| null | ratings with this many stars, e.g. `2532426` |
| `ratingDistribution[].percent` | number \| null | share in %, e.g. `54` |
| `description` | string \| null | book description as text |
| `descriptionHtml` | string \| null | book description with its line breaks and formatting |
| `genres` | string[] | top genres, e.g. `["Fantasy", "Classics", "Fiction", ...]` |
| `pages` | number \| null | e.g. `366` |
| `format` | string \| null | e.g. `Paperback`, `Hardcover`, `Kindle Edition` |
| `pagesFormat` | string \| null | as shown, e.g. `366 pages, Paperback` |
| `publicationInfo` | string \| null | e.g. `First published September 21, 1937` |
| `publisher` | string \| null | publisher of this edition, e.g. `Houghton Mifflin` |
| `language` | string \| null | e.g. `English` |
| `isbn` | string \| null | ISBN of this edition, when Goodreads has one |
| `isbn13` | string \| null | ISBN-13 of this edition, e.g. `9780439023481` |
| `asin` | string \| null | Amazon ASIN, e.g. `B0DN8P5BQF` |
| `awards` | string \| null | awards as one text, e.g. `Keith Barker Millennium Book Award (2000), ...` |
| `coverImage` | string \| null | cover image URL |

Full example: [sample-output.json](sample-output.json) (The Hobbit page above; description shortened).

## Quick start

```bash
curl -G "https://api.extracthub.io/api/extractor/extract" \
  -H "Authorization: Bearer $EXTRACTHUB_API_KEY" \
  --data-urlencode "extractor_id=@extracthub1/goodreads-book@1" \
  --data-urlencode "target_url=https://www.goodreads.com/book/show/5907.The_Hobbit"
```

With an AI agent (ExtractHub MCP connected):
> Use `@extracthub1/goodreads-book@1` on these Goodreads book pages and make a table with the title, author, rating,
> ratings count, pages, first publication date and top 3 genres.

More: [REST API guide](../../docs/api.md) · [AI agent guide](../../docs/ai-agents.md)

## Good to know

- **Plain fetch:** title, series, rating, star distribution, description and genres come from the page HTML;
  counts, pages, format, language, awards and contributors from the schema.org Book data; publisher, ISBN-13 and
  ASIN from the page's own book data. No browser is needed, fetched through a US proxy.
- **Editions:** a Goodreads book id is one edition. Publisher, ISBN, format and pages belong to that edition;
  rating, ratings count and genres are shared by all editions of the work.
- **Missing ISBNs:** many editions (Kindle, some paperbacks such as the Hobbit example) have no ISBN on Goodreads;
  `isbn` / `isbn13` are `null` then, `asin` often still has a value.
- **Genres:** the top genres the page shows (usually 7), not every shelf.
- **Reviews:** only the counts and the star distribution; review texts and reviewer names are not extracted.
- **Removed books / bot checks:** a page without title or url fails with HTTP 422 `required_fields_missing` and is
  still charged. Batches retry it once.

## Files

- [`extractor.json`](extractor.json): the extractor definition (plain fetch through a US proxy)
- [`sample-output.json`](sample-output.json): output on a real book page
