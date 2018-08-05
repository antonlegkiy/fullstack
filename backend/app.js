const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const postsRouter = require('./routes/posts');
const mongoConfig = require('./../mongo.config');

const app = express();

mongoose.connect(`mongodb+srv://${mongoConfig.username}:${mongoConfig.password}@cluster0-v51ke.mongodb.net/${mongoConfig.name}?retryWrites=true`)
  .then(() => console.log('Connected to database'))
  .catch((e) => console.log('Connection failed', e));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/images', express.static(path.join('backend/images')));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
  next();
});

app.use('/api/posts', postsRouter);

module.exports = app;
