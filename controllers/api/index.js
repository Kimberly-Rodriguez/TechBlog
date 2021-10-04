const router = require('express').Router();
const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');
const commentRoutes = require('./commentRoutes');

// http://localhost:5001/api/users
router.use('/user', userRoutes);

// http://localhost:5001/api/post
router.use('/post', postRoutes);

router.use('/comment', commentRoutes);


module.exports = router;
