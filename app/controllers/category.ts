import { Request, Response } from "express";

export const categoryControllers = (() => {
    function create(req: Request, res: Response) {
        return res.status(201).json({
            nessage: "Create category function"
        })
    }

    function find(req: Request, res: Response) {
        return res.status(200).json({
            message: "Fetch category funciton"
        })
    }

    return {
        create,
        find
    }
})();