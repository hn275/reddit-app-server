const postsRoute = require('express').Router();
const axios = require('axios');
const REDDIT_URL = require('../url'); // fetch URL
const { parseResponse, parseReponse } = require('./util');

postsRoute.get('/:type', async (req, res, next) => {
  try {
    const allowedTypes = ['hot', 'rising', 'new', 'top']; // allowed param
    const { type } = req.params;
    console.log(type);

    if (!allowedTypes.includes(type)) {
      // if request params is not of `allowedTypes`
      const error = new Error(
        'Invalid request. Allowed post types are: hot, new, top, rising'
      );
      error.status = 404;
      next(error); // send to error handling middleware
    } else {
      // fetch data and send it back
      let fetchUrl = REDDIT_URL;
      fetchUrl += `/${type}.json`;
      // fetchUrl += '?geo_filter=CA'; // Potentially no geo filter
      const response = await axios.get(fetchUrl);
      const parsedReponse = parseReponse(response.data);
      res.json(parsedReponse);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = postsRoute;
