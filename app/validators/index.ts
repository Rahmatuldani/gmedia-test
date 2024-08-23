import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { Responses } from "../../helpers/response";

export function Validation(req: Request, res: Response) {
    const validationError = validationResult(req)
    if (!validationError.isEmpty()) {
        Responses(res, {
            status: 400,
            message: "Validation Error",
            error: validationError.array()[0].msg
        })
        return false;
    }
    return true;
}