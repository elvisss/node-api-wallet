import { GET, POST, route } from 'awilix-express'
import { Request, Response } from 'express'
import { BaseController } from '../common/controllers/base.controller'
import { MovementCreateDto } from '../dto/movement.dto'
import { MovementService } from '../services/movement.service'

@route('/movement/')
export class MovementController extends BaseController {
  constructor(
    private readonly movementService: MovementService
  ) {
    super()
  }

  @GET()
  public async all(_req: Request, res: Response): Promise<void> {
    try {
      res.send(await this.movementService.all())
    } catch(err) {
      this.handleException(err, res)
    }
  }

  // Ex: movement/1
  @route(':id')
  @GET()
  public async find(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params
      const result = await this.movementService.find(parseInt(id))
      if (!result) {
        res.status(404).send()
        return
      }
      res.send(result)
    } catch(err) {
      this.handleException(err, res)
    }
  }

  @POST()
  public async store(req: Request, res: Response): Promise<void> {
    try {
      const { user_id, type, amount } = req.body
      const movementCreate: MovementCreateDto = { user_id, type, amount }
      await this.movementService.store(movementCreate)
      res.send()
    } catch(err) {
      this.handleException(err, res)
    }
  }
}
