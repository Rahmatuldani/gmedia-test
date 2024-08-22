import dotenv from 'dotenv'

dotenv.config()

export const appConfig = {
    port: process.env.APP_PORT || 8080,
    host: process.env.APP_HOST || "localhost",
    env: process.env.APP_ENV || "local",

    dbConnection: process.env.DB_CONNECTION || "mysql",
    dbHost: process.env.DB_HOST || "127.0.0.1",
    dbPort: process.env.DB_PORT || 3306,
    dbUsername: process.env.DB_USERNAME || "",
    dbPassword: process.env.DB_PASSWORD || "",
    dbName: process.env.DB_DATABASE || "gmedia"
}