import { Router } from 'express';
import axios from 'axios';
import { parseComments } from './util/parseComments.js';
import REDDIT_URL from '../url.js';

const commentsRouter = Router();

/* Get all comments */
commentsRouter.get('/:postId', async (req, res, next) => {
  const { postId } = req.params; // request param from client
  /**
   * The receiving request can (optionally) contain a query string
   * in the form `?comment=${responseId}`
   * if this query is attached then the reponse will contain
   * the reply of the parent comment, which is `postId`
   */
  const comment = req.query.comment;

  // Building fetching url
  let fetchingUrl = REDDIT_URL;
  fetchingUrl += '/comments';
  fetchingUrl += `/${postId}`;
  fetchingUrl += '.json';
  if (comment) fetchingUrl += `?comment=${comment}`;

  // Fetch
  try {
    const redditResponse = await axios.get(fetchingUrl);
    const parsedRedditResponse = parseComments(redditResponse.data);
    res.status(200).json(parsedRedditResponse);
  } catch (error) {
    console.log(error); // TODO: delete before prod
    next(error);
  }
});

commentsRouter.get('/*', (req, res, next) => {
  // In case of a boo boo the request is made without the required params
  const error = new Error(
    'This endpoint required and "id" and optionally a query string. Missing "id"'
  );
  error.status = 400;
  next(error);
});

export default commentsRouter;
