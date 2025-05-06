import mongoose, { Schema, Document } from 'mongoose';

export interface IProperty extends Document {
  title: string;
  description: string;
  price: number;
  location: string;
  type: 'apartment' | 'house' | 'villa';
  bedrooms: number;
  bathrooms: number;
  area: number;
  amenities: string[];
  images: string[];
  status: 'available' | 'rented' | 'maintenance';
  owner: {
    _id: string;
    name: string;
    email: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export type Property = IProperty;

const PropertySchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      enum: ['apartment', 'house', 'villa'],
      required: true,
    },
    bedrooms: {
      type: Number,
      required: true,
      min: 0,
    },
    bathrooms: {
      type: Number,
      required: true,
      min: 0,
    },
    area: {
      type: Number,
      required: true,
      min: 0,
    },
    amenities: [{
      type: String,
      trim: true,
    }],
    images: [{
      type: String,
      trim: true,
    }],
    landlord: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    status: {
      type: String,
      enum: ['available', 'rented', 'maintenance'],
      default: 'available',
    },
  },
  {
    timestamps: true,
  }
);

// Create a compound index for location-based queries
PropertySchema.index({ location: 'text', title: 'text', description: 'text' });

export default mongoose.models.Property || mongoose.model<IProperty>('Property', PropertySchema); 