const sequelize = require('../config/database');
const User = require('./User');
const Horoscope = require('./Horoscope');
const Blog = require('./Blog');
const Message = require('./Message');

// Define associations
Blog.belongsTo(User, { foreignKey: 'authorId', as: 'author' });
User.hasMany(Blog, { foreignKey: 'authorId', as: 'blogs' });

const models = {
  User,
  Horoscope,
  Blog,
  Message,
};

module.exports = {
  sequelize,
  ...models,
};