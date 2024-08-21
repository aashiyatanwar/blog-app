const express = require('express');
const Post = require('../models/Post');
const router = express.Router();

// Basic error handling function
const handleError = (res, error) => {
  res.status(500).json({ message: error.message });
};

// GET /posts - List all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    handleError(res, error);
  }
});

// GET /posts/:id - Get a specific post
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.status(200).json(post);
  } catch (error) {
    handleError(res, error);
  }
});

// POST /posts - Create a new post
router.post('/', async (req, res) => {
  const { title, content } = req.body;

  // Input validation
  if (!title || !content) {
    return res.status(400).json({ message: 'Title and content are required' });
  }

  try {
    const newPost = new Post({ title, content });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    handleError(res, error);
  }
});

// PUT /posts/:id - Update a post
router.put('/:id', async (req, res) => {
  const { title, content } = req.body;

  // Input validation
  if (!title || !content) {
    return res.status(400).json({ message: 'Title and content are required' });
  }

  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    );
    if (!updatedPost) return res.status(404).json({ message: 'Post not found' });
    res.status(200).json(updatedPost);
  } catch (error) {
    handleError(res, error);
  }
});

// DELETE /posts/:id - Delete a post
router.delete('/:id', async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    if (!deletedPost) return res.status(404).json({ message: 'Post not found' });
    res.status(200).json({ message: 'Post deleted' });
  } catch (error) {
    handleError(res, error);
  }
});

module.exports = router;
