import { Response } from "express";

export class CustomError extends Error {
    
    constructor(public readonly statusCode: number, message: string) {
        super(message);
        this.name = new.target.name; // Esto asegura que el nombre sea "CustomError"
        Error.captureStackTrace(this, this.constructor); // Captura bien el stack trace
    }


    static badRequest(message: string) {
        return new CustomError(400, message);
    }

    static unauthorized(message: string) {
        return new CustomError(401, message);
    }

    static forbidden(message: string) {
        return new CustomError(403, message);
    }

    static notFound(message: string) {
        return new CustomError(404, message);
    }

    static conflict(message: string) {
        return new CustomError(409, message);
    }
    
    static internalServerError(message: string) {
        return new CustomError(500, message);
    }

    static badGateway(message:string){
        return new CustomError(502, message)
    }

    static   handleError = (error: unknown, res : Response) => {
          
             if (error instanceof CustomError) {
                res.status(error.statusCode).json({ error: error.message });
                return
             }
    
             console.log(error);
             
             res.status(500).json({ error: "Internal server error" });
             
          }
    

}