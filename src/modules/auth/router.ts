import { MODULE_ROUTES } from "@/constants/routes";
import { Router } from "express";
import { signup, login, logout, generateAccessToken } from "./controller";


const router = Router()

router.route(MODULE_ROUTES.userSignup).post(signup)

router.route(MODULE_ROUTES.userLogin).post(login)

router.route(MODULE_ROUTES.userLogout).post(logout)

router.route(MODULE_ROUTES.generateAccessToken).post(generateAccessToken)

export default router