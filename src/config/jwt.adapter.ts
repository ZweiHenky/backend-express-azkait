import { log } from 'console';
import jwt from 'jsonwebtoken';

const SEED_JWT: string = process.env.SECRET_JWT || 'default' 
const SEED_JWT_REFRESH: string = process.env.SECRET_JWT_REFRESH || 'default_refresh';

export class JwtAdapter {

    static async generateToken( payload: any, expiresIn: any = '1h' ) {

        return new Promise((resolve) => {
            jwt.sign(payload, SEED_JWT, { expiresIn: expiresIn }, (err, token) => {

                if (err) return null

                resolve(token);

            });
        });
    }

    static async verifyToken(token: string) {

        return new Promise((resolve) => {
            try {
                jwt.verify(token, SEED_JWT, (err, decoded) => {
                    if (err) {
                        console.error(err); // Puedes quitar esto si no quieres mostrar el error
                        return resolve(null); // Devolver null si el token es inválido
                    }

                    resolve(decoded); // Token válido
                });
            } catch (error) {
                console.error(error); // Puedes quitar esto también si no lo necesitas
                resolve(null); // En caso de error sincrónico, también devolver null
            }
        });
    }

    static async generateRefreshToken(payload: any, expiresIn: any = '30d') {
        return new Promise((resolve) => {
            jwt.sign(payload, SEED_JWT_REFRESH, { expiresIn: expiresIn }, (err, token) => {

                if (err) return null

                resolve(token);
            });
        });
    }

    static async verifyRefreshToken(token: string) {

        return new Promise((resolve, reject) => {
            try {
                jwt.verify(token, SEED_JWT_REFRESH, (err, decoded) => {
                    if (err) {
                        console.error(err); // Puedes quitar esto si no quieres mostrar el error
                        return null; // Devolver null si el token es inválido
                    }

                    resolve(decoded); // Token válido
                });
            } catch (error) {
                console.error(error); // Puedes quitar esto también si no lo necesitas
                return null; // En caso de error sincrónico, también devolver null
            }
        });
    }
}
