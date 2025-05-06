# Gaza Rental Website - Backend API

This is the backend API for the Gaza Rental Website, providing all the necessary endpoints for the frontend application.

## Setup

1. Install dependencies:

```
npm install
```

2. Create a `.env` file with the following variables:

```
PORT=4000
NODE_ENV=development
DATABASE_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

3. Run the server:

```
npm run server
```

## API Endpoints

### Authentication

- **POST /api/auth/register** - Register a new user

  - Request: `{ name, email, password, phone, role }`
  - Response: `{ token }`

- **POST /api/auth/login** - Login a user

  - Request: `{ email, password }`
  - Response: `{ token }`

- **GET /api/auth/user** - Get authenticated user data
  - Headers: `x-auth-token: token`
  - Response: User object

### Users

- **PUT /api/users/profile** - Update user profile

  - Headers: `x-auth-token: token`
  - Request: Form data with `name`, `email`, `phone`, `avatar` (file)
  - Response: Updated user object

- **PUT /api/users/password** - Change user password

  - Headers: `x-auth-token: token`
  - Request: `{ currentPassword, newPassword }`
  - Response: `{ msg: 'Password updated successfully' }`

- **GET /api/users/dashboard/stats** - Get dashboard statistics

  - Headers: `x-auth-token: token`
  - Response: `{ properties: {...}, applications: {...}, mostViewedProperties: [...] }`

- **GET /api/users/:id** - Get public user profile
  - Response: User object (without sensitive data)

### Properties

- **GET /api/properties** - Get all properties with filtering

  - Query Parameters: `location`, `type`, `minPrice`, `maxPrice`, `bedrooms`, `bathrooms`, `amenities`, `sort`, `limit`, `page`
  - Response: `{ properties: [...], pagination: { total, page, pages } }`

- **GET /api/properties/search** - Search properties by keyword

  - Query Parameters: `keyword`, `limit`, `page`
  - Response: `{ properties: [...], pagination: { total, page, pages } }`

- **GET /api/properties/:id** - Get property by ID

  - Response: Property object

- **POST /api/properties** - Create a new property

  - Headers: `x-auth-token: token`
  - Request: Form data with property details and `images` (files)
  - Response: Created property object

- **PUT /api/properties/:id** - Update a property

  - Headers: `x-auth-token: token`
  - Request: Form data with updated property details
  - Response: Updated property object

- **DELETE /api/properties/:id** - Delete a property

  - Headers: `x-auth-token: token`
  - Response: `{ msg: 'Property removed' }`

- **POST /api/properties/:id/save** - Save/unsave property

  - Headers: `x-auth-token: token`
  - Response: `{ msg: 'Property saved/removed', saved: true/false }`

- **GET /api/properties/saved/list** - Get user's saved properties

  - Headers: `x-auth-token: token`
  - Response: Array of property objects

- **GET /api/properties/analytics** - Get analytics for all properties

  - Headers: `x-auth-token: token`
  - Response: `{ analytics: {...}, properties: [...] }`

- **GET /api/properties/:id/analytics** - Get analytics for a specific property
  - Headers: `x-auth-token: token`
  - Response: `{ property: {...} }`

### Testimonials

- **GET /api/testimonials** - Get all approved testimonials

  - Response: Array of testimonial objects

- **POST /api/testimonials** - Submit a testimonial

  - Request: `{ name, role, comment, rating, location }`
  - Response: `{ testimonial, message }`

- **GET /api/testimonials/:id** - Get testimonial by ID

  - Response: Testimonial object

- **PUT /api/testimonials/:id/status** - Update testimonial status (admin only)

  - Headers: `x-auth-token: token`
  - Request: `{ isApproved }`
  - Response: `{ testimonial, message }`

- **DELETE /api/testimonials/:id** - Delete a testimonial
  - Headers: `x-auth-token: token`
  - Response: `{ msg: 'Testimonial removed' }`

### Applications

- **POST /api/applications/property/:propertyId** - Submit application for a property

  - Request: `{ name, email, phone, message }`
  - Response: `{ application, message }`

- **GET /api/applications/property/:propertyId** - Get applications for a property

  - Headers: `x-auth-token: token`
  - Response: Array of application objects

- **PUT /api/applications/:id/status** - Update application status

  - Headers: `x-auth-token: token`
  - Request: `{ status }`
  - Response: `{ application, message }`

- **GET /api/applications/user** - Get user's applications
  - Headers: `x-auth-token: token`
  - Response: Array of application objects

## License

ISC
