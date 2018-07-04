const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
  next();
});

app.post('/api/posts', (req, res) => {
  const post = req.body;
  console.log(post);
  res.status(201).json({ message: 'post saved successfully' });
});

app.get('/api/posts', (req, res) => {
  const posts = [{
    id: '123jkjk123ih',
    title: 'First server post',
    content: 'this is first server post'
  }, {
    id: '13424ewfk13423ih',
    title: 'Second server post',
    content: 'this is second server post'
  }];

  res.status(200).json(posts);
});

module.exports = app;
