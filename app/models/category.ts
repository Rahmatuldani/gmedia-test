import { DataTypes } from "sequelize";
import { sequelize } from "../../config/database";

export const Category = sequelize.define('category', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: "categories",
        timestamps: true
    }
)