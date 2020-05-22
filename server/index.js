const express = require('express');
require('dotenv').config();

const app = express();

// server react build
app.use(express.static('build'));

const redditAppId = process.env.REDDIT_APP_ID;
if (!redditAppId) {
  console.error('Please setup a ".env" file based on ".env.example" to run this app');
  process.exit(1);
}

const PORT = process.env.SERVER_PORT || 3001;
app.listen(PORT, function () {
  console.log(`App listening on http://localhost:${PORT}!`);
});
