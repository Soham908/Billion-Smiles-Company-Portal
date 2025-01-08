import { Request, Response } from "express";
import Company  from "../models/companyModel";

export const fetchCompanyDetailsController = async (req: Request, res: Response) => {
    try {
        console.log(req.params);
        const companyDetails = await Company.findById(req.params.companyId).populate('campaigns');
        console.log(companyDetails);

        res.json({ success: true, message: "company fetched", companyData: companyDetails });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "fetching failed" });
    }
};
