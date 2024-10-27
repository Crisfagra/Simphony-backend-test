"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("reflect-metadata");
const data_source_1 = require("./data-source");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const yamljs_1 = __importDefault(require("yamljs"));
const path_1 = __importDefault(require("path"));
const errorHandler_1 = require("./middlewares/errorHandler");
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const serviceRoutes_1 = __importDefault(require("./routes/serviceRoutes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const swaggerDocument = yamljs_1.default.load(path_1.default.join(__dirname, './docs/swagger.yaml'));
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
app.use('/users', userRoutes_1.default);
app.use('/services', serviceRoutes_1.default);
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