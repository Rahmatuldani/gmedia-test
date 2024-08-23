import { createHash } from "crypto";

export const Hash = (() => {
    function encrypt(text: string): string {
        const hash = createHash('sha256');
        hash.update(text);
        return hash.digest('hex');
    }

    function compare(plainText: string, hashText: string): boolean {
        const hashedText = encrypt(plainText);
        return hashedText === hashText;
    }

    return {
        encrypt,
        compare
    }
})()