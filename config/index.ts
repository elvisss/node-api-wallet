import dotenv from 'dotenv'
dotenv.config()

export const config = {
  dev: process.env.NODE_ENV !== 'production',
  nodeEnv: process.env.NODE_ENV || 'dev',
  appEnv: process.env.APP_ENV || 'dev',
  port: process.env.PORT || 3000,
  dbName: process.env.DB_NAME || '',
  dbHost: process.env.DB_HOST || 'localhost',
  dbPort: Number(process.env.DB_PORT) || 3306,
  dbUser: process.env.DB_USER || '',
  dbPassword: process.env.DB_PASSWORD || '',
}
