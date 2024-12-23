import { Router } from 'express'
import CarController from '../controllers/car.js'
import { verifyToken } from '../middleware/token.js'


export const carRouter = new Router()

carRouter.get('/', verifyToken, CarController.getAll)
carRouter.get('/:id', verifyToken, CarController.getOne)
carRouter.post('/', verifyToken, CarController.create)
carRouter.put('/:id', verifyToken, CarController.update)
carRouter.delete('/:id', verifyToken, CarController.delete)
