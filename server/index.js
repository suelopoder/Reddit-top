const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();

// server react build
app.use(express.static('build'));

const redditAppId = process.env.REDDIT_APP_ID;
if (!redditAppId) {
  console.error('Please setup a ".env" file based on ".env.example" to run this app');
  process.exit(1);
}

app.get('/reddit_redirect', async (req, res) => {
  // TODO validate state matches REDDIT_TEST_CLIENT for security
  const code = req.query.code;
  if (!code) {
    return res.status(400).send('No code submitted');
  }

  try {
    const { REDDIT_APP_ID, REDDIT_APP_SECRET, REDDIT_APP_REDIRECT_URI } = process.env;
    const response = await axios.post(
      'https://www.reddit.com/api/v1/access_token',
      `grant_type=authorization_code&code=${code}&redirect_uri=${encodeURIComponent(REDDIT_APP_REDIRECT_URI)}`,
      {
        headers: {
          'User-Agent': 'REDDIT_TEST_CLIENT'
        },
        auth: {
          username: REDDIT_APP_ID,
          password: REDDIT_APP_SECRET
        }
      });

    const { error } = response.data;
    if (error) {
      console.error('Error response getting access token', error);
      return res.status(400).send('Invalid code');
    }
    res.send(response.data);
  } catch (error) {
    console.error(error);
    res.status(400).send('Invalid code');
  }
});

const PORT = process.env.SERVER_PORT || 3001;
app.listen(PORT, function () {
  console.log(`App listening on http://localhost:${PORT}!`);
});
