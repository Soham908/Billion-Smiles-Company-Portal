import { Request, Response } from "express";
import mongoose from "mongoose";
import { Campaign, ICampaign } from "../models/campaignModel";
import Company from "../models/companyModel";

export const createCampaignController = async (req: Request, res: Response) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        console.log(req.body);
        const campaignData: ICampaign = req.body;

        const newCampaign = await Campaign.create([campaignData], { session });
        const createdCampaign = newCampaign[0];
        const campaignId = createdCampaign._id as mongoose.Types.ObjectId
        console.log("from here check")
        console.log(createdCampaign)
        const company = await Company.findOne({ _id: campaignData.companyRef }).session(session);
        if (!company) {
            throw new Error("Company not found");
        }

        company.campaigns.push(campaignId);
        const companyDocument = await company.save({ session });
        const companyData = await companyDocument.populate("campaigns")
        await session.commitTransaction();  
        session.endSession();

        res.json({
            success: true,
            message: "Campaign created and company updated successfully",
            campaignData: createdCampaign,
            companyData: companyData
        });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        console.error("Error occurred: " + error);

        res.status(500).json({ success: false, message: "Campaign creation failed", error: error });
    }
};

export const fetchCompaniesCampaignsController = async (req: Request, res: Response) => {
    try {
        console.log(req.params)
        const fetchResponse = await Company.findById(req.params.companyId).populate('campaigns')
        console.log(fetchResponse?.campaigns)
        res.json({ success: true, message: "campaigns fetched", campaignsData: fetchResponse?.campaigns})
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "fetching failed" })
    }
}
