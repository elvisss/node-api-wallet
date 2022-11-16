import connector from '../../../../common/persistence/mysql.persistence'
import { Movement } from '../../domain/movement'
import { MovementRepository } from '../../movement.repository'

export class MySQLMovementRepository implements MovementRepository {
  public async all(): Promise<Movement[]> {
    const [rows] = await connector.execute(
      'SELECT * FROM movement ORDER BY id DESC'
    )

    return rows as Movement[]
  }

  public async find(id: number): Promise<Movement | null> {
    const [rows]: any[] = await connector.execute(
      'SELECT * FROM movement WHERE id = ?',
      [id]
    )

    if (!rows.length) {
      return null
    }

    return rows[0] as Movement
  }

  public async store(entry: Movement): Promise<void> {
    const createdAt = new Date()
    await connector.execute(
      'INSERT INTO movement(user_id, type, amount, created_at) VALUES (?, ?, ?, ?)',
      [entry.user_id, entry.type, entry.amount, createdAt]
    )
  }

  public async update(entry: Movement): Promise<void> {
    const updatedAt = new Date()
    await connector.execute(
      'UPDATE movement SET user_id = ?, type = ?, amount = ?, updated_at = ? WHERE id = ?',
      [entry.user_id, entry.type, entry.amount, updatedAt, entry.id]
    )
  }

  public async remove(id: number): Promise<void> {
    await connector.execute('DELETE FROM movement WHERE id = ?', [id])
  }
}
