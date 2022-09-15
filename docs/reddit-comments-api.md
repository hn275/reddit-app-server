# Reddit Comments API

Docs concerning all comments/replies related object.

## GET request endpoint

### Comment

`/comments/:article-id`

Where `article-id` could be a comment that contains replies, or a reply itself.

The `comments` object sent back is an array of comments.

Relevant data being extracted (for each comment, and their sub-comments/replies)

- `id`: string, this would be used to fetch more comments/response, if any.
- `author`: string, username of author.
- `body`: the actual comment itself.
- `voteScore`: upvote count.
- `replies`: null | array of string, containing the `id`'s of the replies, if any.

### Replies

`/comments/:article-id/:reply-id`

Where the additional `reply-id` is the response of `article-id`, the return object
is **identical** to the `comments` object above.
