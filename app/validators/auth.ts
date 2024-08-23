import { body } from "express-validator";

export const AuthMiddleware = (() => {
    const login = [
        body("username").exists().withMessage("username is required"),
        body("username").not().isEmpty().withMessage("username must be not null"),
        body("username").isString().withMessage("username must be a string"),

        body("password").exists().withMessage("password is required"),
        body("password").not().isEmpty().withMessage("password must be not null")
    ]

    const register = login && [
        body("name").exists().withMessage("name is required"),
        body("name").not().isEmpty().withMessage("name must be not null"),
        body("name").isString().withMessage("name must be a string"),
    ]

    return {
        login,
        register
    }
})();