import dotenv from 'dotenv'
dotenv.config()

export const config = {
  dev: process.env.NODE_ENV !== 'production',
  nodeEnv: process.env.NODE_ENV || 'dev',
  appEnv: process.env.APP_ENV || 'dev',
  port: process.env.PORT || 3000,
  dbMysqlName: process.env.DB_MYSQL_NAME || '',
  dbMysqlHost: process.env.DB_MYSQL_HOST || 'localhost',
  dbMysqlPort: Number(process.env.DB_MYSQL_PORT) || 3306,
  dbMysqlUser: process.env.DB_MYSQL_USER || '',
  dbMysqlPassword: process.env.DB_MYSQL_PASSWORD || '',
  dbMssqlName: process.env.DB_MSSQL_NAME || '',
  dbMssqlHost: process.env.DB_MSSQL_HOST || 'localhost',
  dbMssqlPort: Number(process.env.DB_MSSQL_PORT) || 3306,
  dbMssqlUser: process.env.DB_MSSQL_USER || '',
  dbMssqlPassword: process.env.DB_MSSQL_PASSWORD || '',
}
