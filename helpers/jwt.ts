import { sign, verify } from 'jsonwebtoken';
import { appConfig } from '../config/app';

export const JWT = (() => {
    function generate(payload: object): string {
        return sign({payload}, appConfig.secret, { algorithm: "HS256", expiresIn: '1h' })
    }

    function check<T>(token: string): T | Error {
        try {
            return verify(token, appConfig.secret) as T;
        } catch (error) {
            return error as Error;
        }
    }
    return {
        generate,
        check
    }
})();