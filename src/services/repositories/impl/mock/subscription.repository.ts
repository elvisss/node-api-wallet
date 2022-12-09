import db from '../../../../common/persistence/mock.persistence'
import { SubscriptionRepository } from '../../subscription.repository'
import { Subscription } from '../../domain/subscription'

export class SubscriptionMockRepository implements SubscriptionRepository {
  public async find(id: number): Promise<Subscription | null> {
    const table = db.subscription as Subscription[]
    const result = table.find((x) => x.id === id)

    if (result) {
      return Object.assign({ ...result })
    }

    return null
  }

  public async findByUserIdAndCode(
    userId: number,
    code: string
  ): Promise<Subscription | null> {
    const table = db.subscription as Subscription[]
    const result = table.find((x) => x.user_id === userId && x.code === code)

    if (result) {
      return Object.assign({ ...result })
    }

    return null
  }

  public async all(): Promise<Subscription[]> {
    const table = db.subscription as Subscription[]
    return Object.assign([...table])
  }

  public async store(entry: Subscription): Promise<void> {
    const table = db.subscription as Subscription[]
    const now = new Date()

    // set id value
    db._subscriptionId++

    table.push({
      id: db._subscriptionId,
      code: entry.code,
      amount: entry.amount,
      user_id: entry.user_id,
      cron: entry.cron,
      created_at: now,
      updated_at: null,
    } as Subscription)
  }

  public async update(entry: Subscription): Promise<void> {
    const table = db.subscription as Subscription[]
    const now = new Date()

    const originalEntry = table.find((x) => x.id === entry.id)

    if (originalEntry) {
      originalEntry.code = entry.code
      originalEntry.user_id = entry.user_id
      originalEntry.amount = entry.amount
      originalEntry.cron = entry.cron
      originalEntry.updated_at = now
    }
  }

  public async remove(id: number): Promise<void> {
    const table = db.subscription as Subscription[]

    const removeIndex = table.findIndex(x => x.id === id)
    if (removeIndex > -1) {
      db.subscription.splice(removeIndex, 1)
    }
  }
}
