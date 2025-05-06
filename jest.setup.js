require('@testing-library/jest-dom');
const { TextEncoder, TextDecoder } = require('util');

// Mock environment variables
process.env.NEXT_PUBLIC_API_URL = 'http://localhost:3000';
process.env.MONGODB_URI = 'mongodb://localhost:27017/test';
process.env.JWT_SECRET = 'test-secret';
process.env.REDIS_URL = 'redis://localhost:6379';

// Mock TextEncoder/TextDecoder for Next.js
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Mock Request and Response for Next.js
global.Request = class Request {};
global.Response = class Response {};

// Mock fetch globally
global.fetch = jest.fn();

// Mock Next.js router
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
  }),
}));

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
  }),
  usePathname: () => '',
  useSearchParams: () => new URLSearchParams(),
}));

// Mock Next.js image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props) => {
    // Convert boolean attributes to strings to avoid React DOM warnings
    const safeProps = {...props};
    if (typeof safeProps.fill === 'boolean') safeProps.fill = safeProps.fill.toString();
    if (typeof safeProps.priority === 'boolean') safeProps.priority = safeProps.priority.toString();
    if (typeof safeProps.unoptimized === 'boolean') safeProps.unoptimized = safeProps.unoptimized.toString();
    
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...safeProps} alt={safeProps.alt || ''} />;
  },
}));

// Mock console.error to catch React warnings
const originalError = console.error;
beforeAll(() => {
  console.error = (...args) => {
    if (
      typeof args[0] === 'string' &&
      (args[0].includes('Warning: ReactDOM.render is no longer supported') ||
       args[0].includes('Warning: Received `true` for a non-boolean attribute') ||
       args[0].includes('Warning: Received `false` for a non-boolean attribute'))
    ) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
}); 