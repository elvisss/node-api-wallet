import { createPool } from 'mysql2/promise'
import { config } from '../../../config'

export default createPool({
  host: config.dbMysqlHost,
  user: config.dbMysqlUser,
  password: config.dbMysqlPassword,
  database: config.dbMysqlName,
  port: config.dbMysqlPort,
  decimalNumbers: true
})
