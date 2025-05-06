const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

// @route   PUT api/users/profile
// @desc    Update user profile
// @access  Private
router.put(
  '/profile',
  [
    auth,
    upload.avatar,
    [
      check('name', 'Name is required').optional().notEmpty(),
      check('email', 'Please include a valid email').optional().isEmail()
    ]
  ],
  userController.updateProfile
);

// @route   PUT api/users/password
// @desc    Change user password
// @access  Private
router.put(
  '/password',
  [
    auth,
    [
      check('currentPassword', 'Current password is required').exists(),
      check('newPassword', 'Password should be at least 6 characters').isLength({ min: 6 })
    ]
  ],
  userController.changePassword
);

// @route   GET api/users/dashboard/stats
// @desc    Get dashboard stats for landlord or admin
// @access  Private (landlord or admin)
router.get('/dashboard/stats', auth, userController.getDashboard);

// @route   GET api/users/:id
// @desc    Get user by ID (public profile)
// @access  Public
router.get('/:id', userController.getUserById);

module.exports = router; 