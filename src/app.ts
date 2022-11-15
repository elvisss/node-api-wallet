import express, { Application, Request, Response } from 'express'

const app: Application = express()

app.get('/', (_req: Request, res: Response) => {
  res.send('Running 2')
})

export { app }
