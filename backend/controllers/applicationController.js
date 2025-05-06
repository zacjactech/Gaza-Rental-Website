const Application = require('../models/Application');
const Property = require('../models/Property');
const User = require('../models/User');
const { validationResult } = require('express-validator');

// Submit application for property
exports.submitApplication = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name, email, phone, message } = req.body;
    const propertyId = req.params.propertyId;

    // Check if property exists
    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({ msg: 'Property not found' });
    }

    // Check if property is available
    if (!property.isAvailable) {
      return res.status(400).json({ msg: 'Property is not available for rent' });
    }

    // Create application
    const newApplication = new Application({
      property: propertyId,
      applicant: req.user ? req.user.id : null,
      name,
      email,
      phone,
      message
    });

    const application = await newApplication.save();

    res.json({
      application,
      message: 'Application submitted successfully'
    });
  } catch (err) {
    console.error('Submit application error:', err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Get applications for a property (property owner only)
exports.getPropertyApplications = async (req, res) => {
  try {
    const propertyId = req.params.propertyId;
    
    // Find property to check ownership
    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({ msg: 'Property not found' });
    }

    // Check ownership or admin
    if (property.owner.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    // Get applications for this property
    const applications = await Application.find({ property: propertyId })
      .populate('applicant', 'name email avatar')
      .sort({ createdAt: -1 });

    res.json(applications);
  } catch (err) {
    console.error('Get property applications error:', err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Property not found' });
    }
    res.status(500).json({ msg: 'Server error' });
  }
};

// Update application status (property owner only)
exports.updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const applicationId = req.params.id;
    
    // Find application
    const application = await Application.findById(applicationId);
    if (!application) {
      return res.status(404).json({ msg: 'Application not found' });
    }

    // Find property to check ownership
    const property = await Property.findById(application.property);
    if (!property) {
      return res.status(404).json({ msg: 'Property not found' });
    }

    // Check ownership or admin
    if (property.owner.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    // Update status
    application.status = status;
    await application.save();

    res.json({
      application,
      message: `Application ${status}`
    });
  } catch (err) {
    console.error('Update application status error:', err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Application not found' });
    }
    res.status(500).json({ msg: 'Server error' });
  }
};

// Get user's applications
exports.getUserApplications = async (req, res) => {
  try {
    const applications = await Application.find({ applicant: req.user.id })
      .populate({
        path: 'property',
        select: 'title images price currency period location',
        populate: {
          path: 'owner',
          select: 'name'
        }
      })
      .sort({ createdAt: -1 });

    res.json(applications);
  } catch (err) {
    console.error('Get user applications error:', err.message);
    res.status(500).json({ msg: 'Server error' });
  }
}; 