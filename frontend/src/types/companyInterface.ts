import { ICampaign } from "./campaignInterface";

export interface ICompany {
    _id: string;
    companyName: string;
    description?: string;
    industryType: string;
    companyEmail: string;
    companyAddress: string;
    companyLogoUrl?: string;
    managerName: string;
    managerEmail: string;
    campaigns: ICampaign[];
    causesSupported: string[];
    registrationNumber?: string;
    companyWebsite?: string;
    joinedDate: Date;
    isActive: boolean;
  }
  