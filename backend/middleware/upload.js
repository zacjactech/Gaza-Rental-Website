const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Define storage locations
const UPLOADS_FOLDER = path.join(__dirname, '../../public/uploads');
const PROPERTY_IMAGES_FOLDER = path.join(UPLOADS_FOLDER, 'properties');
const AVATAR_IMAGES_FOLDER = path.join(UPLOADS_FOLDER, 'avatars');

// Ensure upload directories exist
[UPLOADS_FOLDER, PROPERTY_IMAGES_FOLDER, AVATAR_IMAGES_FOLDER].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Define file storage for properties
const propertyImageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, PROPERTY_IMAGES_FOLDER);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'property-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// Define file storage for avatars
const avatarStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, AVATAR_IMAGES_FOLDER);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'avatar-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// File filter
const imageFileFilter = (req, file, cb) => {
  const allowedFileTypes = /jpeg|jpg|png|gif|webp/;
  const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedFileTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  }
  cb(new Error('Error: Images only!'));
};

// Initialize upload for properties (multiple images)
const uploadPropertyImages = multer({
  storage: propertyImageStorage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: imageFileFilter
}).array('images', 10); // Allow up to 10 images

// Initialize upload for avatar (single image)
const uploadAvatar = multer({
  storage: avatarStorage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
  fileFilter: imageFileFilter
}).single('avatar');

// Middleware for handling property image uploads
exports.propertyImages = (req, res, next) => {
  uploadPropertyImages(req, res, (err) => {
    if (err) {
      return res.status(400).json({ 
        msg: err.message || 'Error uploading images' 
      });
    }
    
    // Add image URLs to request body
    if (req.files && req.files.length > 0) {
      const imageUrls = req.files.map(file => `/uploads/properties/${file.filename}`);
      req.body.images = imageUrls;
    }
    
    next();
  });
};

// Middleware for handling avatar uploads
exports.avatar = (req, res, next) => {
  uploadAvatar(req, res, (err) => {
    if (err) {
      return res.status(400).json({ 
        msg: err.message || 'Error uploading avatar' 
      });
    }
    
    // Add avatar URL to request body
    if (req.file) {
      req.body.avatar = `/uploads/avatars/${req.file.filename}`;
    }
    
    next();
  });
}; 