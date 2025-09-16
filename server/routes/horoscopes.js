const express = require('express');
const { body, validationResult } = require('express-validator');
const { Horoscope } = require('../models');
const { authenticateToken, requireAdmin } = require('../middleware/auth');

const router = express.Router();

// Get horoscopes
router.get('/', async (req, res) => {
  try {
    const { zodiacSign, type, date } = req.query;
    
    let whereClause = {};
    if (zodiacSign) whereClause.zodiacSign = zodiacSign.toLowerCase();
    if (type) whereClause.type = type.toLowerCase();
    if (date) whereClause.date = new Date(date);

    const horoscopes = await Horoscope.findAll({
      where: whereClause,
      order: [['date', 'DESC']],
    });

    res.json(horoscopes);
  } catch (error) {
    console.error('Error fetching horoscopes:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get today's horoscope for all signs
router.get('/today', async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const horoscopes = await Horoscope.findAll({
      where: {
        type: 'daily',
        date: today,
      },
      order: [['zodiacSign', 'ASC']],
    });

    res.json(horoscopes);
  } catch (error) {
    console.error('Error fetching today\'s horoscopes:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create horoscope (Admin only)
router.post('/', authenticateToken, requireAdmin, [
  body('zodiacSign').isIn(['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 
                          'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces']),
  body('type').isIn(['daily', 'weekly', 'monthly', 'yearly']),
  body('content').isLength({ min: 10 }),
  body('date').isISO8601(),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const horoscope = await Horoscope.create(req.body);
    res.status(201).json(horoscope);
  } catch (error) {
    console.error('Error creating horoscope:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update horoscope (Admin only)
router.put('/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const horoscope = await Horoscope.findByPk(req.params.id);
    if (!horoscope) {
      return res.status(404).json({ message: 'Horoscope not found' });
    }

    await horoscope.update(req.body);
    res.json(horoscope);
  } catch (error) {
    console.error('Error updating horoscope:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete horoscope (Admin only)
router.delete('/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const horoscope = await Horoscope.findByPk(req.params.id);
    if (!horoscope) {
      return res.status(404).json({ message: 'Horoscope not found' });
    }

    await horoscope.destroy();
    res.json({ message: 'Horoscope deleted successfully' });
  } catch (error) {
    console.error('Error deleting horoscope:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;