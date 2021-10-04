const router = require('express').Router();
const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');

// http://localhost:5001/api/users
router.use('/users', userRoutes);

// http://localhost:5001/api/post
router.use('/post', postRoutes);

module.exports = router;
