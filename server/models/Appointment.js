const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Appointment = sequelize.define('Appointment', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  clientId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id',
    },
  },
  consultationType: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [['birth-chart', 'compatibility', 'career', 'general']],
    },
  },
  scheduledTime: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  zodiacSign: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isIn: [['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 
              'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces']],
    },
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'pending',
    validate: {
      isIn: [['pending', 'confirmed', 'completed', 'cancelled']],
    },
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  preferredMethod: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'video',
    validate: {
      isIn: [['video', 'phone']],
    },
  },
  meetingLink: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
  },
  duration: {
    type: DataTypes.INTEGER, // in minutes
    allowNull: true,
  },
});

module.exports = Appointment;