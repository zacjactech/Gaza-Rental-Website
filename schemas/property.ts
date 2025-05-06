// Temporary property schema for development
export const propertySchema = {
  title: 'Property',
  type: 'object',
  properties: {
    title: { type: 'string' },
    description: { type: 'string' },
    price: { type: 'number' },
    bedrooms: { type: 'number' },
    bathrooms: { type: 'number' },
    location: { type: 'string' },
    amenities: { type: 'array', items: { type: 'string' } },
    images: { type: 'array', items: { type: 'string' } },
  },
  required: ['title', 'price', 'location']
}; 