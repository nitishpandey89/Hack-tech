const Mood = require('../models/Mood');

// @desc    Log mood
// @route   POST /api/moods
// @access  Private
exports.logMood = async (req, res, next) => {
  try {
    const { mood, notes } = req.body;

    const moodEntry = await Mood.create({
      user: req.user.id,
      mood,
      notes,
    });

    res.status(201).json({
      success: true,
      data: moodEntry,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

// @desc    Get mood history
// @route   GET /api/moods
// @access  Private
exports.getMoodHistory = async (req, res, next) => {
  try {
    const moods = await Mood.find({ user: req.user.id }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: moods.length,
      data: moods,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

// @desc    Get mood analytics
// @route   GET /api/moods/analytics
// @access  Private
exports.getMoodAnalytics = async (req, res, next) => {
  try {
    const moods = await Mood.find({ user: req.user.id });

    // Count moods by type
    const moodCounts = moods.reduce((acc, mood) => {
      acc[mood.mood] = (acc[mood.mood] || 0) + 1;
      return acc;
    }, {});

    // Get mood trend (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const recentMoods = await Mood.find({
      user: req.user.id,
      createdAt: { $gte: sevenDaysAgo },
    }).sort({ createdAt: 1 });

    res.status(200).json({
      success: true,
      data: {
        counts: moodCounts,
        recent: recentMoods,
      },
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};