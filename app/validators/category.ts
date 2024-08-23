import { body } from "express-validator";

export const CategoryValidator = (() => {
    const create = [
        body("name").exists().withMessage("name is required"),
        body("name").not().isEmpty().withMessage("name must be not null"),
        body("name").isString().withMessage("name must be a string"),
    ]

    return {
        create
    }
})();