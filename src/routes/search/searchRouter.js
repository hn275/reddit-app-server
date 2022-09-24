import { Router } from 'express';
import axios from 'axios';
import {
  getWhiteSpace,
  getSearchResults,
  getSearchType,
} from './util/index.js';
import REDDIT_URL from '../url.js';

const searchRouter = Router();
searchRouter.get('/', async (req, res, next) => {
  try {
    // Send back error if request body is missing data
    const { search, type } = req.query;
    if (!search || !type) {
      const error = new Error(
        'Missing search query, required `search` and `searchType`'
      );
      error.status = 400;
      return next(error);
    }

    const searchFormatted = getWhiteSpace(search);
    const typeFormatted = getSearchType(type);
    // If the search is of the wrong type
    if (!searchFormatted || !typeFormatted) {
      const error = new Error('Search type can only be `posts` or `subreddit`');
      error.status = 400;
      return next(error);
    }

    let fetchingUrl = REDDIT_URL;
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

export default searchRouter;
