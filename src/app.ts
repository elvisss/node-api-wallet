import express, { Application } from 'express'
import { loadControllers } from 'awilix-express'
import loadContainer from './container'
import { config } from '../config'
import { expressjwt } from 'express-jwt'
import cors from 'cors'

const app: Application = express()

app.use(express.json())
app.use(cors())

loadContainer(app)

app.use(
  expressjwt({
    secret: config.jwtSecretKey,
    algorithms: ['HS256'],
  }).unless({ path: ['/', '/check'] })
)

app.use(
  loadControllers(`controllers/*.${config.dev ? 'ts' : 'js'}`, {
    cwd: __dirname,
  })
)

export { app }
