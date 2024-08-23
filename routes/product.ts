import express, { Router } from "express";
import { ProductController } from "../app/controllers/product";
import { ProductValidator } from "../app/validators/product";
import { AuthMiddleware } from "../middlewares/auth";

const productRoutes: Router = express.Router()

/**
 * @openapi
 * /products:
 *  get:
 *      tags:
 *      - Products
 *      summary: Fetch all product data
 *      security: 
 *          - bearerAuth: []
 *      responses:
 *          200:
 *              description: Success
 *          500:
 *              description: Internal Service Error
 */
productRoutes.get("/", AuthMiddleware, ProductController.find)

/**
 * @openapi
 * /products:
 *  post:
 *      tags:
 *      - Products
 *      summary: Create new product
 *      security: 
 *          - bearerAuth: []
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      required:
 *                          - name
 *                          - price
 *                          - categoryId
 *                      properties:
 *                          name:
 *                              type: string
 *                              example: string
 *                          price:
 *                              type: number
 *                              example: 0
 *                          categoryId:
 *                              type: number
 *                              example: 0
 *      responses:
 *          201:
 *              description: Success
 *          500:
 *              description: Internal Service Error
 */
productRoutes.post("/", AuthMiddleware, ProductValidator.create, ProductController.create)

export default productRoutes