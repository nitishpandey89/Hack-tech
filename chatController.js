const Chat = require('../models/Chat');

// Get chat by ID
exports.getChatById = async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.id);
    if (!chat) {
      return res.status(404).json({ success: false, error: 'Chat not found' });
    }
    res.status(200).json({ success: true, data: chat });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// Delete chat
exports.deleteChat = async (req, res) => {
  try {
    const chat = await Chat.findByIdAndDelete(req.params.id);
    if (!chat) {
      return res.status(404).json({ success: false, error: 'Chat not found' });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};