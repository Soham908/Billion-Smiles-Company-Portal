import mongoose, { Document, Schema } from 'mongoose';

export interface INgo extends Document {
  ngoName: string;
  description: string;
  registrationNumber: string;
  contactEmail: string;
  contactPhone?: string;
  address: string;
  website?: string;
  logo?: string;
  causes: mongoose.Types.ObjectId[]; // Array of Cause IDs
  createdAt: Date;
}

const ngoSchema = new Schema<INgo>(
  {
    ngoName: { type: String, required: true },
    description: { type: String, required: true },
    registrationNumber: { type: String, required: true },
    contactEmail: { type: String, required: true },
    contactPhone: { type: String, required: false },
    address: { type: String, required: true },
    website: { type: String, required: false },
    logo: { type: String, required: false },
    causes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Cause' }],
    createdAt: { type: Date, default: Date.now },
  },
  {
    collection: 'ngos',
  }
);

export const NGO = mongoose.model<INgo>('NGO', ngoSchema);
