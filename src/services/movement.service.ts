import { ApplicationException } from '../common/exception/application.exception'
import { MovementCreateDto, MovementUpdateDto } from '../dto/movement.dto'
import { Movement } from './repositories/domain/movement'
import { MovementRepository } from './repositories/movement.repository'

export class MovementService {
  constructor(private readonly movementRepository: MovementRepository) {}

  public async find(id: number): Promise<Movement | null> {
    return await this.movementRepository.find(id)
  }

  public async all(): Promise<Movement[]> {
    return await this.movementRepository.all()
  }

  public async store(entry: MovementCreateDto): Promise<void> {
    return await this.movementRepository.store(entry as Movement)
  }

  public async update(id: number, entry: MovementUpdateDto): Promise<void> {
    const originalEntry = await this.movementRepository.find(id)

    if (!originalEntry) {
      throw new ApplicationException('Movement not found', 404)
    }

    originalEntry.amount = entry.amount
    originalEntry.type = entry.type

    await this.movementRepository.update(originalEntry)
  }

  public async remove(id: number): Promise<void> {
    const originalEntry = await this.movementRepository.find(id)

    if (!originalEntry) {
      throw new ApplicationException('Movement not found', 404)
    }

    await this.movementRepository.remove(id)
  }
}
