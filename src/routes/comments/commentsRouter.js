const commentsRouter = require('express').Router();
const axios = require('axios');
const { parseComments } = require('./util');
const REDDIT_URL = require('../url');

commentsRouter.get('/:postId', async (req, res, next) => {
  const { postId } = req.params;
  let fetchingUrl = REDDIT_URL;
  fetchingUrl += '/comments';
  fetchingUrl += `/${postId}`;
  fetchingUrl += '.json';
  console.log("fetching comments for " + postId + " from " + fetchingUrl)
  try {
    const redditResponse = await axios.get(fetchingUrl);
    const parsedRedditResponse = parseComments(redditResponse.data);
    res.status(200).json(parsedRedditResponse);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = commentsRouter;
