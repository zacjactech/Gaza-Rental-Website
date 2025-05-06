const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const propertyController = require('../controllers/propertyController');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

// @route   GET api/properties
// @desc    Get all properties with filters
// @access  Public
router.get('/', propertyController.getProperties);

// @route   GET api/properties/search
// @desc    Search properties by keyword
// @access  Public
router.get('/search', propertyController.searchProperties);

// @route   GET api/properties/:id
// @desc    Get property by ID
// @access  Public
router.get('/:id', propertyController.getPropertyById);

// @route   POST api/properties
// @desc    Create a new property
// @access  Private
router.post(
  '/',
  [
    auth,
    upload.propertyImages,
    [
      check('title', 'Title is required').notEmpty(),
      check('description', 'Description is required').notEmpty(),
      check('price', 'Price is required').isNumeric(),
      check('type', 'Property type is required').notEmpty(),
      check('location', 'Location is required').notEmpty()
    ]
  ],
  propertyController.createProperty
);

// @route   PUT api/properties/:id
// @desc    Update a property
// @access  Private (owner or admin)
router.put(
  '/:id',
  [
    auth,
    upload.propertyImages,
    [
      check('title', 'Title is required').optional(),
      check('price', 'Price must be a number').optional().isNumeric()
    ]
  ],
  propertyController.updateProperty
);

// @route   DELETE api/properties/:id
// @desc    Delete a property
// @access  Private (owner or admin)
router.delete('/:id', auth, propertyController.deleteProperty);

// @route   POST api/properties/:id/save
// @desc    Save/unsave property for a user
// @access  Private
router.post('/:id/save', auth, propertyController.saveProperty);

// @route   GET api/properties/saved/list
// @desc    Get user's saved properties
// @access  Private
router.get('/saved/list', auth, propertyController.getSavedProperties);

// @route   GET api/properties/analytics
// @desc    Get analytics for all properties (owner or admin)
// @access  Private
router.get('/analytics', auth, propertyController.getPropertyAnalytics);

// @route   GET api/properties/:id/analytics
// @desc    Get analytics for a specific property (owner or admin)
// @access  Private
router.get('/:id/analytics', auth, propertyController.getPropertyAnalytics);

module.exports = router; 