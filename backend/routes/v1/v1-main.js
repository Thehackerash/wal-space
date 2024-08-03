import express from 'express';

import { default as userAuthRouter } from './auth.routes.js'
import { default as dockRouter } from './dock.routes.js'

const router = express.Router();

router.use('/auth', userAuthRouter);
router.use('/dock', dockRouter);

export default router;