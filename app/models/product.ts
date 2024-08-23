import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../config/database";
import Category from "./category";

export type ProductType = {
    id: number;
    name: string;
    price: number;
    categoryId: number;
    createdAt: Date;
    updatedAt: Date;
}

interface ProductAttributes extends Optional<ProductType, 'id' | 'createdAt' | 'updatedAt'> {}

class Product extends Model<ProductType, ProductAttributes> implements ProductType {
    public id!: number;
    public name!: string;
    public price!: number;
    public categoryId!: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Product.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    categoryId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
}, {
    sequelize,
    tableName: "products",
    timestamps: true
})

Product.belongsTo(Category, {
    targetKey: "id",
    foreignKey: "categoryId",
    as: "category"
})

export default Product;