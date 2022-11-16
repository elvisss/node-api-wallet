import { createContainer, asClass } from 'awilix'
import { scopePerRequest } from 'awilix-express'
import { Application } from 'express'
import { BalanceService } from './services/balance.service'
import { MySQLSubscriptionRepository } from './services/repositories/impl/mysql/subscription.repository'
import { MySQLBalanceRepository } from './services/repositories/impl/mysql/balance.repository'
import { SubscriptionService } from './services/subscription.service'
import { MySQLMovementRepository } from './services/repositories/impl/mysql/movement.repository'
import { MovementService } from './services/movement.service'

export default (app: Application) => {
  const container = createContainer({
    injectionMode: 'CLASSIC'
  })

  container.register({
    // repositories
    subscriptionRepository: asClass(MySQLSubscriptionRepository).scoped(),
    balanceRepository: asClass(MySQLBalanceRepository).scoped(),
    movementRepository: asClass(MySQLMovementRepository).scoped(),

    // services
    subscriptionService: asClass(SubscriptionService).scoped(),
    balanceService: asClass(BalanceService).scoped(),
    movementService: asClass(MovementService).scoped(),
  })

  app.use(scopePerRequest(container))
}
