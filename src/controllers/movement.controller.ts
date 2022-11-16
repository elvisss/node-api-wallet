import { DELETE, GET, POST, PUT, route } from 'awilix-express'
import { Request, Response } from 'express'
import { BaseController } from '../common/controllers/base.controller'
import { MovementCreateDto, MovementUpdateDto } from '../dto/movement.dto'
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
      res.status(201).send()
    } catch(err) {
      this.handleException(err, res)
    }
  }

  @route(':id')
  @PUT()
  public async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params
      const { type, amount } = req.body
      const movementUpdate: MovementUpdateDto = { type, amount }
      await this.movementService.update(parseInt(id), movementUpdate)
      res.send()
    } catch(err) {
      this.handleException(err, res)
    }
  }

  @route(':id')
  @DELETE()
  public async remove(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params
      await this.movementService.remove(parseInt(id))
      res.send()
    } catch(err) {
      this.handleException(err, res)
    }
  }
}
