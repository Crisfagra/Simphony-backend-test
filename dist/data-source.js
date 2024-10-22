"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: 5432,
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'crisfagra',
    database: process.env.DB_NAME || 'simphonyDB',
    entities: ['src/entities/*.entity.ts'],
    migrations: ['src/migrations/*.ts'],
    synchronize: true,
    logging: true,
});
//# sourceMappingURL=data-source.js.map