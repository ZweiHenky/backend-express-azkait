// middlewares/validate.ts
import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

export const validate = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      res.status(400).json({
        errors: result.error.flatten(),
      });
      return; // ¡Importante! no retornes el `res.status` directamente
    }

    req.body = result.data;
    next();
  };
};

