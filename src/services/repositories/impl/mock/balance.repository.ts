import db from '../../../../common/persistence/mock.persistence'
import { Balance } from '../../domain/balance'
import { BalanceRepository } from '../../balance.repository'

export class BalanceMockRepository implements BalanceRepository {
  private table: Balance[]

  constructor() {
    this.table = db.balance as Balance[]
  }

  public async find(id: number): Promise<Balance | null> {
    const result = this.table.find((x) => x.id === id)

    if (result) {
      return { ...result }
    }

    return null
  }

  public async findByUserId(userId: number): Promise<Balance | null> {
    const result = this.table.find((x) => x.user_id === userId)

    if (result) {
      return { ...result }
    }

    return null
  }

  public async all(): Promise<Balance[]> {
    return [...this.table]
  }

  public async store(entry: Balance): Promise<void> {
    const now = new Date()

    // set id value
    db._balanceId++

    this.table.push({
      id: db._balanceId,
      amount: entry.amount,
      user_id: entry.user_id,
      created_at: now,
      updated_at: null,
    } as Balance)
  }

  public async update(entry: Balance): Promise<void> {
    const now = new Date()

    const originalEntry = this.table.find((x) => x.id === entry.id)

    if (originalEntry) {
      originalEntry.user_id = entry.user_id
      originalEntry.amount = entry.amount
      originalEntry.updated_at = now
    }
  }

  public async remove(id: number): Promise<void> {
    const removeIndex = this.table.findIndex(x => x.id === id)
    if (removeIndex > -1) {
      db.balance.splice(removeIndex, 1)
    }
  }
}
