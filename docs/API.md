# API Requests

In development, request should be made to `http://localhost:3001` as this is the
dev server.

- [Posts](#posts)
- [Comments](#comments)
- [Search](#search)

## Posts

### GET requests

Available endpoints:

- `/:type`
- `/more`

#### `/:type` endpoint

Can be one of the following:

- `/hot`
- `/rising`
- `/top`
- `/new`

#### `/more` endpoint

To fetch more post, this endpoint also requires additional information attached
to the body of t he request.

- `type` (required): same as `/:type` endpoint.
- `after` (required): string, the `id` of the post post to fetch _after_.
- `count` (optional): number, default to 10.

### API Responses

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

## Comments

### GET request endpoint

#### Comment

    /comments/:article-id

Where `article-id` could be a comment that contains replies, or a reply itself.

The `comments` object sent back is an array of comments.

Relevant data being extracted (for each comment, and their sub-comments/replies)

- `id`: string, this would be used to fetch more comments/response, if any.
- `author`: string, username of author.
- `body`: the actual comment itself.
- `bodyHtml`: if this works with React, it would make styling a lot easier :/.
- `voteScore`: upvote count.
- `replies`: null | array of string, containing the `id`'s of the replies, if any.

#### Replies

This share the same endpoint, however, to fetch the comment of a parent
comment, a **query string** is needed in the form `?comment=${reponse-id}`

**Important**: the `article-id` is unchanged, since
all comments/responses belong to an article.

The full path:

    /comments/:article-id?comment=:comment-id

Where the additional `comment-id` is the response of `article-id`, the return object
is **identical** to the `comments` object above.

## Search

This endpoint only accept **GET** requests.

Though the response is almost identical to [posts](#posts), this end point has
different parameters.

### `/search` endpoint

When making a request to this endpoint, here are the required properties attached
to the `query strings` of the request.

- `search`: string, a regular string received from the client (don't have to worry
  about parsing whitespace, the server will replace all whitespaces with `%20`).
- `type`: can only be one of the following:
  - posts
  - subreddit

#### Response

Refer to [posts](#posts) response.

## Subreddits

### Available endpoints

- `/sr/popular`
- `/sr/new`
- `/sr/gold`
- `/sr/default`

### Response

API responses is an array of objects:

- `id`: useful to make a all posts search query for a specific subreddit.
- `display_name`: to display, as the format of `r/:whatever`.
- `subscribers`: number of subscribers.
