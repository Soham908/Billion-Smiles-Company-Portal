import { Router } from "express";
import { fetchCausesController } from "../controller/causeController"
const router = Router()

// base route: "/cause"

router.get("/fetch-causes", fetchCausesController)


export default router