import db from '../../../../common/persistence/mock.persistence'
import { Movement } from '../../domain/movement'
import { MovementRepository } from '../../movement.repository'

export class MovementMockRepository implements MovementRepository {
  public async all(): Promise<Movement[]> {
    const table = db.movement as Movement[]
    return [ ...table ]
  }

  public async find(id: number): Promise<Movement | null> {
    const table = db.movement as Movement[]
    const result = table.find((x) => x.id === id)
    if (!result) {
      return null
    }
    return { ...result }
  }

  public async store(entry: Movement): Promise<void> {
    const table = db.movement as Movement[]
    const createdAt = new Date()
    db._movementId++

    const newMovement: Movement = {
      id: db._movementId,
      type: entry.type,
      amount: entry.amount,
      user_id: entry.user_id,
      created_at: createdAt,
      updated_at: null,
    }

    table.push(newMovement)
  }

  public async update(entry: Movement): Promise<void> {
    const table = db.movement as Movement[]
    const updatedAt = new Date()

    const originalEntry = table.find((x) => x.id === entry.id)

    if (originalEntry) {
      originalEntry.type = entry.type
      originalEntry.user_id = entry.user_id
      originalEntry.amount = entry.amount
      originalEntry.updated_at = updatedAt
    }
  }

  public async remove(id: number): Promise<void> {
    const table = db.movement as Movement[]
    const removeIndex = table.findIndex(x => x.id === id)
    if (removeIndex > -1) {
      db.movement.splice(removeIndex, 1)
    }
  }
}
