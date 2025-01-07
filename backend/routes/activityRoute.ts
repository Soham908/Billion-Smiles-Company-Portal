import { Router } from "express";
import { fetchActivitiesController } from "../controller/activityController"
const router = Router()

// base route: "/activity-log"

router.get("/fetch-activities/:companyId", fetchActivitiesController)


export default router