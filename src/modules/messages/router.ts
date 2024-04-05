import { MODULE_ROUTES } from "@/constants/routes";
import { Router } from "express";
import { sendMessage } from "./controller";
import protectRoute from "@/middlewares/protectRoute";


const router = Router()

router.route(MODULE_ROUTES.sendMessage).post(protectRoute, sendMessage)


export default router