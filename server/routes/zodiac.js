const express = require('express');
const { zodiacSigns, compatibilityMatrix } = require('../utils/zodiacData');

const router = express.Router();

// Get all zodiac signs
router.get('/', (req, res) => {
  res.json(zodiacSigns);
});

// Get specific zodiac sign
router.get('/:sign', (req, res) => {
  const sign = req.params.sign.toLowerCase();
  const zodiacSign = zodiacSigns.find(z => z.name.toLowerCase() === sign);
  
  if (!zodiacSign) {
    return res.status(404).json({ message: 'Zodiac sign not found' });
  }
  
  res.json(zodiacSign);
});

// Check compatibility between two signs
router.get('/compatibility/:sign1/:sign2', (req, res) => {
  const sign1 = req.params.sign1.toLowerCase();
  const sign2 = req.params.sign2.toLowerCase();
  
  const validSigns = zodiacSigns.map(z => z.name.toLowerCase());
  
  if (!validSigns.includes(sign1) || !validSigns.includes(sign2)) {
    return res.status(400).json({ message: 'Invalid zodiac sign' });
  }
  
  const compatibility = compatibilityMatrix[sign1]?.[sign2] || compatibilityMatrix[sign2]?.[sign1] || 50;
  
  res.json({
    sign1: sign1.charAt(0).toUpperCase() + sign1.slice(1),
    sign2: sign2.charAt(0).toUpperCase() + sign2.slice(1),
    compatibility,
    description: getCompatibilityDescription(compatibility),
  });
});

function getCompatibilityDescription(score) {
  if (score >= 90) return 'Excellent match! You two are made for each other.';
  if (score >= 80) return 'Great compatibility! You complement each other well.';
  if (score >= 70) return 'Good match with potential for a strong relationship.';
  if (score >= 60) return 'Moderate compatibility. Some work needed but promising.';
  if (score >= 50) return 'Average compatibility. Requires understanding and compromise.';
  return 'Challenging match. Significant differences to work through.';
}

module.exports = router;