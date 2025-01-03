import { Router } from "express";
import { createCampaignController } from '../controller/campaignController'
const router = Router()

// base route: "/campaigns"
router.post("/create-campaign", createCampaignController)

export default router