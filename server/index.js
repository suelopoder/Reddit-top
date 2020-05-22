const express = require('express');

const app = express();

// server react build
app.use(express.static('build'));

const PORT = process.env.SERVER_PORT || 3001;
app.listen(PORT, function () {
  console.log(`App listening on http://localhost:${PORT}!`);
});
