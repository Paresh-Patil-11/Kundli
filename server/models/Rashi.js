const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Rashi = sequelize.define('Rashi', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isIn: [['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 
              'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces']],
    },
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  element: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [['fire', 'earth', 'air', 'water']],
    },
  },
  rulingPlanet: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  traits: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: [],
  },
  luckyNumbers: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    defaultValue: [],
  },
  luckyColors: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: [],
  },
  compatibility: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: [],
  },
  dates: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  symbol: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Rashi;