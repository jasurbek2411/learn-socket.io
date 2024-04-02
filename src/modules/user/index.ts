import { Router } from 'express';
import { Test } from './controller';
import { MODULE_ROUTES } from '@/constants/routes';

const router = Router()

router.route(MODULE_ROUTES.user).get(Test)

export default router