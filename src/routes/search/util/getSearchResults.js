const getMedia = (mediaObject) => {
  /**
   * parse media object fed by getSearchResults function
   * @params {object} mediaObject
   * returns an object as per doc
   */
  try {
    const media = mediaObject.reddit_video;
    return {
      contentUrl: media.fallback_url,
      height: media.height,
      width: media.width,
    };
  } catch (err) {
    // Since we can only embed reddit video, everything else is linked to external source
    return null;
  }
};

export const getSearchResults = (searchArray) => {
  /**
   * parsed search results from searchRouter
   * @param {array} searchArray
   * returns an object as per doc
   */
  return searchArray.map((searchObject) => {
    const search = searchObject.data;
    return {
      id: search.id,
      title: search.title,
      subreddit: search.subreddit_name_prefixed,
      voteScore: search.ups,
      author: search.author,
      commentCount: search.num_comments,
      isVideo: search.is_video,
      url: search.url_overriden_by_dest || null,
      media: getMedia(search.media),
    };
  });
};
