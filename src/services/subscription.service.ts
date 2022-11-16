import { ApplicationException } from '../common/exception/application.exception'
import {
  SubscriptionCreateDto,
  SubscriptionUpdateDto,
} from '../dto/subscription.dto'
import { Subscription } from './repositories/domain/subscription'
import { SubscriptionRepository } from './repositories/subscription.repository'

export class SubscriptionService {
  constructor(
    private readonly subscriptionRepository: SubscriptionRepository
  ) {}

  public async find(id: number): Promise<Subscription | null> {
    return await this.subscriptionRepository.find(id)
  }

  public async all(): Promise<Subscription[]> {
    return await this.subscriptionRepository.all()
  }

  public async store(entry: SubscriptionCreateDto): Promise<void> {
    const originalEntry = await this.subscriptionRepository.findByUserAndCode(
      entry.user_id,
      entry.code
    )

    if (originalEntry) {
      throw new ApplicationException('User subscription already exists')
    }

    await this.subscriptionRepository.store(entry as Subscription)
  }

  public async update(id: number, entry: SubscriptionUpdateDto): Promise<void> {
    const originalEntry = await this.subscriptionRepository.find(id)

    if (!originalEntry) {
      throw new ApplicationException('Subscription not found')
    }

    originalEntry.code = entry.code
    originalEntry.amount = entry.amount
    originalEntry.cron = entry.cron

    await this.subscriptionRepository.update(originalEntry)
  }

  public async remove(id: number): Promise<void> {
    await this.subscriptionRepository.remove(id)
  }
}
