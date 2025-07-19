// Add to moodRoutes.js
router.post('/journal', protect, async (req, res) => {
  try {
    const { mood, notes, activities } = req.body;
    
    const journalEntry = await Mood.create({
      user: req.user.id,
      mood,
      notes,
      activities,
      journalDate: new Date()
    });
    
    res.status(201).json({ success: true, data: journalEntry });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});