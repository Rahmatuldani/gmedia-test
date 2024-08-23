import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../config/database";
import Auth from "./auth";
import CartItem from "./cartItem";

export type CartType = {
    id: number;
    userId: number;
    status: number;
    createdAt: Date;
    updatedAt: Date;
}

interface CartAttributes extends Optional<CartType, 'id' | 'createdAt' | 'updatedAt' | 'status'> {}

class Cart extends Model<CartType, CartAttributes> implements CartType {
    public id!: number;
    public userId!: number;
    public status!: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}
Cart.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    userId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
    status: {
        type: DataTypes.TINYINT.UNSIGNED,
        allowNull: false,
        defaultValue: 0
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
}, {
    sequelize,
    tableName: "carts",
    timestamps: true
})

Cart.belongsTo(Auth, {
    foreignKey: "userId",
    as: "user"
})

export default Cart;