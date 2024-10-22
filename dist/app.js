"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("reflect-metadata");
const data_source_1 = require("./data-source");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const errorHandler_1 = require("./middlewares/errorHandler");
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
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
const swaggerDocs = (0, swagger_jsdoc_1.default)(swaggerOptions);
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocs));
app.use('/users', userRoutes_1.default);
data_source_1.AppDataSource.initialize()
    .then(() => {
    app.use(errorHandler_1.errorHandler);
    app.listen(3000, () => {
        console.log('Server running on http://localhost:3000');
    });
})
    .catch((error) => console.log('Database connection error: ', error));
exports.default = app;
//# sourceMappingURL=app.js.map