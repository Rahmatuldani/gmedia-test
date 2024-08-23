import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../config/database";

export type AuthType = {
    id: number;
    name: string;
    username: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

interface AuthAttributes extends Optional<AuthType, 'id' | 'createdAt' | 'updatedAt'> {}

class Auth extends Model<AuthType, AuthAttributes> implements AuthType {
    public id!: number;
    public name!: string;
    public username!: string;
    public password!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}
Auth.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
}, {
    sequelize,
    tableName: "auth",
    timestamps: true
})

export default Auth;