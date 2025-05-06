const mongoose = require('mongoose');

const PropertySchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    default: 'TZS'
  },
  period: {
    type: String,
    enum: ['daily', 'weekly', 'monthly', 'yearly'],
    default: 'monthly'
  },
  type: {
    type: String,
    enum: ['apartment', 'house', 'villa', 'studio', 'office', 'land', 'other'],
    required: true
  },
  size: {
    type: Number, // size in square meters
    default: 0
  },
  bedrooms: {
    type: Number,
    default: 0
  },
  bathrooms: {
    type: Number,
    default: 0
  },
  location: {
    type: String,
    required: true
  },
  address: {
    street: String,
    city: String,
    district: String,
    postalCode: String,
    country: {
      type: String,
      default: 'Tanzania'
    }
  },
  coordinates: {
    type: [Number], // [longitude, latitude]
    index: '2dsphere'
  },
  images: {
    type: [String],
    default: ['/images/properties/default.jpg']
  },
  amenities: {
    type: [String],
    default: []
  },
  features: [String],
  isVerified: {
    type: Boolean,
    default: false
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  views: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Add index for location-based searches
PropertySchema.index({ location: 'text', title: 'text', description: 'text' });

// Update timestamp on save
PropertySchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Property', PropertySchema); 