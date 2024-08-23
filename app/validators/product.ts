import { body } from "express-validator";

export const ProductValidator = (() => {
    const create = [
        body("name").exists().withMessage("name is required"),
        body("name").not().isEmpty().withMessage("name must be not null"),
        body("name").isString().withMessage("name must be a string"),
        
        body("price").exists().withMessage("price is required"),
        body("price").not().isEmpty().withMessage("price must be not null"),
        body("price").isNumeric().withMessage("price must be a numeric"),
        
        body("categoryId").exists().withMessage("categoryId is required"),
        body("categoryId").not().isEmpty().withMessage("categoryId must be not null"),
        body("categoryId").isNumeric().withMessage("categoryId must be a numeric"),
    ]

    return {
        create
    }
})();