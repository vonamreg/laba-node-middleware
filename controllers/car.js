import path from "path"
import _ from "lodash"

import { Car } from "../database/models.js";


class CarController {
    async getAll(req, res) {
        const cars = await Car.findAll()
        res.status(200).json(cars)
    }

    async getOne(req, res) {
        const car = await Car.findOne({ where: { id: req.params.id } })
        return res.status(200).json(car)
    }

    async create(req, res) {
        const newCar = {
            typeId: req.body.typeId,
            carModel: req.body.carModel,
            color: req.body.color,
            number: req.body.number,
            image: ''
        }

        const { image } = req.files
        const imageName = `${newCar.carModel}.jpg`

        image.mv(path.resolve(), 'upload', imageName)
        newCar.image = `/upload/${newCar.carModel}.jpg`

        const car = await Car.create(newCar)
        return res.status(201).json(car)
    }

    async update(req, res) {
        let car = await Car.findByPk(req.params.id)

        const image = req.files?.['image'] || undefined
        image?.mv(path.resolve(path.resolve(), 'upload', `${car.carModel}.jpg`))
        const imagePath = (!_.isUndefined(image))? `/upload/${car.carModel}.jpg` : undefined

        await Car.update({
            typeId: req.body.typeId,
            carModel: req.body.carModel,
            color: req.body.color,
            number: req.body.number,
            image: imagePath
        },
        {
            where: {
                id: req.params.id
            }
        })

        car = await Car.findByPk(req.params.id)

        return res.status(200).json(car)
    }

    async delete(req, res) {
        await Car.destroy({
            where: {
                id: req.params.id
            }
        })

        return res.status(200).json('The car has been successfully deleted!')
    }
}

export default new CarController()
