import express, { Application } from 'express'
import { loadControllers } from 'awilix-express'
import loadContainer from './container'
import { config } from '../config'
import { expressjwt } from 'express-jwt'

const app: Application = express()

app.use(express.json())
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
