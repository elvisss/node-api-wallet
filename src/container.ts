import { createContainer, asClass } from 'awilix'
import { scopePerRequest } from 'awilix-express'
import { Application } from 'express'
import { MySQLSubscriptionRepository } from './services/repositories/impl/mysql/subscription.repository'
import { SubscriptionService } from './services/subscription.service'
import { TestService } from './services/test.service'

export default (app: Application) => {
  const container = createContainer({
    injectionMode: 'CLASSIC'
  })

  container.register({
    // repositories
    subscriptionRepository: asClass(MySQLSubscriptionRepository).scoped(),

    // services
    subscriptionService: asClass(SubscriptionService).scoped(),
    testService: asClass(TestService).scoped(),
  })

  app.use(scopePerRequest(container))
}
