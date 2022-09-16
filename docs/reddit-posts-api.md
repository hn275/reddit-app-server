# API for general posts

## Get request endpoints

Request should be made to `http://localhost:3001` as this is the dev server.

Available endpoints:

- `/:type`
- `/more`

## `/:type` endpoint

Can be one of the following:

- `/hot`
- `/rising`
- `/top`
- `/new`

## `/more` endpoint

To fetch more post, this endpoint also requires additional information attached
to the body of t he request.

- `type` (required): same as `/:type` endpoint.
- `after` (required): string, the `id` of the post post to fetch _after_.
- `count` (optional): number, default to 10.

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
- `url`: null || nested object
  - `isImage`: boolean, if the url ends with `jpg`, `jpeg`, `png`, `gif`.
  - `contentUrl`: string.
- `media`: null | objects, if `null` then no media is found or it is
  embedded with external source.
  - `height`: height of the video,
  - `width`: width of the video,
  - `contentUrl`: link to video
