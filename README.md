# Documentacion prueba tecnica Api de gestión de usuarios y servicios

Proyecto desarrollado con NodeJs, ExpressJs y Typescript permite la gestion de usuarios y sericios, implementando buenas practicas y siguiendo los lineamientos proporcionados por la compañia.

# Funcionalidades

**Gestion de usuarios**
**Gestios de servicios**
**Documentacion de la API**

# Requisitos

- Node.js >= 14.x
- PostgreSQL >= 12.x
- NPM >= 6.x

# Intalacion

1. Clonacion
    ```bash
    git clone https://github.com/tu-usuario/tu-repositorio.git
    cd tu-repositorio

2. Instalar dependencias
    ```bash
    npm install

3. Configuracion variables de entorno
   ```bash
   Crea un archivo .env en la raíz del proyecto con el siguiente contenido:
    DB_HOST=localhost
    DB_PORT=5432
    DB_USERNAME=tu_usuario
    DB_PASSWORD=tu_contraseña
    DB_NAME=tu_base_de_datos
    JWT_SECRET=tu_secreto_jwt

4. Correr migraciones
   ```bash
   npm run migration:run
5. Correr seeds
   ```bash
   npm run seed
6. Iniciar el servidor
   ```bash
   npm run dev

# Funcionamiento

Realizar las peticiones a la API por medio de Postman o Curl a http://localhost:3000/ruta_a_testear

# Documentacion
Para acceder a la documentacion, se debe ir a [text](http://localhost:3000/api-docs)