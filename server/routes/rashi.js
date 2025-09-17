const express = require('express');
const { Rashi } = require('../models');
const { authenticateToken, requireAdmin } = require('../middleware/auth');

const router = express.Router();

// Get all rashis
router.get('/', async (req, res) => {
  try {
    const rashis = await Rashi.findAll({
      order: [['name', 'ASC']],
    });

    res.json(rashis);
  } catch (error) {
    console.error('Error fetching rashis:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get specific rashi
router.get('/:name', async (req, res) => {
  try {
    const rashi = await Rashi.findOne({
      where: { name: req.params.name.toLowerCase() },
    });

    if (!rashi) {
      return res.status(404).json({ message: 'Rashi not found' });
    }

    res.json(rashi);
  } catch (error) {
    console.error('Error fetching rashi:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create or update rashi (Admin only)
router.post('/', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { name, description, element, rulingPlanet, traits, luckyNumbers, luckyColors, compatibility, dates, symbol } = req.body;

    const [rashi, created] = await Rashi.findOrCreate({
      where: { name: name.toLowerCase() },
      defaults: {
        name: name.toLowerCase(),
        description,
        element: element.toLowerCase(),
        rulingPlanet,
        traits,
        luckyNumbers,
        luckyColors,
        compatibility,
        dates,
        symbol,
      },
    });

    if (!created) {
      await rashi.update({
        description,
        element: element.toLowerCase(),
        rulingPlanet,
        traits,
        luckyNumbers,
        luckyColors,
        compatibility,
        dates,
        symbol,
      });
    }

    res.status(created ? 201 : 200).json({
      message: created ? 'Rashi created successfully' : 'Rashi updated successfully',
      rashi,
    });
  } catch (error) {
    console.error('Error creating/updating rashi:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;