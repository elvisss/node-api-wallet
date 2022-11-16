import { MovementType } from '../common/enums/movement-type'
import { ApplicationException } from '../common/exception/application.exception'
import { BalanceCreateDto } from '../dto/balance.dto'
import { MovementCreateDto } from '../dto/movement.dto'
import { BalanceRepository } from './repositories/balance.repository'
import { Balance } from './repositories/domain/balance'
import { Movement } from './repositories/domain/movement'
import { MovementRepository } from './repositories/movement.repository'

export class MovementService {
  constructor(
    private readonly movementRepository: MovementRepository,
    private readonly balanceRepository: BalanceRepository
  ) {}

  public async find(id: number): Promise<Movement | null> {
    return await this.movementRepository.find(id)
  }

  public async all(): Promise<Movement[]> {
    return await this.movementRepository.all()
  }

  public async store(entry: MovementCreateDto): Promise<void> {
    if (!Object.values(MovementType).includes(entry.type)) {
      throw new ApplicationException('Invalid movement type supplied')
    }

    const balance = await this.balanceRepository.findByUserId(entry.user_id)

    if (entry.type === MovementType.INCOME) {
      await this.income(entry, balance)
    }

    if (entry.type === MovementType.OUTCOME) {
      await this.outcome(entry, balance)
    }
  }

  private async income(entry: MovementCreateDto, balance: Balance | null) {
    if (!balance) {
      const balanceCreate: BalanceCreateDto = {
        user_id: entry.user_id,
        amount: entry.amount,
      }
      await this.balanceRepository.store(balanceCreate as Balance)
    } else {
      balance.amount += entry.amount
      await this.balanceRepository.update(balance)
    }

    await this.movementRepository.store(entry as Movement)
  }

  private async outcome(entry: MovementCreateDto, balance: Balance | null) {
    if (!balance || balance.amount < entry.amount) {
      throw new ApplicationException('User does not have enough balance')
    }

    balance.amount -= entry.amount

    await this.balanceRepository.update(balance)
    await this.movementRepository.store(entry as Movement)
  }
}
