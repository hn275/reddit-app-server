# API for general posts

- `hot`
- `top`
- `rising`
- `new`

## Need to extract

Objects nest: `reponse.data.children[].data`

- `title`: string, post title.
- `over_18`: boolean, NSFW content.
- `subreddit_name_prefixed`: string, subreddit name.
- `score`: number, number of votes.
- `created`: Date instance.
- `id`: string, id of the post.
- `author`: string, author.
- `num_comments`: number, number of comments.
- `is_video`: boolean, is it a video?. Note that some posts will have links to view the actual video
  content in an external website, in this case the post would have a `media.oembeded` property
  and `is_video` property is false.
- `url`: string, link to the actual post.
- `url_overridden_by_dest`: `undefined` || string, undefined if no media, otherwise link to video or image
- `media`: `null || (oembeded || reddit_video)`, if `null` then it is not a video.
  - `oembeded`
    - `height`: height of thumbnail
    - `width`: width of thumbnail
    - `thumbnail_url`: string, thumbnail url
  - `reddit_video`
    - `height`: height of the video.
    - `width`: width of the video.
    - `fallback_url`: string, url to video.
