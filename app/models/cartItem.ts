import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../config/database";
import Cart from "./cart";
import Product from "./product";

export type CartItemType = {
    id: number;
    cartId: number;
    productId: number;
    quantity: number;
    createdAt: Date;
    updatedAt: Date;
}

interface CartItemAttributes extends Optional<CartItemType, 'id' | 'createdAt' | 'updatedAt'> {}

class CartItem extends Model<CartItemType, CartItemAttributes> implements CartItemType {
    public id!: number;
    public cartId!: number;
    public productId!: number;
    public quantity!: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}
CartItem.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    cartId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
    productId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
}, {
    sequelize,
    tableName: "cart_items",
    timestamps: true
})

CartItem.belongsTo(Cart, {
    foreignKey: "cartId",
    as: "cart"
})

CartItem.belongsTo(Product, {
    foreignKey: "productId",
    as: "product"
})

export default CartItem;