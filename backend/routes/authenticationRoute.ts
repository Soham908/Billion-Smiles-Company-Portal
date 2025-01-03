import { Router } from "express";
import { loginManagerAccountController, signupNewCompanyController } from "../controller/authenticationController"
const router = Router()

router.post("/login", loginManagerAccountController)
router.post("/signup", signupNewCompanyController)

export default router