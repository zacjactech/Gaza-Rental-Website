# Gaza Rental Website

A modern property rental platform built with Next.js, TypeScript, and MongoDB.

## Features

- Property listing and search
- User authentication and authorization
- Property management for owners
- Application system for tenants
- Messaging system
- Map integration for property locations
- Responsive design
- Multi-language support

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Radix UI
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT
- **Maps**: Mapbox GL
- **Testing**: Jest, React Testing Library
- **Code Quality**: ESLint, Prettier

## Prerequisites

- Node.js 18+ and npm
- MongoDB
- Redis (optional, for caching)
- Mapbox API key

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/gaza-rental-website.git
   cd gaza-rental-website
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following variables:

   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3000
   MONGODB_URI=mongodb://localhost:27017/gaza-rental
   JWT_SECRET=your_jwt_secret
   MAPBOX_TOKEN=your_mapbox_token
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage
- `npm run test:ci` - Run tests in CI mode

## Project Structure

```
gaza-rental-website/
├── app/                 # Next.js app directory
├── components/          # Reusable components
├── lib/                 # Utility functions
├── middleware/          # API middleware
├── models/              # MongoDB models
├── public/              # Static files
├── services/            # API services
├── tests/               # Test files
├── types/               # TypeScript types
└── utils/               # Helper functions
```

## Testing

The project uses Jest and React Testing Library for testing. Run the following commands:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
