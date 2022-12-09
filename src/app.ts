process.env.NODE_ENV = process.env.NODE_ENV || 'dev'
process.env.APP_ENV = process.env.APP_ENV || 'dev'

import express, { Application } from 'express'
import { loadControllers } from 'awilix-express'
import dotenv from 'dotenv'
import loadContainer from './container'
import { config } from '../config'

dotenv.config({
  path: `${__dirname}/../config/${process.env.APP_ENV}.env`,
})

const app: Application = express()

loadContainer(app)

app.use(express.json())
app.use(loadControllers(`controllers/*.${config.dev ? 'ts' : 'js'}`, { cwd: __dirname }))

export { app }
