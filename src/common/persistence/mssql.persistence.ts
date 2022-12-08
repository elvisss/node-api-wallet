import { config as msconfig, ConnectionPool } from 'mssql'
import { config } from '../../../config'

const dbConfig: msconfig = {
  server: config.dbMssqlHost,
  user: config.dbMssqlUser,
  password: config.dbMssqlPassword,
  database: config.dbMssqlName,
  options: {
    enableArithAbort: true,
    trustServerCertificate: true
  },
}

const mssqlConnectionPool = new ConnectionPool(dbConfig)

export default mssqlConnectionPool.connect()
