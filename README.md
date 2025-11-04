# 🧠 BackEnd Platform Azkait

## 🚀 Tecnologías Utilizadas

- Lenguaje: TypeScript
- Framework: Express 
- Base de datos: PostgreSQL
- ORM: Prisma
- Autenticación: JWT
- Otros: Swagger, Postman, dotenv

## 🗂️ Estructura del Proyecto

```
/backend-root
├── .api/                          # Salida temporal de documentación generada (probablemente Swagger)
├── node_modules/                 # Dependencias instaladas por npm
├── prisma/                       # Configuración de Prisma ORM
│   ├── migrations/               # Migraciones de base de datos
│   └── schema.prisma             # Esquema de modelos y relaciones de base de datos
├── src/                          # Código fuente principal del backend
│   ├── config/                   # Configuraciones generales (DB, entorno)
│   ├── data \ postgres/          # Conexión y configuración específica para PostgreSQL
│   │   └── db.ts                 # Archivo para inicializar y exportar la instancia de DB
│   ├── domain/                   # Definiciones del dominio (modelos de negocio)
│   ├── infrastructure/           # Infraestructura base (acceso a datos)
│   │   ├── dataSources/          # Fuentes de datos (repositorios de acceso a la DB)
│   │   ├── interfaces/           # Interfaces para tipado y contratos
│   │   ├── mappers/              # Mapeadores para transformar entre entidades y DTOs
│   │   │   ├── candidates/       # Mapeadores específicos para candidatos
│   │   │   ├── candidatures/     # Mapeadores específicos para candidaturas
│   │   │   └── jobs/             # Mapeadores específicos para vacantes
│   │   └── repositories/         # Implementaciones de repositorios
│   ├── presentation/             # Lógica de presentación / rutas agrupadas por dominio
│   │   ├── auth/                 # Autenticación y autorización
│   │   ├── candidates/           # Endpoints y lógica de presentación de candidatos
│   │   ├── candidatures/         # Endpoints para candidaturas
│   │   ├── company/              # Endpoints de empresa
│   │   ├── department/           # Endpoints de departamentos
│   │   ├── jobs/                 # Vacantes disponibles
│   │   │   ├── controllers/      # Controladores REST relacionados a vacantes
│   │   │   └── routes/           # Definición de rutas para vacantes
│   │   ├── location/             # Endpoints para ubicaciones
│   │   ├── middlewares/          # Middlewares globales o de seguridad
│   │   ├── professional/         # Endpoints de perfiles profesionales
│   │   ├── questionReference/    # Endpoints para preguntas de seguridad
│   │   └── sector/               # Endpoints de sectores económicos
│   ├── services/                 # Lógica de negocio general
│   ├── swagger/                  # Configuración para la documentación Swagger
│   │   ├── docs.routes.ts        # Rutas documentadas para Swagger
│   │   └── swagger.ts            # Config principal de Swagger
│   ├── webhook/                  # Controladores y rutas para Webhooks externos
│   │   ├── controllers/          # Lógica para manejar eventos externos
│   │   └── routes/               # Definición de rutas webhook
│   │       └── router.ts         # Registro principal de rutas webhook
│   ├── services/                 # Carpeta duplicada, probablemente error (fusionarla con la otra)
│   │   ├── actions/              # Acciones o comandos del dominio
│   │   ├── api/                  # Clientes HTTP para APIs externas
│   │   │   ├── apiClientify.ts   # Cliente para la API de Clientify
│   │   │   ├── apiMailBoxLayer.ts# Cliente para verificación de emails
│   │   │   └── apiViterbit.ts    # Cliente para API de Viterbit (vacantes, candidatos)
│   │   └── utils/                # Funciones utilitarias comunes
│   └── app.ts                    # Archivo principal de inicialización del servidor
├── .env                          # Variables de entorno locales
├── .env.template                 # Plantilla base para .env
├── .gitignore                    # Archivos y carpetas ignoradas por Git
├── package.json                  # Scripts y dependencias del proyecto
├── package-lock.json             # Versión bloqueada de dependencias npm
├── README.md                     # Documentación del proyecto
└── tsconfig.json                 # Configuración del compilador TypeScript
```

## 📥 Clonación del Proyecto

```bash
git clone https://github.com/AZKAIT/BackEnd_PlatformAzkait.git
cd BackEnd_PlatformAzkait
```

### 🔧 Instalación de Dependencias

```bash
npm install
```

## ⚙️ Configuración del Entorno

- Crear archivo `.env` basado en `.env.template`
- Agregar variables necesarias como:
```
DATABASE_URL = "url"
API_KEY_VITERBIT = "api-key"
API_URL_VITERBIT = 'api-url-viterbit'
SECRET_JWT = "secret-jwt"
SECRET_KEY_WEBHOOK = "secret-key-webhook"

WEBSERVICE_URL = "webservice-url"
FRONTEND_URL = "frontend-url"

MAILBOXLAYER_KEY = "mailboxlayer-key"
MAILBOXLAYER_URL = "mailboxlayer-url"

CLIENTIFY_KEY = "clientify-key"
CLIENTIFY_URL = "clientify-url"

SENDGRID_API = "sendgrid-api-key"

SENDGRID_EMAIL = "sendgrid-email"
```
## ▶️ Iniciar el Proyecto en Local

```bash
npm run dev
```

## 📚 Pruebas y Documentación

El swagger puede visualizarse en 

```
/api/v1/docs/#/
```

