const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const postsRouter = require('./routes/posts');

fs.readFile(path.normalize(__dirname + "/../mongo.config.json"), 'utf-8', (err, data) => {
  if (!err) {
    const config = JSON.parse(data);
    mongoose.connect(`mongodb+srv://${config.username}:${config.password}@cluster0-v51ke.mongodb.net/${config.name}?retryWrites=true`)
      .then(() => console.log('Connected to database'))
      .catch(() => console.log('Connection failed'));
  } else {
    console.log(`error while reading mongo configuration: ${err}`);
  }
});

const app = express();

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
