import express, { Router } from "express";
import { CartController } from "../app/controllers/cart";
import { CartValidator } from "../app/validators/cart";
import { AuthMiddleware } from "../middlewares/auth";

const cartRoutes: Router = express.Router()

/**
 * @openapi
 * /cart/add:
 *  post:
 *      tags:
 *      - Cart
 *      summary: Add item to cart
 *      security: 
 *          - bearerAuth: []
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      required:
 *                          - userId
 *                          - productId
 *                          - quantity
 *                      properties:
 *                          userId:
 *                              type: number
 *                              example: 0
 *                          productId:
 *                              type: number
 *                              example: 0
 *                          quantity:
 *                              type: number
 *                              example: 0
 *      responses:
 *          200:
 *              description: OK
 *          500:
 *              description: Internal Service Error
 */
cartRoutes.post("/add", AuthMiddleware, CartValidator.add, CartController.add)

/**
 * @openapi
 * /cart/find:
 *  post:
 *      tags:
 *      - Cart
 *      summary: Find user cart
 *      security: 
 *          - bearerAuth: []
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      required:
 *                          - userId
 *                      properties:
 *                          userId:
 *                              type: number
 *                              example: 0
 *      responses:
 *          200:
 *              description: OK
 *          500:
 *              description: Internal Service Error
 */
cartRoutes.post("/find", AuthMiddleware, CartValidator.find, CartController.find)


/**
 * @openapi
 * /cart/payment:
 *  post:
 *      tags:
 *      - Cart
 *      summary: Pay user cart
 *      security: 
 *          - bearerAuth: []
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      required:
 *                          - userId
 *                      properties:
 *                          userId:
 *                              type: number
 *                              example: 0
 *      responses:
 *          200:
 *              description: OK
 *          500:
 *              description: Internal Service Error
 */
cartRoutes.post("/payment", AuthMiddleware, CartValidator.find, CartController.payment)

/**
 * @openapi
 * /cart/deleteItem:
 *  delete:
 *      tags:
 *      - Cart
 *      summary: Delete cart item
 *      security: 
 *          - bearerAuth: []
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      required:
 *                          - cartId
 *                          - cartItemId
 *                      properties:
 *                          cartId:
 *                              type: number
 *                              example: 0
 *                          cartItemId:
 *                              type: number
 *                              example: 0
 *      responses:
 *          200:
 *              description: OK
 *          500:
 *              description: Internal Service Error
 */
cartRoutes.delete("/deleteItem", AuthMiddleware, CartValidator.deleteItem, CartController.removeItem)

export default cartRoutes;