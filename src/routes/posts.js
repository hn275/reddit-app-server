const getPost = require('./util/getPosts.js');
const redditPosts = require('express').Router();

redditPosts.get('/', async (req, res) => {
  console.log('hot route hit');
  const response = await getPost('hot');
  console.log(response.data);
  res.status(200).json(response.data);
});

module.exports = redditPosts;
