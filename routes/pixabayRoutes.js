const express = require('express');
const router = express.Router();
const pixabayController = require('../controllers/pixabayController');

// Route to fetchPixabayImages function from the controller, to fetch images from Pixabay API with sorting and pagination
router.get('/', pixabayController.fetchPixabayImages);

module.exports = router;