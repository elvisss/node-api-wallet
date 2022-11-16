import connector from '../../../../common/persistence/mysql.persistence'
import { Subscription } from '../../domain/subscription'
import { SubscriptionRepository } from '../../subscription.repository'

export class MySQLSubscriptionRepository implements SubscriptionRepository {
  public async all(): Promise<Subscription[]> {
    const [rows] = await connector.execute(
      'SELECT * FROM subscription ORDER BY id DESC'
    )

    return rows as Subscription[]
  }

  public async find(id: number): Promise<Subscription | null> {
    const [rows]: any[] = await connector.execute(
      'SELECT * FROM subscription WHERE id = ?',
      [id]
    )

    if (!rows.length) {
      return null
    }

    return rows[0] as Subscription
  }

  public async findByUserAndCode(user_id: number, code: string): Promise<Subscription | null> {
    const [rows]: any[] = await connector.execute(
      'SELECT * FROM subscription WHERE user_id = ? AND code = ?',
      [user_id, code]
    )

    if (!rows.length) {
      return null
    }

    return rows[0] as Subscription
  }

  public async store(entry: Subscription): Promise<void> {
    const createdAt = new Date()
    await connector.execute(
      'INSERT INTO subscription(user_id, code, amount, cron, created_at) VALUES (?, ?, ?, ?, ?)',
      [entry.user_id, entry.code, entry.amount, entry.cron, createdAt]
    )
  }

  public async update(entry: Subscription): Promise<void> {
    const updatedAt = new Date()
    await connector.execute(
      'UPDATE subscription SET user_id = ?, code = ?, amount = ?, cron = ?, updated_at = ? WHERE id = ?',
      [entry.user_id, entry.code, entry.amount, entry.cron, updatedAt, entry.id]
    )
  }

  public async remove(id: number): Promise<void> {
    await connector.execute('DELETE FROM subscription WHERE id = ?', [id])
  }
}
