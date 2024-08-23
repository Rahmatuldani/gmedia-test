import { Response } from "express";

interface Props {
    status: number;
    message: string;
    data?: object | string;
    error?: string;
}

export function Responses(res: Response, props: Props) {
    return res.status(props.status).json({
        message: props.message,
        data: props.data,
        error: props.error
    })
}