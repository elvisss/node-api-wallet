import { GET, route } from 'awilix-express'
import { Request, Response } from 'express'

@route('/check')
export class CheckController {
  @GET()
  public index(_req: Request, res: Response): void {
    res.send({
      NODE_ENV: process.env.NODE_ENV,
      APP_ENV: process.env.APP_ENV,
    })
  }
}
