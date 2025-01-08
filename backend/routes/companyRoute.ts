import { Router } from "express";
import { fetchCompanyDetailsController } from "../controller/companyController"
const router = Router()

// base route: "/company"

router.get("/company-details/:companyId", fetchCompanyDetailsController)


export default router