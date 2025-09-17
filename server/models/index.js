const sequelize = require('../config/database');
const User = require('./User');
const Horoscope = require('./Horoscope');
const Blog = require('./Blog');
const Message = require('./Message');
const Appointment = require('./Appointment');
const Rashi = require('./Rashi');

// Define associations
Blog.belongsTo(User, { foreignKey: 'authorId', as: 'author' });
User.hasMany(Blog, { foreignKey: 'authorId', as: 'blogs' });

Appointment.belongsTo(User, { foreignKey: 'clientId', as: 'client' });
User.hasMany(Appointment, { foreignKey: 'clientId', as: 'appointments' });

Appointment.belongsTo(Rashi, { foreignKey: 'zodiacSign', targetKey: 'name', as: 'rashi' });
Rashi.hasMany(Appointment, { foreignKey: 'zodiacSign', sourceKey: 'name', as: 'appointments' });

const models = {
  User,
  Horoscope,
  Blog,
  Message,
  Appointment,
  Rashi,
};

module.exports = {
  sequelize,
  ...models,
};