import { log } from "console";
import { createHmac, timingSafeEqual } from "crypto";
import { NextFunction, Request, Response } from "express";

const crypto = require('crypto'); 

export class AuthenticationWebhookViterbitMiddleware {

    static validateSignature = (req: Request, res: Response, next: NextFunction) => {
        const secretKey = process.env.SECRET_KEY_WEBHOOK; 
        const signature = req.headers['x-viterbit-signature'] as string;
        
        console.log(req.body.toString());
        

        if (!secretKey || !signature) {
            console.error('Falta la clave secreta o la firma en la solicitud');
            return 
        }

        if (AuthenticationWebhookViterbitMiddleware.verify(secretKey, signature, req.body)) { 
            next()
        } else { 
            console.log('Firma inválida'); 
        }
    }

    static verify = (secretKey: string, signature:string, payload:string) => { 

        const hmac = createHmac('sha256', secretKey).update(payload).digest('hex');
         
        return timingSafeEqual(Buffer.from(hmac), Buffer.from(signature));
    }

}