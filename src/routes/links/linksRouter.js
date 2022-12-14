import { Router } from 'express';
import axios from 'axios';
import REDDIT_URL from '../url.js';
import parseResponse from './util/parseResponse.js';

// 'hot', 'rising', 'new', 'top'
const allowedTypes = ['hot', 'rising', 'new', 'top'];
const linksRouter = Router();

linksRouter.get('/more', async (req, res, next) => {
  try {
    const { after, type, count } = req.query;
    // If request missing after and type
    if (!after || !type) {
      const error = new Error('Request body requires 2 props: after, and type');
      error.status = 400;
      return next(error);
    }

    // If type is not of `allowedType`
    if (!allowedTypes.includes(type)) {
      const error = new Error(
        'Invalid post type. Allowed types are: hot, rising, new, top'
      );
      error.status = 400;
      return next(error);
    }

    // Build fetch url
    let fetchUrl = REDDIT_URL;
    fetchUrl += `/${type}.json`;
    fetchUrl += `?after=t3_${after}`;
    if (count) fetchUrl += `&count=${count}`;

    // Fetch
    const response = await axios.get(fetchUrl);
    const parsedResponse = parseResponse(response.data);

    // Send back json
    const requestedPosts = count || 10; // default to 10 posts
    res.json(parsedResponse.slice(0, Number(requestedPosts)));
  } catch (error) {
    return next(error);
  }
});

linksRouter.get('/:type', async (req, res, next) => {
  try { 
    const { type } = req.params;

    if (!allowedTypes.includes(type) || !type) {
      // if request params is not of `allowedTypes` or if it does not contain any `type`
      const error = new Error(
        'Invalid request, a "type" must be included. Allowed post types are: hot, new, top, rising'
      );
      error.status = 400;
      return next(error); // send to error handling middleware
    } else {
      // Build fetch url
      let fetchUrl = REDDIT_URL;
      fetchUrl += `/${type}.json`;
      // fetchUrl += '?geo_filter=CA'; // Potentially no geo filter

      // Fetch
      const response = await axios.get(fetchUrl);
      const parsedResponse = parseResponse(response.data);

      // Send back json
      res.json(parsedResponse);
    }
  } catch (error) {
    return next(error);
  }
});

export default linksRouter;
