# API for general posts

## Get request endpoints

Request should be made to `http://localhost:3001` as this is the dev server.

Available endpoints:

- `/hot`
- `/top`
- `/rising`
- `/new`

## API Responses

API responses with an **array of objects**.

The following data has been extracted and are contained within each (mentioned) object:

- `title`: string.
- `subreddit`: string.
- `voteScore`: number.
- `id`: string.
- `author`: string.
- `commentCount`: number.
- `isVideo`: boolean.
- `url`: null | string, link to content media.
- `media`: null | objects, if `null` then no media is found or it is
  embedded with external source.
  - `height`: height of the video,
  - `width`: width of the video,
  - `contentUrl`: link to video
