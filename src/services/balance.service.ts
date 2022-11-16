import { ApplicationException } from '../common/exception/application.exception'
import { BalanceCreateDto, BalanceUpdateDto } from '../dto/balance.dto'
import { Balance } from './repositories/domain/balance'
import { BalanceRepository } from './repositories/balance.repository'

export class BalanceService {
  constructor(private readonly balanceRepository: BalanceRepository) {}

  public async find(id: number): Promise<Balance | null> {
    return await this.balanceRepository.find(id)
  }

  public async all(): Promise<Balance[]> {
    return await this.balanceRepository.all()
  }

  public async store(entry: BalanceCreateDto): Promise<void> {
    return await this.balanceRepository.store(entry as Balance)
  }

  public async update(id: number, entry: BalanceUpdateDto): Promise<void> {
    const originalEntry = await this.balanceRepository.find(id)

    if (!originalEntry) {
      throw new ApplicationException('Balance not found', 404)
    }

    originalEntry.amount = entry.amount

    await this.balanceRepository.update(originalEntry)
  }

  public async remove(id: number): Promise<void> {
    const originalEntry = await this.balanceRepository.find(id)

    if (!originalEntry) {
      throw new ApplicationException('Balance not found', 404)
    }

    await this.balanceRepository.remove(id)
  }
}
