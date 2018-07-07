const express = require('express');

const Post = require('../models/post');

const router = express.Router();

router.post('', (req, res) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save().then(result => {
    res.status(201).json({ id: result._id });
  });
});

router.get('', (req, res) => {
  Post.find().then(posts => {
    res.status(200).json(posts);
  });
});

router.get('/:id', (req, res) => {
  Post.findById({ _id: req.params.id }).then(post => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: 'post not found' })
    }
  });
});

router.delete('/:id', (req, res) => {
  Post.deleteOne({ _id: req.params.id }).then(() => {
    res.status(200).json({message: 'was removed'});
  });
});

router.put('/:id', (req, res) => {
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content
  });

  Post.updateOne({ _id: req.params.id }, post).then(result => {
    res.status(200).json({ message: 'successfully updated' });
  });
});

module.exports = router;
