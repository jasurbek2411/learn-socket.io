import { MODULE_ROUTES } from "@/constants/routes";
import { Router } from "express";
import { getMessages, sendMessage } from "./controller";
import protectRoute from "@/middlewares/protectRoute";


const router = Router()

router.route(MODULE_ROUTES.sendMessage).post(protectRoute, sendMessage)
router.route(MODULE_ROUTES.getMessages).get(protectRoute, getMessages)


export default router