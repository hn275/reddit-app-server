const searchRouter = require('express').Router();
const axios = require('axios');
const getWhiteSpace = require('./utils/getWhiteSpace');
const URL = require('../url');

searchRouter.get('/', async (req, res, next) => {
  try {
    // sanitize search string
    const search = req.body.search;
    if (!search) {
      const error = new Error('Missing search query');
      error.status = 400;
      return next(error);
    }

    let fetchingUrl = URL;
    fetchingUrl += '/search.json';
    fetchingUrl += `?q=${getWhiteSpace(search)}`;
    fetchingUrl += `&limit=15`;
    fetchingUrl += '&sort=top';
    fetchingUrl += '&t=week';

    const redditResponse = await axios.get(fetchingUrl);
    res.json(redditResponse.data);
  } catch (e) {
    next(e);
  }
});

module.exports = searchRouter;
