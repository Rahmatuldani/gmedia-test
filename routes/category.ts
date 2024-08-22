import express, { Router } from "express";
import { categoryControllers } from "../app/controllers/category";

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
 *      responses:
 *          200:
 *              description: Success
 *          500:
 *              description: Internal Service Error
 */
categoryRoutes.post("/", categoryControllers.create)

export default categoryRoutes;