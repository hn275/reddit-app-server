const getSearchType = (type) => {
  switch (type) {
    case 'subreddit':
      return 'sr';
    case 'posts':
      return 'links';
    default:
      return false;
  }
};

module.exports = getSearchType;
