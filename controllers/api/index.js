const router = require('express').Router();
const userRoutes = require('./userRoutes');
const postsRoutes = require('./postsRoutes');

// http://localhost:5001/api/users
router.use('/users', userRoutes);
// http://localhost:5001/api/projects
router.use('/post', postsRoutes);

module.exports = router;
