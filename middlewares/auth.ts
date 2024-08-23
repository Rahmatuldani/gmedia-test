import { NextFunction, Request, Response } from "express";
import { Responses } from "../helpers/response";
import { verify } from "jsonwebtoken";
import { appConfig } from "../config/app";
import Auth from "../app/models/auth";

export async function AuthMiddleware(req: Request, res: Response, next: NextFunction) {
    const token = req.headers["authorization"]
    if (!token) {
        return Responses(res, {
            status: 401,
            message: "A token is required for authentication"
        })
    }
    
    try {
        const decode = verify(token, appConfig.secret) as {id: string}
        const user = await Auth.findOne({ where: { id: parseInt(decode.id) }})
        if (!user) {
            return Responses(res, {
                status: 401,
                message: "invalid Credential"
            })
        }
        
        return next()
    } catch (err) {
        return Responses(res, {
            status: 401,
            message: "invalid Credential"
        })
    }
}