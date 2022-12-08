import connector from '../../../../common/persistence/mssql.persistence'
import { Movement } from '../../domain/movement'
import { MovementRepository } from '../../movement.repository'

export class MSSQLMovementRepository implements MovementRepository {
  public async all(): Promise<Movement[]> {
    const pool = await connector
    const result = await pool.query`SELECT * FROM movement ORDER BY id DESC`

    return result.recordset
  }

  public async find(id: number): Promise<Movement | null> {
    const pool = await connector
    const result = await pool.query`SELECT * FROM movement WHERE id = ${id}`

    if (!result.rowsAffected) {
      return null
    }

    return result.recordset[0]
  }

  public async store(entry: Movement): Promise<void> {
    const createdAt = new Date()
    const pool = await connector
    await pool.query`INSERT INTO movement(user_id, type, amount, created_at) VALUES (${entry.user_id}, ${entry.type}, ${entry.amount}, ${createdAt})`
  }

  public async update(entry: Movement): Promise<void> {
    const updatedAt = new Date()
    const pool = await connector
    await pool.query`UPDATE movement SET user_id = ${entry.user_id}, type = ${entry.type}, amount = ${entry.amount}, updated_at = ${updatedAt} WHERE id = ${entry.id}`
  }

  public async remove(id: number): Promise<void> {
    const pool = await connector
    await pool.query(`DELETE FROM movement WHERE id = ${id}`)
  }
}
