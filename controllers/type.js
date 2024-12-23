import { Type } from "../database/models.js";

class TypeController {
    async getAll(req, res) {
        const types = await Type.findAll()
        res.status(200).json(types)
    }

    async getOne(req, res) {
        const type = await Type.findOne({ where: { id: req.params.id } })
        return res.status(200).json(type)
    }

    async create(req, res) {
        const newType = {
            name: req.body.name
        }

        const type = await Type.create(newType)
        return res.status(201).json(type)
    }

    async update(req, res) {
        await Type.update({
            name: req.body.name
        },
        {
            where: {
                id: req.params.id
            }
        })

        const type = await Type.findByPk(req.params.id)

        return res.status(200).json(type)
    }

    async delete(req, res) {
        await Type.destroy({
            where: {
                id: req.params.id
            }
        })

        return res.status(200).json('The type has been successfully deleted!')
    }
}

export default new TypeController()
