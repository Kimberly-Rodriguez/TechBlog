const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');

// http://localhost:5001
router.use('/', homeRoutes);
// http://localhost:5001/api
router.use('/api', apiRoutes);

module.exports = router;