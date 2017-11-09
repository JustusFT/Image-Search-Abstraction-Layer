require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const api = require('./api/api');

const mongoLabUri = process.env.MONGOLAB_URI;

const app = express();

mongoose.connect(mongoLabUri, { useMongoClient: true });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  global.siteUrl = req.headers.host;
  next();
});

app.set('view engine', 'ejs');

app.get('/', api.index);
app.get('/search', api.search);
app.get('/recent', api.recent);

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port 3000');
});
