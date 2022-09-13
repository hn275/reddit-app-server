const parseMedia = (mediaObject) => {
  /**
   * @params {object} mediaObject: got from post.media
   */
  try {
    const redditVideo = mediaObject.reddit_video || undefined;
    return {
      height: redditVideo.height,
      width: redditVideo.width,
      contentUrl: redditVideo.fallback_url,
    };
  } catch (e) {
    return null;
  }
};

const parseResponse = (responseJson) => {
  /**
   * @params {object} responseJson: json object received from get request
   * return: filtered out data, extracting relavent information
   * (check getAPI.md in docs)
   */
  const responsePosts = responseJson.data.children;
  // console.log(responsePosts)
  const allParsedPost = responsePosts.map((postInfo) => {
    const post = postInfo.data;
    return {
      type: 't3',
      title: post.title,
      subreddit: post.subreddit_name_prefixed,
      voteScore: post.score,
      id: post.id,
      url: post.url || null,
      author: post.author,
      commentCount: post.num_comments,
      isVideo: post.is_video,
      media: parseMedia(post.media),
    };
  });
  return allParsedPost;
};

module.exports = {
  parseResponse: parseResponse,
};