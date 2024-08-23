import { Request, Response } from "express";
import { Validation } from "../validators";
import { Responses } from "../../helpers/response";
import Category from "../models/category";

export const categoryControllers = (() => {
    async function create(req: Request, res: Response) {
        if (!Validation) return;

        try {
            const category: Category = await Category.create(req.body)
            return Responses(res, {
                status: 201,
                message: "Create new category success",
                data: category
            })
        } catch (error) {
            return Responses(res, {
                status: 500,
                message: "Internal Server Error"
            })
        }
    }

    async function find(req: Request, res: Response) {
        try {
            const categories: Category[] = await Category.findAll()

            return Responses(res, {
                status: 200,
                message: "Fetch categories success",
                data: categories
            })
        } catch (error) {
            return Responses(res, {
                status: 500,
                message: "Internal Server Error"
            })
        }
    }

    return {
        create,
        find
    }
})();