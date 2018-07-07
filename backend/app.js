const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const postsRouter = require('./routes/posts');

const app = express();

mongoose.connect("mongodb+srv://SuperUser:gBLfp8zqppEakvw5@cluster0-v51ke.mongodb.net/full-stack?retryWrites=true")
  .then(() => console.log('Connected to database'))
  .catch(() => console.log('Connection failed'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
  next();
});

app.use('/api/posts', postsRouter);

module.exports = app;
