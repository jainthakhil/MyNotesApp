const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const { Post } = require('../model/schema');

// Create a new post
router.post('/notes', authenticate, async (req, res) => {
  const { date, title, desc } = req.body;

  try {
    const user = req.rootUser;
    const newPost = new Post({
      date,
      title,
      desc,
      userId: user._id
    });

    await newPost.save();
    user.notes.push(newPost._id);
    await user.save();

    res.status(200).json({ message: "Note added successfully!", name: user.name });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add note" });
  }
});

// Get all notes for the logged-in user
router.get('/notes', authenticate, async (req, res) => {
  try {
    const user = req.rootUser;
    const notes = await Post.find({ userId: user._id });
    res.status(200).json(notes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch notes" });
  }
});

router.delete('/notes/:id', authenticate, async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Post.findByIdAndDelete(id);

    if (result) {
      res.status(200).json({ status: 200, message: 'Note deleted successfully' });
    } else {
      res.status(404).json({ status: 404, message: 'Note not found' });
    }
  } catch (error) {
    console.error('Error deleting note:', error);
    res.status(500).json({ status: 500, message: 'Server error' });
  }
});


module.exports = router;