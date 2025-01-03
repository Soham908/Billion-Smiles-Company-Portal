import mongoose, { Document, Schema } from 'mongoose';

export interface ICampaign extends Document {
  imageUrl: string;
  campaignTitle: string;
  // campaignCause: mongoose.Types.ObjectId; // Reference to Cause
  campaignCause: string; // Reference to Cause
  causeName: string;
  startDate: Date;
  endDate: Date;
  campaignDescription: string;
  hashtags: string[];
  targetAmount: number;
  amountRaised: number;
  companyRef: mongoose.Types.ObjectId; // Reference to Company
  companyName: string;
  campaignManager: string;
  contactEmail: string;
  // ngoReference: mongoose.Types.ObjectId; // Reference to NGO
  ngoReference: string; // Reference to NGO
  ngoName: string;
  location: string;
  progress: number;
  campaignStatus: 'Ongoing' | 'Completed' | 'Preset';
  createdAt: Date;
  selectedFeatures: string[]
}

const campaignSchema = new Schema<ICampaign>(
  {
    imageUrl:             { type: String, required: true },
    campaignTitle:        { type: String, required: true },
    // campaignCause:        { type: mongoose.Schema.Types.ObjectId, ref: 'Cause'},
    campaignCause: String,
    causeName:            { type: String, required: true },
    startDate:            { type: Date, default: Date.now },
    endDate:              { type: Date, required: false },
    campaignDescription:  { type: String, required: true },
    hashtags:             { type: [String], required: false },
    targetAmount:         { type: Number, required: true },
    amountRaised:         { type: Number, default: 0 },
    companyRef:           { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
    companyName: String,
    campaignManager:      { type: String, required: true },
    contactEmail:         { type: String, required: true },
    // ngoReference:         { type: mongoose.Schema.Types.ObjectId, ref: 'NGO'},
    ngoReference: String,
    ngoName:              { type: String },
    location:             { type: String, required: true },
    progress:             { type: Number, default: 0 },
    campaignStatus: {
      type: String,
      enum: ['Ongoing', 'Completed', 'Preset'],
      default: 'Ongoing',
    },
    selectedFeatures: [String],
    createdAt:            { type: Date, default: Date.now },
  },
  {
    collection: 'campaigns',
  }
);

export const Campaign = mongoose.model<ICampaign>('Campaign', campaignSchema);
