import { Router } from "express";
import { carRouter } from "./car.js"
import { typeRouter } from "./type.js";
import { authRouter } from "./auth.js"


export const router = new Router()

router.use('/cars', carRouter)
router.use('/types', typeRouter)
router.use('/auth', authRouter)
