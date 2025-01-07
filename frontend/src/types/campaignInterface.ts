export interface ICampaign {
  _id?: string;
  imageUrl: string;
  campaignTitle: string;
  campaignCause: string;
  causeName: string;
  startDate: string;
  endDate: string;
  campaignDescription: string;
  hashtags: string[];
  targetAmount: number;
  amountRaised: number;
  companyRef: string;
  companyName: string | null;
  campaignManager: string;
  contactEmail: string;
  ngoReference: string | null;
  ngoName: string | null;
  location: string;
  progress: number;
  campaignStatus: "Ongoing" | "Completed" | "Preset";
  createdAt?: string;
  selectedFeatures: string[];
  targetLikes: number;
}

// export interface ICampaign {
//     _id?: string,
//     campaignTitle: string,
//     causeName: string,
//     startDate: string,
//     endDate: string,
//     campaignDescription: string,
//     hashtags: string,
//     targetAmount: string,
//     imageUrl: string,
//     location: string | "saki naka",
//     contactEmail: string | "demo@zeist.com",
//     campaignManager: string | "demoManager",
//     companyName: string | "tata motors",
//     companyRef: string,
// }
