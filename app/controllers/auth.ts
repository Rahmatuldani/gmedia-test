import { Request, Response } from "express";
import { Validation } from "../validators";
import { Responses } from "../../helpers/response";
import { Hash } from "../../helpers/hash";
import Auth from '../models/auth'
import { JWT } from "../../helpers/jwt";

const authControllers = (() => {
    async function login(req: Request, res: Response) {
        if (!Validation(req, res)) return;

        try {
            const auth: Auth | null = await Auth.findOne({
                where: { username: req.body.username }
            })

            if(!auth) return Responses(res, {
                status: 404,
                message: "User not found"
            })

            if (!Hash.compare(req.body.password, auth.password)) return Responses(res, {
                status: 404,
                message: "Wrong password"
            })

            const jwt = JWT.generate(auth.id.toString())

            return Responses(res, {
                status: 200,
                message: "Login success",
                data: jwt
            })
        } catch (error) {
            console.error(error)
            return Responses(res, {
                status: 500,
                message: "Internal Server Error"
            })
        }
    }

    async function register(req: Request, res: Response) {
        if (!Validation(req, res)) return;

        try {
            const auth = await Auth.create({
                name: req.body.name,
                username: req.body.username,
                password: Hash.encrypt(req.body.password)
            })
            
            return Responses(res, {
                status: 200,
                message: "Register success",
                data: auth
            })
        } catch (error) {
            return Responses(res, {
                status: 500,
                message: "Internal Server Error",
            })
        }
    }
    
    return {
        login,
        register
    }
})();

export default authControllers;