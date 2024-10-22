import express from 'express';
import 'reflect-metadata'; 
import { AppDataSource } from './data-source';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';
import { errorHandler } from './middlewares/errorHandler';

import userRoutes from './routes/userRoutes'; 

const app = express();

app.use(express.json());

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Servicios',
      version: '1.0.0',
      description: 'Documentación de API',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./src/routes/*.ts'],
};

const swaggerDocument = YAML.load(path.join(__dirname, './docs/swagger.yaml'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/users', userRoutes);

AppDataSource.initialize()
  .then(() => {
    
    app.use(errorHandler)
    app.listen(3000, () => {
      console.log('Server running on http://localhost:3000');
    });
  })
  .catch((error) => console.log('Database connection error: ', error));

export default app;
