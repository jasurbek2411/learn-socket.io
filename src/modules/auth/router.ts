import { MODULE_ROUTES } from "@/constants/routes";
import { Router } from "express";
import { signup, login, logout } from "./controller";


const router = Router()

router.route(MODULE_ROUTES.userSignup).post(signup)

router.route(MODULE_ROUTES.userLogin).post(login)

router.route(MODULE_ROUTES.userLogout).get(logout)

export default router