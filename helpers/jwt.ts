import { sign } from 'jsonwebtoken';
import { appConfig } from '../config/app';

export const JWT = (() => {
    function generate(id: string): string {
        return sign({id}, appConfig.secret, { algorithm: "HS256", expiresIn: '1h' })
    }

    return {
        generate
    }
})();