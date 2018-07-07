const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Post = require('./models/post');

const app = express();

mongoose.connect("mongodb+srv://SuperUser:gBLfp8zqppEakvw5@cluster0-v51ke.mongodb.net/full-stack?retryWrites=true")
  .then(() => console.log('Connected to database'))
  .catch(() => console.log('Connection failed'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
  next();
});

app.post('/api/posts', (req, res) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save().then(result => {
    res.status(201).json({ id: result._id });
  });
});

app.get('/api/posts', (req, res) => {
  Post.find().then(posts => {
    res.status(200).json(posts);
  });
});

app.delete('/api/posts/:id', (req, res) => {
  Post.deleteOne({ _id: req.params.id }, () => {
    console.log('deleted successfully');
    res.status(200).json({message: 'was removed'});
  });
});

module.exports = app;
