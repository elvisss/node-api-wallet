import { DELETE, GET, POST, PUT, route } from 'awilix-express'
import { Request, Response } from 'express'
import { BaseController } from '../common/controllers/base.controller'
import { SubscriptionCreateDto, SubscriptionUpdateDto } from '../dto/subscription.dto'
import { SubscriptionService } from '../services/subscription.service'

@route('/subscription/')
export class SubscriptionController extends BaseController {
  constructor(
    private readonly subscriptionService: SubscriptionService
  ) {
    super()
  }

  @GET()
  public async all(_req: Request, res: Response): Promise<void> {
    try {
      res.send(await this.subscriptionService.all())
    } catch(err) {
      this.handleException(err, res)
    }
  }

  // Ex: subscription/1
  @route(':id')
  @GET()
  public async find(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params
      const result = await this.subscriptionService.find(parseInt(id))
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
      const { user_id, code, amount, cron } = req.body
      const subscriptionCreate: SubscriptionCreateDto = { user_id, code, amount, cron }
      await this.subscriptionService.store(subscriptionCreate)
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
      const { code, amount, cron } = req.body
      const subscriptionUpdate: SubscriptionUpdateDto = { code, amount, cron }
      await this.subscriptionService.update(parseInt(id), subscriptionUpdate)
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
      await this.subscriptionService.remove(parseInt(id))
      res.send()
    } catch(err) {
      this.handleException(err, res)
    }
  }
}
