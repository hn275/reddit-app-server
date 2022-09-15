# Reddit Comments API

Docs concerning all comments/replies related objects.

## GET request endpoint

### Comment

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

### Replies

This share the same endpoint, however, to fetch the comment of a parent
comment, a **query string** is needed in the form `?comment=${reponse-id}`

**Important**: the `article-id` is unchanged, since
all comments/responses belong to an article.

The full path:

    /comments/:article-id?comment=${comment-id}

Where the additional `reply-id` is the response of `article-id`, the return object
is **identical** to the `comments` object above.
