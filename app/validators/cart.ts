import { body } from "express-validator";

export const CartValidator = (() => {
    const find = [
        body("userId").exists().withMessage("userId is required"),
        body("userId").not().isEmpty().withMessage("userId must be not null"),
        body("userId").isNumeric().withMessage("userId must be a Numeric"),
    ]
    
    const add = find && [        
        body("productId").exists().withMessage("productId is required"),
        body("productId").not().isEmpty().withMessage("productId must be not null"),
        body("productId").isNumeric().withMessage("productId must be a Numeric"),
        
        body("quantity").exists().withMessage("quantity is required"),
        body("quantity").not().isEmpty().withMessage("quantity must be not null"),
        body("quantity").isNumeric().withMessage("quantity must be a Numeric"),
    ]

    return {
        add,
        find
    }
})();