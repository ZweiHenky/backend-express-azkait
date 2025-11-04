import { compareSync, genSaltSync, hashSync } from 'bcryptjs';


export const bcryptAdapter = {
    
    async hash(value: string): Promise<string> {
        const salt = await genSaltSync(10);
        return hashSync(value, salt);
    },

    async compare(value: string, hash: string): Promise<boolean> {
        return compareSync(value, hash);
    }
}
