import express from 'express'
import fileUpload from 'express-fileupload'
import path from "path"

import { router } from './routers/index.js'
import { seq } from './database/index.js'
import init from './database/initialize.js'

const app = express()
const PORT = 8080

app.use(express.json())
app.use('/upload', express.static(path.join(`${process.cwd()}/upload`)))
app.use(fileUpload({}))
app.use('/api', router)

seq
  .authenticate()
  .then(() => console.log('Connected.'))
  .catch((err) => console.error('Connection error: ', err))

seq.sync({ alter: true }).then(async (result) => {
  console.log('test succesful')
  await init()
})

app.listen(PORT, function () {
  console.log('Server started in PORT :', PORT)
})
