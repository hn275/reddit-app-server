import dotenv from 'dotenv';
if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

import express from 'express';
import session from 'express-session';
import cors from 'cors';
import passport from 'passport';
import helmet from 'helmet';

import linksRouter from './routes/links/linksRouter.js';
import commentsRouter from './routes/comments/commentsRouter.js';
import searchRouter from './routes/search/searchRouter.js';
import subredditRouter from './routes/subreddits/subredditRouter.js';

const PORT = process.env.PORT || 3001;
const CLIENT_URL = 'http://localhost:3000'; // Change this once frontend app is deployed

// // Initialize express
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Session
app.use(
  session({
    secret: 'asdf',
    resave: false,
    saveUninitialized: false,
  })
);

// Passport
// require('./auth/passport-config')(passport);
app.use(passport.initialize());
app.use(passport.session());

// CORS
app.use(cors({ origin: CLIENT_URL }));

//sucrity package
app.use(helmet());

app.get('/', (req, res) => {
  // In case some server may take a couple moments to get started.
  // This could be used to make a splash/loading screen.
  const serverRes = {
    status: 'ok',
    message: 'hello world',
  };
  res.status(200).json(serverRes);
});

// Posts Route
app.use('/posts', linksRouter);

// Comments route
app.use('/comments', commentsRouter);

// Search route
app.use('/search', searchRouter);

// Subreddit route
app.use('/sr', subredditRouter);

// Invalid route
app.use('/*', (req, res, next) => {
  const error = new Error('Invalid endpoint');
  error.status = 400;
  next(error);
});

// Error handling
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const errorMessage = err.message || 'Something went wrong in the server';
  res.status(status).json({ message: errorMessage });
});
app.listen(PORT, () => console.log(`server live on port ${PORT}`));

export default app; // for  testing
