const searchRouter = require('express').Router();
const axios = require('axios');
const getWhiteSpace = require('./utils/getWhiteSpace');
const getSearchResults = require('./utils/getSearchResults');
const URL = require('../url');
const getSearchType = require('./utils/getSearchType');

searchRouter.get('/', async (req, res, next) => {
  try {
    // Send back error if request body is missing data
    const { search, type } = req.body;
    if (!search || !type) {
      const error = new Error(
        'Missing search query, required `search` and `searchType`'
      );
      error.status = 400;
      return next(error);
    }

    const searchFormatted = getWhiteSpace(search);
    const typeFormatted = getSearchType(type);

    let fetchingUrl = URL;
    fetchingUrl += '/search.json';
    fetchingUrl += `?q=${searchFormatted}`;
    fetchingUrl += `&limit=15`;
    fetchingUrl += '&sort=top';
    fetchingUrl += '&t=week';
    fetchingUrl += `&type=${typeFormatted}`;

    const redditResponse = await axios.get(fetchingUrl);
    const redditData = redditResponse.data.data.children;
    res.json(getSearchResults(redditData));
  } catch (error) {
    return next(error);
  }
});

module.exports = searchRouter;
