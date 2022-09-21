const searchRouter = require('express').Router();
const axios = require('axios');
const getWhiteSpace = require('./utils/getWhiteSpace');
const getSearchResults = require('./utils/getSearchResults');
const URL = require('../url');
const getSearchType = require('./utils/getSearchType');

searchRouter.get('/', async (req, res, next) => {
  try {
    // sanitize search string
    const { search, type } = req.body;
    if (!search || !type) {
      const error = new Error(
        'Missing search query, required `search` and `searchType`'
      );
      error.status = 400;
      return next(error);
    }

    const searchParsed = getWhiteSpace(search);
    const typeParsed = getSearchType(type);

    let fetchingUrl = URL;
    fetchingUrl += '/search.json';
    fetchingUrl += `?q=${searchParsed}`;
    fetchingUrl += `&limit=15`;
    fetchingUrl += '&sort=top';
    fetchingUrl += '&t=week';

    const redditResponse = await axios.get(fetchingUrl);
    const redditData = redditResponse.data.data.children;
    res.json(getSearchResults(redditData));
  } catch (error) {
    return next(error);
  }
});

module.exports = searchRouter;
