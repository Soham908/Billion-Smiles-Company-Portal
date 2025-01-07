import { Router } from "express";
import { createCampaignController, fetchCompaniesCampaignsController } from '../controller/campaignController'
const router = Router()

// base route: "/campaigns"
router.post("/create-campaign", createCampaignController)

router.get("/fetch-company-campaigns/:companyId", fetchCompaniesCampaignsController)

export default router