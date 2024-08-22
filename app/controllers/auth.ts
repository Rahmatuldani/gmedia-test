import { Request, Response } from "express";

const authControllers = (() => {
    function login(req: Request, res: Response) {
        return res.status(200).json({
            message: "Auth controller"
        })
    }
    
    return {
        login
    }
})();

export default authControllers;