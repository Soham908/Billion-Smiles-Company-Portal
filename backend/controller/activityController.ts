import { Request, Response } from "express";
import { ActivityLog } from "../models/activityLogModel";

export const fetchActivitiesController = async (req: Request, res: Response) => {
    try {
        console.log(req.params);
        const activityResponse = await ActivityLog.find({ companyId: req.params.companyId });
        console.log("activity response");
        console.log(activityResponse);

        res.json({ success: true, message: "activities fetched", activitiesData: activityResponse.reverse() });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "fetching failed" });
    }
};
