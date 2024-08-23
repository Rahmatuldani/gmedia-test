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

    const deleteItem = [
        body("cartId").exists().withMessage("cartId is required"),
        body("cartId").not().isEmpty().withMessage("cartId must be not null"),
        body("cartId").isNumeric().withMessage("cartId must be a Numeric"),

        body("cartItemId").exists().withMessage("cartItemId is required"),
        body("cartItemId").not().isEmpty().withMessage("cartItemId must be not null"),
        body("cartItemId").isNumeric().withMessage("cartItemId must be a Numeric"),
    ]

    return {
        add,
        find,
        deleteItem
    }
})();