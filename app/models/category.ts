import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../config/database";

export type CategoryType = {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
}

interface CategoryAttributes extends Optional<CategoryType, 'id' | 'createdAt' | 'updatedAt'> {}

class Category extends Model<CategoryType, CategoryAttributes> implements CategoryType {
    public id!: number;
    public name!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Category.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
}, {
    sequelize,
    tableName: "categories",
    timestamps: true
})

export default Category;