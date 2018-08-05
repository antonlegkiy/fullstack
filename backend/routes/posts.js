const express = require('express');
const multer  = require('multer');

const Post = require('../models/post');

const MIME_TYPES = {
  'image/png': 'png',
  'image/jpeg': 'jpeg',
  'image/jpg': 'jpg'
};

const router = express.Router();
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    const error = MIME_TYPES[file.mimetype] ? null : new Error('Invalid mime type');

    callback(error, 'backend/images');
  },
  filename: (req, file, callback) => {
    const name = file.originalname.toLowerCase().split(' ').join('_');
    const ext = MIME_TYPES[file.mimetype];

    callback(null, `${name}-${Date.now()}.${ext}`)
  }
});

router.post('', multer({ storage: storage }).single('postImage'), (req, res) => {
  const url = req.protocol + '://' + req.get('host');
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    imagePath: url + '/images/' + req.file.filename
  });
  post.save().then(result => {
    res.status(201).json({
      ...result,
      id: result._id
    });
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

router.put('/:id', multer({ storage: storage }).single('postImage'), (req, res) => {
  let imagePath = req.body.imagePath;

  if (req.file) {
    const url = req.protocol + '://' + req.get('host');
    imagePath = url + '/images/' + req.file.filename;
  }

  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content,
    imagePath: imagePath
  });

  Post.updateOne({ _id: req.params.id }, post).then(result => {
    res.status(200).json({ message: 'successfully updated' });
  });
});

module.exports = router;
