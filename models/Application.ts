import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
  message: {
    type: String,
    required: [true, 'Message is required'],
    minlength: [10, 'Message must be at least 10 characters long'],
  },
  moveInDate: {
    type: Date,
    required: [true, 'Move-in date is required'],
  },
  duration: {
    type: Number,
    required: [true, 'Duration is required'],
    min: [1, 'Duration must be at least 1'],
  },
  durationUnit: {
    type: String,
    enum: ['months', 'years'],
    required: [true, 'Duration unit is required'],
  },
  additionalInfo: {
    type: String,
  },
  propertyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Property',
    required: [true, 'Property ID is required'],
  },
  tenantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Tenant ID is required'],
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
}, {
  timestamps: true,
});

// Create compound index for efficient querying
applicationSchema.index({ propertyId: 1, tenantId: 1 });
applicationSchema.index({ tenantId: 1, status: 1 });

export default mongoose.models.Application || mongoose.model('Application', applicationSchema); 