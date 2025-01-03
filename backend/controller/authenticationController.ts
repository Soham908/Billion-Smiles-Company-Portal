import { Request, Response } from "express";
import Company from "../models/companyModel"

export const signupNewCompanyController = async (req: Request, res: Response) => {
    try {
        console.log(req.body)
        const signupResponse = await Company.create(req.body)
        console.log(signupResponse)
        res.json({ success: true, message: "account created", companyData: signupResponse })
    } catch (error) {
        console.log("error: " + error)
        res.json({ success: false, message: "account creation failed" })
    }
}

export const loginManagerAccountController = async (req: Request, res: Response) => {
    try {
        const { managerEmail } = req.body
        const loginResponse = await Company.findOne( {managerEmail} ).populate('campaigns')
        console.log(loginResponse)
        if(loginResponse) res.json({ success: true, message: "login done", companyData: loginResponse })
        else res.json({ success: false, message: "invalid credentials" })
    } catch (error) {
        console.log("error: " + error)
        res.json({ success: false, message: "login failed" })
    }
}
