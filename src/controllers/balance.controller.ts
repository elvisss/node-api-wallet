import { DELETE, GET, POST, PUT, route } from 'awilix-express'
import { Request, Response } from 'express'
import { BaseController } from '../common/controllers/base.controller'
import { BalanceCreateDto, BalanceUpdateDto } from '../dto/balance.dto'
import { BalanceService } from '../services/balance.service'

@route('/balance/')
export class BalanceController extends BaseController {
  constructor(
    private readonly balanceService: BalanceService
  ) {
    super()
  }

  @GET()
  public async all(_req: Request, res: Response): Promise<void> {
    try {
      res.send(await this.balanceService.all())
    } catch(err) {
      this.handleException(err, res)
    }
  }

  // Ex: balance/1
  @route(':id')
  @GET()
  public async find(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params
      const result = await this.balanceService.find(parseInt(id))
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
      const { user_id, amount } = req.body
      const balanceCreate: BalanceCreateDto = { user_id, amount }
      await this.balanceService.store(balanceCreate)
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
      const { amount } = req.body
      const balanceUpdate: BalanceUpdateDto = { amount }
      await this.balanceService.update(parseInt(id), balanceUpdate)
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
      await this.balanceService.remove(parseInt(id))
      res.send()
    } catch(err) {
      this.handleException(err, res)
    }
  }
}
