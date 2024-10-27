import express from 'express'
import 'reflect-metadata'
import { AppDataSource } from './data-source'
import swaggerUi from 'swagger-ui-express'
import YAML from 'yamljs'
import path from 'path'
import { errorHandler } from './middlewares/errorHandler'

import userRoutes from './routes/userRoutes'
import serviceRoutes from './routes/serviceRoutes'

const app = express()

app.use(express.json())

const swaggerDocument = YAML.load(path.join(__dirname, './docs/swagger.yaml'))
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.use('/users', userRoutes)
app.use('/services', serviceRoutes)

AppDataSource.initialize()
  .then(() => {
    app.use(errorHandler)
    app.listen(3000, () => {
      console.log('Server running on http://localhost:3000')
    })
  })
  .catch((error) => console.log('Database connection error: ', error))

export default app
