import { appConfig } from './app';
import { Sequelize } from "sequelize";
import { Client } from 'pg';

export const createDatabase = async () => {
    const connection = new Client ({
        user: appConfig.dbUsername,
        host: appConfig.dbHost,
        database: "postgres",
        password: appConfig.dbPassword,
        port: 5432
    })
    try {
        await connection.connect()

        const res = await connection.query(`SELECT 1 FROM pg_database WHERE datname = $1`, [appConfig.dbName])

        if (res.rowCount === 0) {
            await connection.query(`CREATE DATABASE ${appConfig.dbName}`);
        }

        // Close the connection
        await connection.end();
    } catch (error) {
        return error
    }
}

export const sequelize: Sequelize = new Sequelize(appConfig.dbName, appConfig.dbUsername, appConfig.dbPassword, {
    host: appConfig.dbHost,
    dialect: "postgres"
})