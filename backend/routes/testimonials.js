const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const testimonialController = require('../controllers/testimonialController');
const auth = require('../middleware/auth');

// @route   GET api/testimonials
// @desc    Get all approved testimonials
// @access  Public
router.get('/', testimonialController.getTestimonials);

// @route   POST api/testimonials
// @desc    Submit a testimonial
// @access  Public (but different behavior if authenticated)
router.post(
  '/',
  [
    check('name', 'Name is required').notEmpty(),
    check('comment', 'Comment is required').notEmpty(),
    check('rating', 'Rating must be between 1 and 5').isInt({ min: 1, max: 5 })
  ],
  testimonialController.createTestimonial
);

// @route   GET api/testimonials/:id
// @desc    Get testimonial by ID
// @access  Public
router.get('/:id', testimonialController.getTestimonialById);

// @route   PUT api/testimonials/:id/status
// @desc    Update testimonial status (approve/reject)
// @access  Private (admin only)
router.put(
  '/:id/status',
  [
    auth,
    check('isApproved', 'isApproved field is required').isBoolean()
  ],
  testimonialController.updateTestimonialStatus
);

// @route   DELETE api/testimonials/:id
// @desc    Delete a testimonial
// @access  Private (admin or testimonial creator)
router.delete('/:id', auth, testimonialController.deleteTestimonial);

module.exports = router; 