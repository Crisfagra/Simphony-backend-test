"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
const service_entitiy_1 = require("./entities/service.entitiy");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: 5432,
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'crisfagra',
    database: process.env.DB_NAME || 'simphonyDB',
    entities: [user_entity_1.User, service_entitiy_1.Service],
    migrations: ['src/database/migrations/*.ts'],
    synchronize: false,
    logging: true,
});
//# sourceMappingURL=data-source.js.map