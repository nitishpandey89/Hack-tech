const express = require('express');
const router = express.Router();  // THIS LINE IS CRUCIAL
const { protect } = require('../middlewares/auth');
const Chat = require('../models/Chat');

// Get single chat by ID
router.get('/:id', protect, async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.id);
    if (!chat) {
      return res.status(404).json({ success: false, error: 'Chat not found' });
    }
    res.status(200).json({ success: true, data: chat });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// Delete a chat
router.delete('/:id', protect, async (req, res) => {
  try {
    const chat = await Chat.findByIdAndDelete(req.params.id);
    if (!chat) {
      return res.status(404).json({ success: false, error: 'Chat not found' });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// Make sure to export the router
module.exports = router;