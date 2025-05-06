const Property = require('../models/Property');
const User = require('../models/User');
const { validationResult } = require('express-validator');

// Get all properties with filtering
exports.getProperties = async (req, res) => {
  try {
    const {
      location,
      type,
      minPrice,
      maxPrice,
      bedrooms,
      bathrooms,
      amenities,
      sort,
      limit = 10,
      page = 1
    } = req.query;

    // Build filter object
    const filter = {};

    if (location) {
      filter.$or = [
        { location: { $regex: location, $options: 'i' } },
        { 'address.city': { $regex: location, $options: 'i' } },
        { 'address.district': { $regex: location, $options: 'i' } }
      ];
    }

    if (type && type !== 'all') {
      filter.type = type;
    }

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    if (bedrooms) {
      if (bedrooms === '4+') {
        filter.bedrooms = { $gte: 4 };
      } else {
        filter.bedrooms = Number(bedrooms);
      }
    }

    if (bathrooms) {
      if (bathrooms === '3+') {
        filter.bathrooms = { $gte: 3 };
      } else {
        filter.bathrooms = Number(bathrooms);
      }
    }

    if (amenities) {
      const amenitiesList = amenities.split(',');
      filter.amenities = { $all: amenitiesList };
    }

    // Add default filter for available properties
    filter.isAvailable = true;

    // Build sort object
    let sortOption = { createdAt: -1 }; // Default sort by newest

    if (sort) {
      switch (sort) {
        case 'priceAsc':
          sortOption = { price: 1 };
          break;
        case 'priceDesc':
          sortOption = { price: -1 };
          break;
        case 'newest':
          sortOption = { createdAt: -1 };
          break;
      }
    }

    // Calculate pagination
    const skip = (page - 1) * limit;
    
    // Execute query
    const properties = await Property.find(filter)
      .populate('owner', 'name avatar')
      .sort(sortOption)
      .skip(skip)
      .limit(Number(limit));

    // Get total count for pagination
    const total = await Property.countDocuments(filter);

    res.json({
      properties,
      pagination: {
        total,
        page: Number(page),
        pages: Math.ceil(total / limit)
      }
    });
  } catch (err) {
    console.error('Get properties error:', err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Get property by ID
exports.getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id)
      .populate('owner', 'name avatar phone email');

    if (!property) {
      return res.status(404).json({ msg: 'Property not found' });
    }

    // Increment views if not the owner viewing
    if (!req.user || req.user.id !== property.owner.id.toString()) {
      property.views += 1;
      await property.save();
    }

    res.json(property);
  } catch (err) {
    console.error('Get property by ID error:', err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Property not found' });
    }
    res.status(500).json({ msg: 'Server error' });
  }
};

// Create a new property
exports.createProperty = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // Create new property object
    const newProperty = new Property({
      owner: req.user.id,
      ...req.body
    });

    // Save property
    const property = await newProperty.save();
    
    res.json(property);
  } catch (err) {
    console.error('Create property error:', err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Update property
exports.updateProperty = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const property = await Property.findById(req.params.id);

    // Check if property exists
    if (!property) {
      return res.status(404).json({ msg: 'Property not found' });
    }

    // Check ownership or admin
    if (property.owner.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    // Update property
    const updatedProperty = await Property.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    ).populate('owner', 'name avatar');

    res.json(updatedProperty);
  } catch (err) {
    console.error('Update property error:', err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Property not found' });
    }
    res.status(500).json({ msg: 'Server error' });
  }
};

// Delete property
exports.deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    // Check if property exists
    if (!property) {
      return res.status(404).json({ msg: 'Property not found' });
    }

    // Check ownership or admin
    if (property.owner.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    // Delete property
    await property.remove();

    res.json({ msg: 'Property removed' });
  } catch (err) {
    console.error('Delete property error:', err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Property not found' });
    }
    res.status(500).json({ msg: 'Server error' });
  }
};

// Save property (add to user's saved properties)
exports.saveProperty = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const propertyId = req.params.id;

    // Check if property exists
    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({ msg: 'Property not found' });
    }

    // Check if already saved
    if (user.savedProperties.includes(propertyId)) {
      // Remove from saved properties
      user.savedProperties = user.savedProperties.filter(
        id => id.toString() !== propertyId
      );
      await user.save();
      return res.json({ msg: 'Property removed from saved list', saved: false });
    }

    // Add to saved properties
    user.savedProperties.push(propertyId);
    await user.save();

    res.json({ msg: 'Property saved successfully', saved: true });
  } catch (err) {
    console.error('Save property error:', err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Property not found' });
    }
    res.status(500).json({ msg: 'Server error' });
  }
};

// Get user's saved properties
exports.getSavedProperties = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    const properties = await Property.find({ 
      _id: { $in: user.savedProperties } 
    }).populate('owner', 'name avatar');

    res.json(properties);
  } catch (err) {
    console.error('Get saved properties error:', err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Search properties by keyword
exports.searchProperties = async (req, res) => {
  try {
    const { keyword, limit = 10, page = 1 } = req.query;

    if (!keyword) {
      return res.status(400).json({ msg: 'Keyword is required' });
    }

    // Build text search query
    const searchQuery = {
      $text: { $search: keyword },
      isAvailable: true
    };

    // Calculate pagination
    const skip = (page - 1) * limit;
    
    // Execute query
    const properties = await Property.find(searchQuery, {
      score: { $meta: 'textScore' } 
    })
      .populate('owner', 'name avatar')
      .sort({ score: { $meta: 'textScore' } })
      .skip(skip)
      .limit(Number(limit));

    // Get total count for pagination
    const total = await Property.countDocuments(searchQuery);

    res.json({
      properties,
      pagination: {
        total,
        page: Number(page),
        pages: Math.ceil(total / limit)
      }
    });
  } catch (err) {
    console.error('Search properties error:', err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Get property analytics (owner only)
exports.getPropertyAnalytics = async (req, res) => {
  try {
    // Check if specific property ID is provided
    const propertyId = req.params.id;
    
    if (propertyId) {
      // Get analytics for a specific property
      const property = await Property.findById(propertyId);
      
      // Check if property exists
      if (!property) {
        return res.status(404).json({ msg: 'Property not found' });
      }
      
      // Check ownership or admin
      if (property.owner.toString() !== req.user.id && req.user.role !== 'admin') {
        return res.status(401).json({ msg: 'Not authorized' });
      }
      
      // Return property analytics
      return res.json({
        property: {
          id: property._id,
          title: property.title,
          views: property.views,
          available: property.isAvailable
        }
      });
    } else {
      // Get analytics for all properties owned by user
      const query = req.user.role === 'admin' ? {} : { owner: req.user.id };
      
      const properties = await Property.find(query)
        .select('_id title views isAvailable createdAt')
        .sort({ views: -1 });
      
      // Calculate total views
      const totalViews = properties.reduce((sum, property) => sum + property.views, 0);
      
      // Calculate average views per property
      const averageViews = properties.length > 0 ? totalViews / properties.length : 0;
      
      // Return all properties analytics
      return res.json({
        analytics: {
          totalProperties: properties.length,
          totalViews,
          averageViews
        },
        properties
      });
    }
  } catch (err) {
    console.error('Property analytics error:', err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Property not found' });
    }
    res.status(500).json({ msg: 'Server error' });
  }
}; 