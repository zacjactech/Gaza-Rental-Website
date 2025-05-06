import { render } from '@testing-library/react';
import { ReactElement } from 'react';
import { NextRouter } from 'next/router';

export const mockRouter: Partial<NextRouter> = {
  push: jest.fn(),
  replace: jest.fn(),
  prefetch: jest.fn(),
  back: jest.fn(),
  pathname: '/',
  query: {},
  asPath: '/',
};

export const mockUser = {
  id: '1',
  name: 'Test User',
  email: 'test@example.com',
  role: 'tenant',
};

export const mockProperty = {
  id: '1',
  title: 'Test Property',
  description: 'Test Description',
  price: 1000,
  type: 'apartment',
  bedrooms: 2,
  bathrooms: 1,
  location: 'Test Location',
  images: ['test.jpg'],
  owner: {
    id: '1',
    name: 'Test Owner',
    email: 'test@example.com',
  },
  createdAt: new Date().toISOString(),
};

export const mockApplication = {
  id: '1',
  property: mockProperty,
  tenant: mockUser,
  status: 'pending',
  message: 'Test application message',
  createdAt: new Date().toISOString(),
};

export const mockMessage = {
  id: '1',
  sender: mockUser,
  receiver: {
    id: '2',
    name: 'Test Receiver',
    email: 'receiver@example.com',
  },
  content: 'Test message content',
  createdAt: new Date().toISOString(),
};

export const renderWithProviders = (ui: ReactElement) => {
  return render(ui);
};

export const mockFetch = (data: any, status = 200) => {
  global.fetch = jest.fn().mockImplementation(() =>
    Promise.resolve({
      ok: status >= 200 && status < 300,
      status,
      json: () => Promise.resolve(data),
    })
  );
};

export const mockFetchError = (error: string) => {
  global.fetch = jest.fn().mockImplementation(() =>
    Promise.resolve({
      ok: false,
      status: 500,
      json: () => Promise.resolve({ error }),
    })
  );
};

export const waitForAsync = () => new Promise((resolve) => setTimeout(resolve, 0)); 