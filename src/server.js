const express = require('express');
const cors = require('cors');
const linksRouter = require('./routes/links/linksRouter');
const commentsRouter = require('./routes/comments/commentsRouter');
const searchRouter = require('./routes/search/searchRouter');

const PORT = process.env.PORT || 3001;
const CLIENT_URL = 'http://localhost:3000'; // Change this once frontend app is deployed

// Initialize express
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// CORS
app.use(cors({ origin: CLIENT_URL }));

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
console.log(process.env.NODE_ENV);

module.exports = app;
