const postsRoute = require('express').Router();
const axios = require('axios');
const REDDIT_URL = require('../url'); // fetch URL

postsRoute.get('/:type', async (req, res, next) => {
  try {
    const allowedTypes = ['hot', 'rising', 'new', 'top']; // allowed param
    const { type } = req.params;
    console.log(type);

    if (!allowedTypes.includes(type)) {
      // if request params is not of `allowedTypes`
      const error = new Error('Invalid request. Allowed post types are: hot, new, top, rising');
      error.status = 404;
      next(error); // send to error handling middleware
    } else {
      // fetch data and send it back
      const response = await axios.get(`${REDDIT_URL}/${type}.json`);
      res.status(200).json(response.data);
    }
  } catch (error) {
    next(error);
  }
})

module.exports = postsRoute;
