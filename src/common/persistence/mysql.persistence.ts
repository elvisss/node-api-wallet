import { createPool } from 'mysql2/promise'
import { config } from '../../../config'

export default createPool({
  host: config.dbHost,
  user: config.dbUser,
  password: config.dbPassword,
  database: config.dbName,
  port: config.dbPort,
  decimalNumbers: true
})
