import { Router } from 'express';
import axios from 'axios';
import { parseSubs } from './util/parseSubs.js';

import REDDIT_URL from '../url.js';

const subredditRouter = Router();
const _allowed_sr = ['popular', 'new', 'gold', 'default'];

subredditRouter.get('/:type', async (req, res, next) => {
  const { type } = req.params;

  // Error checking
  if (!type || !_allowed_sr.includes(type)) {
    const err = new Error(
      'missing type param, one of: popular, new, gold, default'
    );
    err.status = 400;
    next(err);
  }

  // Making request
  try {
    let fetchingUrl = REDDIT_URL;
    fetchingUrl += '/subreddits';
    fetchingUrl += `/${type}.json`;

    const srResponse = await axios.get(fetchingUrl);
    const parsedSubs = parseSubs(srResponse.data);
    res.status(200).json(parsedSubs);
  } catch (error) {
    next(error);
  }
});

export default subredditRouter;
