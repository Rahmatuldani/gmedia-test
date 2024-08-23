import { Request, Response } from "express";
import { Responses } from "../../helpers/response";
import Auth from "../models/auth";
import Cart from "../models/cart";
import CartItem from "../models/cartItem";
import Product from "../models/product";
import { Validation } from "../validators";

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
            const user = await Auth.findByPk(req.body.userId)
            if (!user) {
                return Responses(res, {
                    status: 404,
                    message: "User not found"
                })
            }
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

            if (!cart) {
                return Responses(res, {
                    status: 404,
                    message: "User not have a cart",
                })
            }

            const cartItems = await CartItem.findAll({
                where: {
                    cartId: cart.id
                },
                include: [{
                    model: Product,
                    as: "product"
                }]
            })

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

    async function payment(req: Request, res: Response) {
        if (!Validation(req, res)) return;
        try {
            const user = await Auth.findByPk(req.body.userId)
            if (!user) {
                return Responses(res, {
                    status: 404,
                    message: "User not found"
                })
            }
            const cart = await Cart.findOne({ 
                where: { 
                    userId: req.body.userId,
                    status: 0
                }
            })

            if (!cart) {
                return Responses(res, {
                    status: 404,
                    message: "User not have a cart",
                })
            }
            
            cart.status = 1
            cart.save()

            return Responses(res, {
                status: 200,
                message: "Payment success",
            })
        } catch (error) {
            return Responses(res, {
                status: 500,
                message: "Internal Server Error"
            })
        }
    }

    async function removeItem(req: Request, res: Response) {
        if (!Validation(req, res)) return;
        try {
            const cart = await Cart.findByPk(req.body.cartId)

            if (!cart) {
                return Responses(res, {
                    status: 404,
                    message: "Cart not found",
                })
            }
            
            const cartitem = await CartItem.findByPk(req.body.cartItemId)

            if (!cartitem) {
                return Responses(res, {
                    status: 404,
                    message: "Cart item not found",
                })
            }

            await cartitem.destroy()

            return Responses(res, {
                status: 200,
                message: "Delete cart item success",
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
        find,
        payment,
        removeItem
    }
})()