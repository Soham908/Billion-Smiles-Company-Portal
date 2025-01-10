import { Request, Response } from "express";
import { Cause } from "../models/causeModel";

export const fetchCausesController = async (req: Request, res: Response) => {
    try {
        console.log(req.body);
        const fetchCause = await Cause.find();
        console.log(fetchCause);

        res.json({ success: true, message: "causes fetched", causesData: fetchCause });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "fetching failed" });
    }
};
