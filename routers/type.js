import { Router } from 'express'
import TypeController from '../controllers/type.js'
import { verifyToken } from '../middleware/token.js'


export const typeRouter = new Router()

typeRouter.get('/', verifyToken, TypeController.getAll)
typeRouter.get('/:id', verifyToken, TypeController.getOne)
typeRouter.post('/', verifyToken, TypeController.create)
typeRouter.put('/:id', verifyToken, TypeController.update)
typeRouter.delete('/:id', verifyToken, TypeController.delete)