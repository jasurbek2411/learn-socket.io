import protectRoute from '@/middlewares/protectRoute';
import { MODULE_ROUTES } from "@/constants/routes";
import { Router } from "express";
import { getUsers, getOne } from "./controller";


const router = Router()

router.route(MODULE_ROUTES.getUsers).get(protectRoute, getUsers)
router.route(MODULE_ROUTES.getOne).get(getOne)

export default router