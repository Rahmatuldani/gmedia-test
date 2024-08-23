import express, { Router } from "express";
import authControllers from "../app/controllers/auth";
import { AuthValidator } from "../app/validators/auth";

const authRoutes: Router = express.Router()

/**
 * @openapi
 * /login:
 *  post:
 *      tags:
 *      - Auth
 *      summary: Login user
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      required:
 *                          - username
 *                          - password
 *                      properties:
 *                          username:
 *                              type: string
 *                              example: string
 *                          password:
 *                              type: string
 *                              example: string
 *      responses:
 *          200:
 *              description: OK
 *          500:
 *              description: Internal Service Error
 */
authRoutes.post("/login", AuthValidator.login, authControllers.login)

/**
 * @openapi
 * /register:
 *  post:
 *      tags:
 *      - Auth
 *      summary: Create new user
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      required:
 *                          - name
 *                          - username
 *                          - password
 *                      properties:
 *                          name:
 *                              type: string
 *                              example: string
 *                          username:
 *                              type: string
 *                              example: string
 *                          password:
 *                              type: string
 *                              example: string
 *      responses:
 *          200:
 *              description: OK
 *          500:
 *              description: Internal Service Error
 */
authRoutes.post("/register", AuthValidator.register, authControllers.register)

export default authRoutes;