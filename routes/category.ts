import express, { Router } from "express";
import { categoryControllers } from "../app/controllers/category";
import { AuthMiddleware } from "../middlewares/auth";
import { CategoryValidator } from "../app/validators/category";

const categoryRoutes: Router = express.Router()

/**
 * @openapi
 * /categories:
 *  get:
 *      tags:
 *      - Categories
 *      summary: Fetch all category data
 *      responses:
 *          200:
 *              description: Success
 *          500:
 *              description: Internal Service Error
 */
categoryRoutes.get("/", categoryControllers.find)

/**
 * @openapi
 * /categories:
 *  post:
 *      tags:
 *      - Categories
 *      summary: Create new category
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      required:
 *                          - name
 *                      properties:
 *                          name:
 *                              type: string
 *                              example: string
 *      responses:
 *          200:
 *              description: Success
 *          500:
 *              description: Internal Service Error
 */
categoryRoutes.post("/", CategoryValidator.create, categoryControllers.create)

export default categoryRoutes;