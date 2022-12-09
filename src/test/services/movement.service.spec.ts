import assert from 'assert'
import { MovementType } from '../../common/enums/movement-type'
import { MovementCreateDto } from '../../dto/movement.dto'
import { MovementService } from '../../services/movement.service'
import { BalanceMockRepository } from '../../services/repositories/impl/mock/balance.repository'
import { MovementMockRepository } from '../../services/repositories/impl/mock/movement.repository'

const movementService = new MovementService(
  new MovementMockRepository(),
  new BalanceMockRepository()
)

describe('Movement Service', () => {
  describe('Store', () => {
    it('try to register an income movement', async() => {
      const movementNew: MovementCreateDto = {
        user_id: 1,
        type: MovementType.INCOME,
        amount: 200
      }
      await movementService.store(movementNew)
    })

    it('try to register an outcome movement', async() => {
      const movementNew: MovementCreateDto = {
        user_id: 2,
        type: MovementType.OUTCOME,
        amount: 100
      }
      await movementService.store(movementNew)
    })

    it('try to register an outcome movement with insufficient balance', async() => {
      try {
        const movementNew: MovementCreateDto = {
          user_id: 1,
          type: MovementType.OUTCOME,
          amount: 200
        }
        await movementService.store(movementNew)
      } catch(err: any) {
        assert.equal(err.message, 'User does not have enough balance')
      }
    })

    it('try to register an unexpected movement', async() => {
      try {
        const movementNew: MovementCreateDto = {
          user_id: 1,
          type: 9999,
          amount: 200
        }
        await movementService.store(movementNew)
      } catch(err: any) {
        assert.equal(err.message, 'Invalid movement type supplied')
      }
    })
  })
})
