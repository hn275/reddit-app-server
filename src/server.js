const express = require('express');
const cors = require('cors');

const PORT = process.env.PORT || 3001;
const CLIENT_URL = 'http://localhost:3000';
const app = express();

// CORS
app.use(cors({ origin: CLIENT_URL }));

app.get('/', (req, res) => {
  res.json('heloworld');
});
app.listen(PORT, () => console.log(`server live on port ${PORT}`));
