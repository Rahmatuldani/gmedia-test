import { appConfig } from './app';
import { Sequelize } from "sequelize";
import mysql from "mysql2/promise"

export const createDatabase = async () => {
    try {
        const connection = await mysql.createConnection({
            host: appConfig.dbHost,
            user: appConfig.dbUsername,
            password: appConfig.dbPassword
        })

        await connection.query(`CREATE DATABASE IF NOT EXISTS \`${appConfig.dbName}\`;`)

        await connection.end();
    } catch (error) {
        console.error('[database] Error : ', error)
    }
}

export const sequelize: Sequelize = new Sequelize(appConfig.dbName, appConfig.dbUsername, appConfig.dbPassword, {
    host: appConfig.dbHost,
    dialect: "mysql"
})