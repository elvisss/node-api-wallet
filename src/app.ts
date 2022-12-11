import express, { Application } from 'express'
import { loadControllers } from 'awilix-express'
import loadContainer from './container'
import { config } from '../config'

const app: Application = express()

loadContainer(app)

app.use(express.json())
app.use(loadControllers(`controllers/*.${config.dev ? 'ts' : 'js'}`, { cwd: __dirname }))

export { app }
