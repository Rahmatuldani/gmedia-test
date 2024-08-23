import { Request, Response } from "express";
import { Responses } from "../../helpers/response";
import Auth from "../models/auth";
import Cart from "../models/cart";
import CartItem from "../models/cartItem";
import Product from "../models/product";
import { Validation } from "../validators";
import Category from "../models/category";

export const CartController = (() => {
    async function add(req: Request, res: Response) {
        if (!Validation(req, res)) return;

        try {
            const user = await Auth.findByPk(req.body.userId)
            if (!user) {
                return Responses(res, {
                    status: 404,
                    message: "User not found"
                })
            }
            
            const product = await Product.findByPk(req.body.productId)
            if (!product) {
                return Responses(res, {
                    status: 404,
                    message: "Product not found"
                })
            }
            
            let cart = await Cart.findOne({
                where: { 
                    userId: user.id,
                    status: 0
                } 
            })

            if (!cart) {
                cart = await Cart.create({
                    userId: user.id
                })
            }

            await CartItem.create({
                cartId: cart.id,
                productId: product.id,
                quantity: req.body.quantity
            })
            
            return Responses(res, {
                status: 200,
                message: "Add cart item success"
            })
        } catch (error) {
            return Responses(res, {
                status: 500,
                message: "Internal Server Error"
            })
        }
    }

    async function find(req: Request, res: Response) {
        if (!Validation(req, res)) return;

        try {
            const cart = await Cart.findOne({ 
                where: { 
                    userId: req.body.userId,
                    status: 0
                },
                include: [{
                    model: Auth,
                    as: "user"
                }] 
            })

            let cartItems;
            if (cart) {
                cartItems = await CartItem.findAll({
                    where: {
                        cartId: cart.id
                    },
                    include: [{
                        model: Product,
                        as: "product"
                    }]
                })
            }

            return Responses(res, {
                status: 200,
                message: "Get user cart success",
                data: {
                    cart: cart,
                    cartItems: cartItems
                }
            })
        } catch (error) {
            return Responses(res, {
                status: 500,
                message: "Internal Server Error"
            })
        }
    }

    return {
        add,
        find
    }
})()