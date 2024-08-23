import { Request, Response } from "express";
import { Responses } from "../../helpers/response";
import Product from "../models/product";
import Category from "../models/category";

export const ProductController = (() => {
    async function create(req: Request, res: Response) {
        try {
            const category = await Category.findOne({ where: { id: req.body.categoryId } })
            if (!category) {
                return Responses(res, {
                    status: 404,
                    message: "Category not found"
                })
            }
            const product = await Product.create(req.body)
            return Responses(res, {
                status: 201,
                message: "Create product success",
                data: product
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
            const products: Product[] = await Product.findAll({
                include: [{
                    model: Category,
                    as: 'category'
                }]
            })

            return Responses(res, {
                status: 200,
                message: "Fetch product success",
                data: products
            })
        } catch (error) {
            return Responses(res, {
                status: 500,
                message: "Internal Server Error"
            })
        }
    }

    return {
        find,
        create
    }
})();