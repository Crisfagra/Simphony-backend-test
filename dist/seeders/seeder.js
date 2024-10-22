"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedDatabase = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../entities/user.entity");
const service_entitiy_1 = require("../entities/service.entitiy");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const seedDatabase = async () => {
    const userRepo = (0, typeorm_1.getRepository)(user_entity_1.User);
    const serviceRepo = (0, typeorm_1.getRepository)(service_entitiy_1.Service);
    const hashedPassword = await bcryptjs_1.default.hash('password123', 10);
    const users = [
        { nombre: 'Admin', email: 'admin@example.com', password: hashedPassword, rol: 'admin' },
        { nombre: 'User', email: 'user@example.com', password: hashedPassword, rol: 'user' }
    ];
    const services = [
        { nombre: 'Servicio 1', descripcion: 'Descripción 1', costo: 100, categoria: 'Tech' },
        { nombre: 'Servicio 2', descripcion: 'Descripción 2', costo: 200, categoria: 'Health' }
    ];
    await userRepo.save(users);
    await serviceRepo.save(services);
};
exports.seedDatabase = seedDatabase;
//# sourceMappingURL=seeder.js.map