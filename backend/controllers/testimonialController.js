const Testimonial = require('../models/Testimonial');
const { validationResult } = require('express-validator');

// Get all approved testimonials
exports.getTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find({ isApproved: true })
      .populate('user', 'name avatar')
      .sort({ createdAt: -1 });
    
    res.json(testimonials);
  } catch (err) {
    console.error('Get testimonials error:', err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Create a new testimonial
exports.createTestimonial = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name, role, comment, rating, location } = req.body;

    // Create new testimonial
    const newTestimonial = new Testimonial({
      name,
      role,
      comment,
      rating,
      location,
      user: req.user ? req.user.id : null,
      isApproved: req.user && req.user.role === 'admin' // Auto-approve if admin
    });

    const testimonial = await newTestimonial.save();
    
    res.json({
      testimonial,
      message: testimonial.isApproved 
        ? 'Testimonial published successfully' 
        : 'Testimonial submitted successfully and is pending approval'
    });
  } catch (err) {
    console.error('Create testimonial error:', err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Get testimonial by ID
exports.getTestimonialById = async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id)
      .populate('user', 'name avatar');
    
    if (!testimonial) {
      return res.status(404).json({ msg: 'Testimonial not found' });
    }

    res.json(testimonial);
  } catch (err) {
    console.error('Get testimonial by ID error:', err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Testimonial not found' });
    }
    res.status(500).json({ msg: 'Server error' });
  }
};

// Update testimonial status (Admin only)
exports.updateTestimonialStatus = async (req, res) => {
  try {
    const { isApproved } = req.body;
    
    // Only allow admins to update testimonial status
    if (req.user.role !== 'admin') {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    const testimonial = await Testimonial.findById(req.params.id);
    
    if (!testimonial) {
      return res.status(404).json({ msg: 'Testimonial not found' });
    }

    testimonial.isApproved = isApproved;
    await testimonial.save();

    res.json({ 
      testimonial, 
      message: `Testimonial ${isApproved ? 'approved' : 'rejected'} successfully` 
    });
  } catch (err) {
    console.error('Update testimonial status error:', err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Testimonial not found' });
    }
    res.status(500).json({ msg: 'Server error' });
  }
};

// Delete testimonial
exports.deleteTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    
    if (!testimonial) {
      return res.status(404).json({ msg: 'Testimonial not found' });
    }

    // Check if admin or testimonial owner
    if (req.user.role !== 'admin' && 
        (!testimonial.user || testimonial.user.toString() !== req.user.id)) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await testimonial.remove();
    
    res.json({ msg: 'Testimonial removed' });
  } catch (err) {
    console.error('Delete testimonial error:', err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Testimonial not found' });
    }
    res.status(500).json({ msg: 'Server error' });
  }
}; 