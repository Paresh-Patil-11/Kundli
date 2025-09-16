const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Horoscope = sequelize.define('Horoscope', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  zodiacSign: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 
              'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces']],
    },
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [['daily', 'weekly', 'monthly', 'yearly']],
    },
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  luckyNumber: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  luckyColor: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  mood: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  compatibility: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = Horoscope;