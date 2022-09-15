const linksRouter = require('express').Router();
const axios = require('axios');
const REDDIT_URL = require('../url'); // fetch URL
const { parseResponse } = require('./util');

linksRouter.get('/:type', async (req, res, next) => {
  try {
    const allowedTypes = ['hot', 'rising', 'new', 'top']; // allowed param
    const { type } = req.params;

    if (!allowedTypes.includes(type) || !type) {
      // if request params is not of `allowedTypes` or if it does not contain any `type`
      const error = new Error(
        'Invalid request, a "type" must be included. Allowed post types are: hot, new, top, rising'
      );
      error.status = 400;
      next(error); // send to error handling middleware
    } else {
      // Build fetch url
      let fetchUrl = REDDIT_URL;
      fetchUrl += `/${type}.json`;
      // fetchUrl += '?geo_filter=CA'; // Potentially no geo filter
      const response = await axios.get(fetchUrl);
      const parsedResponse = parseResponse(response.data);
      res.json(parsedResponse);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = linksRouter;
