const searchRouter = require('express').Router();
const axios = require('axios');
const whiteSpaceParse = require('./utils/whiteSpaceParse');

searchRouter.get('/', (req, res, next) => {
  try {
    const searchString = req.body.searchString;
    res.json(whiteSpaceParse(searchString));
  } catch (e) {
    next(e);
  }
});

module.exports = searchRouter;
