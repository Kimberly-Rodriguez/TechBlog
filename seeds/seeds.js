const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

const userData = require('./User.json');
const postData = require('./Post.json');
const comment = require('./Comment.json');

// Adding the seeds to the database 
const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const userSeed = await User.bulkCreate(user, {
    individualHooks: true,
    returning: true,
  });
  const postSeed = await Post.bulkCreate(Post, {
    individualHooks: true,
    returning: true,
  });

  const commentSeed = await Comment.bulkCreate(comment, {
    individualHooks: true,
    returning: true,
  });
  
  process.exit(0);
};

seedDatabase();
