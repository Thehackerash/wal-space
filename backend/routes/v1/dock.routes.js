import express from "express";

import {docking} from "../../contollers/docking.controller"
const router = express.Router()

router.route('docking').post(docking);

export default router;