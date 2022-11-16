import connector from '../../../../common/persistence/mysql.persistence'
import { Balance } from '../../domain/balance'
import { BalanceRepository } from '../../balance.repository'

export class MySQLBalanceRepository implements BalanceRepository {
  public async all(): Promise<Balance[]> {
    const [rows] = await connector.execute(
      'SELECT * FROM balance ORDER BY id DESC'
    )

    return rows as Balance[]
  }

  public async find(id: number): Promise<Balance | null> {
    const [rows]: any[] = await connector.execute(
      'SELECT * FROM balance WHERE id = ?',
      [id]
    )

    if (!rows.length) {
      return null
    }

    return rows[0] as Balance
  }

  public async findByUserId(user_id: number): Promise<Balance | null> {
    const [rows]: any[] = await connector.execute(
      'SELECT * FROM balance WHERE user_id = ?',
      [user_id]
    )

    if (!rows.length) {
      return null
    }

    return rows[0] as Balance
  }

  public async store(entry: Balance): Promise<void> {
    const createdAt = new Date()
    await connector.execute(
      'INSERT INTO balance(user_id, amount, created_at) VALUES (?, ?, ?)',
      [entry.user_id, entry.amount, createdAt]
    )
  }

  public async update(entry: Balance): Promise<void> {
    const updatedAt = new Date()
    await connector.execute(
      'UPDATE balance SET user_id = ?, amount = ?, updated_at = ? WHERE id = ?',
      [entry.user_id, entry.amount, updatedAt, entry.id]
    )
  }

  public async remove(id: number): Promise<void> {
    await connector.execute('DELETE FROM balance WHERE id = ?', [id])
  }
}
