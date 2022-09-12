const axios = require('axios');

const getPosts = async (postTypes) => {
  const URL = `https://www.reddit.com/${postTypes}.json`;
  const response = await axios.get(URL);
  return response;
};

module.exports = getPosts;
