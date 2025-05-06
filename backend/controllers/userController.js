const User = require('../models/User');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const Property = require('../models/Property');
const Application = require('../models/Application');

// Update user profile
exports.updateProfile = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name, email, phone } = req.body;

    // Build update object
    const updateFields = {};
    if (name) updateFields.name = name;
    if (email) updateFields.email = email;
    if (phone) updateFields.phone = phone;
    if (req.body.avatar) updateFields.avatar = req.body.avatar;

    // Find and update user
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: updateFields },
      { new: true, runValidators: true }
    ).select('-password');

    res.json(user);
  } catch (err) {
    console.error('Update profile error:', err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Change password
exports.changePassword = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { currentPassword, newPassword } = req.body;

    // Find user
    const user = await User.findById(req.user.id);

    // Check if current password is correct
    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Current password is incorrect' });
    }

    // Set new password
    user.password = newPassword;
    await user.save();

    res.json({ msg: 'Password updated successfully' });
  } catch (err) {
    console.error('Change password error:', err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Get user profile by ID (public profile)
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select('-password -savedProperties')
      .populate('properties');

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    res.json(user);
  } catch (err) {
    console.error('Get user profile error:', err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.status(500).json({ msg: 'Server error' });
  }
};

// Get user dashboard data (for landlord and admin)
exports.getDashboard = async (req, res) => {
  try {
    // Check if user is landlord or admin
    if (req.user.role !== 'landlord' && req.user.role !== 'admin') {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    // Build query to get user's properties
    const propertyQuery = req.user.role === 'admin' 
      ? {} 
      : { owner: req.user.id };

    // Get property stats
    const totalProperties = await Property.countDocuments(propertyQuery);
    const availableProperties = await Property.countDocuments({
      ...propertyQuery,
      isAvailable: true
    });
    const unavailableProperties = totalProperties - availableProperties;

    // Get application stats
    const applications = await Application.find({
      property: { $in: await Property.find(propertyQuery).select('_id') }
    });
    
    const totalApplications = applications.length;
    const pendingApplications = applications.filter(app => app.status === 'pending').length;
    const approvedApplications = applications.filter(app => app.status === 'approved').length;
    const rejectedApplications = applications.filter(app => app.status === 'rejected').length;

    // Get most viewed properties (top 5)
    const mostViewedProperties = await Property.find(propertyQuery)
      .sort({ views: -1 })
      .limit(5)
      .select('title views location price');

    // Return dashboard data
    res.json({
      properties: {
        total: totalProperties,
        available: availableProperties,
        unavailable: unavailableProperties
      },
      applications: {
        total: totalApplications,
        pending: pendingApplications,
        approved: approvedApplications,
        rejected: rejectedApplications
      },
      mostViewedProperties
    });
  } catch (err) {
    console.error('Get dashboard error:', err.message);
    res.status(500).json({ msg: 'Server error' });
  }
}; 