const express = require('express');
const cors = require('cors');
const postsRoute = require('./routes/redditPosts');

const PORT = process.env.PORT || 3001;
const CLIENT_URL = 'http://localhost:3000'; // Change this once frontend app is deployed

// Initialize express
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// CORS
app.use(cors({ origin: CLIENT_URL }));

app.get('/', (req, res) => {
  res.json('heloworld');
});

// Posts Route
// handle `top`, `hot`, `rising`, `new`
app.use('/posts', postsRoute);

// Error handling
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const errorMessage = err.message || 'Something went wrong in the server';
  res.status(status).json({ message: errorMessage });
});
app.listen(PORT, () => console.log(`server live on port ${PORT}`));
