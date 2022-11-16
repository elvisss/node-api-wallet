import { Response } from 'express'
import { ApplicationException } from '../exception/application.exception'

export abstract class BaseController {
  handleException(err: any, res: Response) {
    console.log({ err })

    if (!(err instanceof ApplicationException)) {
      throw new Error(err.message)
    }

    res.status(400)
    res.send(err.message)
  }
}
