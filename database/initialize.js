import fs from 'fs'
import path from "path"
import { hashSync, genSaltSync } from 'bcrypt'
import jwt from 'jsonwebtoken'
import randomEmail from 'random-email'

import { Car, Token, Type, User } from '../database/models.js'
import getRandomCar from '../randomCar.js'
import { SECRET_KEY } from '../verySecretInfo.js'

async function init() {
    let car = await Car.findOne()
    let type = await Type.findOne()
    let user = await User.findOne()
    const dir = `${process.cwd()}\\upload\\`

    if (!car || !type || !user) {
        if (fs.readdirSync(dir).length !== 0) {
            fs.readdir(dir, (err, files) => {
                if (err) throw err;

                for (const file of files) {
                  fs.unlink(path.join(dir, file), (err) => {
                    if (err) throw err;
                  });
                }
              });
        }

        let types = [
            {
                "name": "Type A",
            },
            {
                "name": "Type B",
            },
            {
                "name": "Type C",
            },
            {
                "name": "Type D",
            },
            {
                "name": "Type E",
            }
        ]

        await Type.bulkCreate(types).then(async (res) => {
            for (let i = 0; i < types.length; i++) {
                const newCar = await Car.create(await getRandomCar())
                newCar.typeId = res[i].id
                await newCar.save()

                const newUser = await User.create({
                    email: randomEmail({ domain: 'mail.ru' }),
                    password: hashSync('1234567890', genSaltSync())
                })

                newUser.carId = newCar.id
                newUser.isActivated = true
                newUser.save()

                const token = jwt.sign({ email: newUser.email }, SECRET_KEY, { expiresIn: '24h' })
                await Token.create({
                    userId: newUser.id,
                    token: token
                })
            }
        })
    }
}

export default init
