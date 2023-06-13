const router = require('express').Router();
const path = require('path');
const apiRoutes = require('./api');

// API routes
router.use('/api', apiRoutes);

// If no API routes are hit, serve the React front-end
router.use((req, res) => {
  res.sendFile(path.join(__dirname, '../../client/build/index.html'));
});

module.exports = router;
