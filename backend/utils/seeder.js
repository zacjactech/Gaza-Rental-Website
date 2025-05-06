const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const Property = require('../models/Property');
const Testimonial = require('../models/Testimonial');

// Load env vars
dotenv.config();

// Connect to DB
mongoose.connect(process.env.DATABASE_URL);

// Sample data
const users = [
  {
    name: 'Admin User',
    email: 'admin@gazarental.com',
    password: 'password123',
    role: 'admin',
    avatar: '/images/avatars/admin.jpg'
  },
  {
    name: 'John Landlord',
    email: 'landlord@gazarental.com',
    password: 'password123',
    role: 'landlord',
    avatar: '/images/avatars/landlord.jpg'
  },
  {
    name: 'Jane Doe',
    email: 'user@gazarental.com',
    password: 'password123',
    role: 'user',
    avatar: '/images/avatars/user.jpg'
  }
];

// Import data into DB
const importData = async () => {
  try {
    // Clear existing data
    await User.deleteMany();
    await Property.deleteMany();
    await Testimonial.deleteMany();

    console.log('Data cleared...');

    // Create users
    const createdUsers = await User.create(users);
    const adminUser = createdUsers[0]._id;
    const landlordUser = createdUsers[1]._id;

    // Create properties
    const properties = [
      {
        owner: landlordUser,
        title: 'Modern Apartment in Mikocheni',
        description: 'Beautiful modern apartment in the heart of Mikocheni. Fully furnished with all amenities.',
        price: 250000,
        currency: 'TZS',
        period: 'monthly',
        type: 'apartment',
        bedrooms: 2,
        bathrooms: 1,
        size: 85,
        location: 'Mikocheni',
        address: {
          street: 'Mikocheni Road',
          city: 'Dar es Salaam',
          country: 'Tanzania'
        },
        coordinates: [39.2708, -6.7650],
        images: [
          '/images/properties/apartment1-1.jpg',
          '/images/properties/apartment1-2.jpg',
          '/images/properties/apartment1-3.jpg'
        ],
        amenities: ['parking', 'security', 'internet', 'furnished'],
        isVerified: true,
        isAvailable: true
      },
      {
        owner: landlordUser,
        title: 'Luxury Villa in Masaki',
        description: 'Stunning luxury villa in Masaki with ocean views, private garden, and swimming pool.',
        price: 450000,
        currency: 'TZS',
        period: 'monthly',
        type: 'villa',
        bedrooms: 3,
        bathrooms: 2,
        size: 200,
        location: 'Masaki',
        address: {
          street: 'Masaki Road',
          city: 'Dar es Salaam',
          country: 'Tanzania'
        },
        coordinates: [39.2817, -6.7414],
        images: [
          '/images/properties/villa1-1.jpg',
          '/images/properties/villa1-2.jpg'
        ],
        amenities: ['parking', 'security', 'pool', 'garden', 'furnished', 'aircon'],
        isVerified: true,
        isAvailable: true
      },
      {
        owner: landlordUser,
        title: 'Family House in Mbezi',
        description: 'Spacious family home in Mbezi with 4 bedrooms, large garden, and secure compound.',
        price: 350000,
        currency: 'TZS',
        period: 'monthly',
        type: 'house',
        bedrooms: 4,
        bathrooms: 3,
        size: 180,
        location: 'Mbezi',
        address: {
          street: 'Mbezi Beach Road',
          city: 'Dar es Salaam',
          country: 'Tanzania'
        },
        coordinates: [39.2182, -6.7273],
        images: [
          '/images/properties/house1-1.jpg',
          '/images/properties/house1-2.jpg'
        ],
        amenities: ['parking', 'security', 'garden'],
        isVerified: true,
        isAvailable: true
      }
    ];

    await Property.create(properties);

    // Create testimonials
    const testimonials = [
      {
        user: createdUsers[2]._id,
        name: 'Jane Doe',
        role: 'Tenant',
        comment: 'Gaza Rental helped me find the perfect apartment. The process was smooth and hassle-free!',
        rating: 5,
        location: 'Dar es Salaam',
        isApproved: true
      },
      {
        name: 'John Smith',
        role: 'Property Owner',
        comment: 'Great platform to list my properties. I found reliable tenants quickly.',
        rating: 4,
        location: 'Arusha',
        isApproved: true
      },
      {
        name: 'Sarah Johnson',
        role: 'Tenant',
        comment: 'Very user-friendly website with excellent customer support.',
        rating: 5,
        location: 'Zanzibar',
        isApproved: true
      }
    ];

    await Testimonial.create(testimonials);

    console.log('Data imported successfully!');
    process.exit();
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }
};

// Delete data from DB
const deleteData = async () => {
  try {
    await User.deleteMany();
    await Property.deleteMany();
    await Testimonial.deleteMany();

    console.log('Data destroyed successfully!');
    process.exit();
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }
};

// Determine action from command line args
if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
} else {
  console.log('Please use proper command: -i (import) or -d (delete)');
  process.exit();
} 