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

const parseUrl = (urlObject) => {
  /**
   * This function parse incoming url to determine if it's an image or
   * just an external link to external content
   * @params {string} urlObject: url to a reddit source, external or internal
   * return: if urlObject is not supplied then `null`, else it's a nested object with props
   */
  if (!urlObject) return null;

  const imgReg = /\.(jpg|jpeg|png|gif)$/;
  return {
    isImage: imgReg.test(urlObject),
    contentUrl: urlObject,
  };
};

const parseResponse = (responseJson) => {
  /**
   * @params {object} responseJson: json object received from get request
   * return: filtered out data, extracting relavent information
   * (check getAPI.md in docs)
   */
  const responsePosts = responseJson.data.children;
  const allParsedPost = responsePosts.map((postInfo) => {
    const post = postInfo.data; // data per post
    return {
      type: 't3',
      title: post.title,
      subreddit: post.subreddit_name_prefixed,
      voteScore: post.score,
      id: post.id,
      url: parseUrl(post.url_overridden_by_dest),
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
