import { createContainer, asClass } from 'awilix'
import { scopePerRequest } from 'awilix-express'
import { Application } from 'express'
import { BalanceService } from './services/balance.service'
import { SubscriptionService } from './services/subscription.service'
/* import { MySQLSubscriptionRepository } from './services/repositories/impl/mysql/subscription.repository'
import { MySQLBalanceRepository } from './services/repositories/impl/mysql/balance.repository'
import { MySQLMovementRepository } from './services/repositories/impl/mysql/movement.repository' */
import { MovementService } from './services/movement.service'
import { MSSQLSubscriptionRepository } from './services/repositories/impl/mssql/subscription.repository'
import { MSSQLBalanceRepository } from './services/repositories/impl/mssql/balance.repository'
import { MSSQLMovementRepository } from './services/repositories/impl/mssql/movement.repository'

export default (app: Application) => {
  const container = createContainer({
    injectionMode: 'CLASSIC'
  })

  container.register({
    // repositories
    /* subscriptionRepository: asClass(MySQLSubscriptionRepository).scoped(),
    balanceRepository: asClass(MySQLBalanceRepository).scoped(),
    movementRepository: asClass(MySQLMovementRepository).scoped(), */

    subscriptionRepository: asClass(MSSQLSubscriptionRepository).scoped(),
    balanceRepository: asClass(MSSQLBalanceRepository).scoped(),
    movementRepository: asClass(MSSQLMovementRepository).scoped(),

    // services
    subscriptionService: asClass(SubscriptionService).scoped(),
    balanceService: asClass(BalanceService).scoped(),
    movementService: asClass(MovementService).scoped(),
  })

  app.use(scopePerRequest(container))
}
