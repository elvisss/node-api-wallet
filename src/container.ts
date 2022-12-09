import { createContainer, asClass } from 'awilix'
import { scopePerRequest } from 'awilix-express'
import { Application } from 'express'
import { MovementService } from './services/movement.service'
import { BalanceService } from './services/balance.service'
import { SubscriptionService } from './services/subscription.service'

import { MySQLSubscriptionRepository } from './services/repositories/impl/mysql/subscription.repository'
import { MySQLBalanceRepository } from './services/repositories/impl/mysql/balance.repository'
import { MySQLMovementRepository } from './services/repositories/impl/mysql/movement.repository'

/* import { MSSQLSubscriptionRepository } from './services/repositories/impl/mssql/subscription.repository'
import { MSSQLBalanceRepository } from './services/repositories/impl/mssql/balance.repository'
import { MSSQLMovementRepository } from './services/repositories/impl/mssql/movement.repository' */

/* import { BalanceMockRepository } from './services/repositories/impl/mock/balance.repository'
import { MovementMockRepository } from './services/repositories/impl/mock/movement.repository'
import { SubscriptionMockRepository } from './services/repositories/impl/mock/subscription.repository' */

export default (app: Application) => {
  const container = createContainer({
    injectionMode: 'CLASSIC'
  })

  container.register({
    // repositories

    // MYSQL
    subscriptionRepository: asClass(MySQLSubscriptionRepository).scoped(),
    balanceRepository: asClass(MySQLBalanceRepository).scoped(),
    movementRepository: asClass(MySQLMovementRepository).scoped(),

    // MSSQL
    /* subscriptionRepository: asClass(MSSQLSubscriptionRepository).scoped(),
    balanceRepository: asClass(MSSQLBalanceRepository).scoped(),
    movementRepository: asClass(MSSQLMovementRepository).scoped(), */

    // MOCK
    /* subscriptionRepository: asClass(SubscriptionMockRepository).scoped(),
    balanceRepository: asClass(BalanceMockRepository).scoped(),
    movementRepository: asClass(MovementMockRepository).scoped(), */

    // services
    subscriptionService: asClass(SubscriptionService).scoped(),
    balanceService: asClass(BalanceService).scoped(),
    movementService: asClass(MovementService).scoped(),
  })

  app.use(scopePerRequest(container))
}
