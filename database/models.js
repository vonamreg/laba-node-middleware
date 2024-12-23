import { STRING, INTEGER, BOOLEAN } from 'sequelize'
import { seq } from './index.js'


const Car = seq.define('car', {
    id: {
        type: INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        unique: true,
      },
    carModel: {
        type: STRING,
        allowNull: false,
      },
    color: {
        type: STRING,
        allowNull: false,
      },
    number: {
        type: STRING,
        allowNull: false,
    },
    image: {
        type: STRING,
        allowNull: false,
    }
})

const Type = seq.define('type', {
    id: {
        type: INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        unique: true,
      },
    name: {
        type: STRING,
        allowNull: false,
    }
})

const User = seq.define('user', {
      id: {
        type: INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        unique: true,
      },
      email: {
        type: STRING,
        allowNull: false,
      },
      password: {
        type: STRING,
        allowNull: false,
      },
      isActivated: {
        type: BOOLEAN,
        defaultValue: false,
      }
})

const Token = seq.define('token', {
      id: {
        type: INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        unique: true,
      },
      token: {
        type: STRING,
        allowNull: false,
      }
})

Type.hasOne(Car, { onDelete: 'CASCADE', onUpdate: 'CASCADE'})
Car.hasMany(User, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
User.hasMany(Car)
User.hasOne(Token, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })

export { Car, Type, User, Token }
