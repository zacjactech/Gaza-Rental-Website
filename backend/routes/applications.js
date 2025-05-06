const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const applicationController = require('../controllers/applicationController');
const auth = require('../middleware/auth');

// @route   POST api/applications/property/:propertyId
// @desc    Submit application for a property
// @access  Public (but different behavior if authenticated)
router.post(
  '/property/:propertyId',
  [
    check('name', 'Name is required').notEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('phone', 'Phone number is required').notEmpty(),
    check('message', 'Message is required').notEmpty()
  ],
  applicationController.submitApplication
);

// @route   GET api/applications/property/:propertyId
// @desc    Get applications for a property (owner only)
// @access  Private
router.get(
  '/property/:propertyId',
  auth,
  applicationController.getPropertyApplications
);

// @route   PUT api/applications/:id/status
// @desc    Update application status
// @access  Private (property owner only)
router.put(
  '/:id/status',
  [
    auth,
    check('status', 'Status must be valid').isIn(['pending', 'approved', 'rejected'])
  ],
  applicationController.updateApplicationStatus
);

// @route   GET api/applications/user
// @desc    Get user's applications
// @access  Private
router.get('/user', auth, applicationController.getUserApplications);

module.exports = router; 