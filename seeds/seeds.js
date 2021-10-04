const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

const userData = require('./User.json');
const postData = require('./Post.json');
const commentData = require('./Comment.json');

// Adding the seeds to the database 
const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const userSeed = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  const postSeed = await Post.bulkCreate(postData, {
    individualHooks: true,
    returning: true,
  });

  const commentSeed = await Comment.bulkCreate(commentData, {
    individualHooks: true,
    returning: true,
  });
  
  process.exit(0);
};

seedDatabase();
