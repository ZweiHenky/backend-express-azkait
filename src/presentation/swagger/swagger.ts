import { url } from 'inspector';
import swaggerJSDoc from 'swagger-jsdoc';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Docs Platform Azkait',
      version: '1.0.0',
      description: 'Documentación para la API de la plataforma Azkait',
    },
    servers: [
      {
        // url: 'https://demo-azka-production.up.railway.app/', 
        url: 'http://localhost:3000/', // URL de tu servidor local
      },
    ],
  },
  apis: ['./src/presentation/auth/routes/*.ts',
    './src/presentation/jobs/routes/*.ts',
    './src/presentation/candidates/routes/*.ts',
    './src/presentation/candidatures/routes/*.ts',
    './src/presentation/company/routes/*.ts',
    './src/presentation/webhook/routes/*.ts',
    './src/presentation/sector/routes/*.ts',
    './src/presentation/questionReference/routes/*.ts',
    './src/presentation/professional/routes/*.ts',

  ], // Asegúrate de incluir rutas con los JSDoc
};

export const swaggerSpec = swaggerJSDoc(swaggerOptions);


