"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserServices = exports.associateServicesToUser = exports.getUserProfile = exports.loginUser = exports.registerUser = void 0;
const data_source_1 = require("../data-source");
const user_entity_1 = require("../entities/user.entity");
const service_entitiy_1 = require("../entities/service.entitiy");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const typeorm_1 = require("typeorm");
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, email, password, rol } = req.body;
    try {
        const userRepo = data_source_1.AppDataSource.getRepository(user_entity_1.User);
        const user = yield userRepo.findOne({ where: { email: email } });
        if (user) {
            return res.status(401).json({ message: 'Email already register for another user' });
        }
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const newUser = userRepo.create({ nombre, email, password: hashedPassword, rol });
        yield userRepo.save(newUser);
        res.status(201).json({ message: 'User registered successfully' });
    }
    catch (error) {
        res.status(400).json({ message: 'Error registering user', error: error.message });
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const userRepo = data_source_1.AppDataSource.getRepository(user_entity_1.User);
        const user = yield userRepo.findOne({ where: { email } });
        if (!user || !(yield bcryptjs_1.default.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = jsonwebtoken_1.default.sign({ userId: user.id, rol: user.rol }, process.env.JWT_SECRET || 'jwt_secret', {
            expiresIn: '1h',
        });
        res.json({ token });
    }
    catch (error) {
        res.status(400).json({ message: 'Error during login', error: error.message });
    }
});
exports.loginUser = loginUser;
const getUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user && typeof req.user === 'object' ? req.user.userId : null;
    if (!userId) {
        return res.status(400).json({ message: 'Invalid user' });
    }
    try {
        const userRepo = data_source_1.AppDataSource.getRepository(user_entity_1.User);
        const user = yield userRepo.findOne({ where: { id: userId } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ user });
    }
    catch (error) {
        res.status(400).json({ message: 'Error fetching user profile', error: error.message });
    }
});
exports.getUserProfile = getUserProfile;
const associateServicesToUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { serviceIds } = req.body;
    const userId = req.params.id;
    try {
        const userRepo = data_source_1.AppDataSource.getRepository(user_entity_1.User);
        const serviceRepo = data_source_1.AppDataSource.getRepository(service_entitiy_1.Service);
        const user = yield userRepo.findOne({ where: { id: Number(userId) }, relations: ['services'] });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const services = yield serviceRepo.findBy({ id: (0, typeorm_1.In)(serviceIds) });
        if (services.length === 0) {
            return res.status(404).json({ message: 'No valid services found' });
        }
        user.services = [...user.services, ...services];
        yield userRepo.save(user);
        res.status(200).json({ message: 'Services successfully associated to user', services: user.services });
    }
    catch (error) {
        res.status(400).json({ message: 'Error associating services to user', error: error.message });
    }
});
exports.associateServicesToUser = associateServicesToUser;
const getUserServices = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    try {
        const userRepo = data_source_1.AppDataSource.getRepository(user_entity_1.User);
        const user = yield userRepo.findOne({ where: { id: Number(userId) }, relations: ['services'] });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const userInfo = {
            user: {
                id: user.id,
                nombre: user.nombre,
                email: user.email,
                rol: user.rol,
            },
            services: user.services,
        };
        res.status(200).json(userInfo);
    }
    catch (error) {
        res.status(400).json({ message: 'Error fetching user services', error: error.message });
    }
});
exports.getUserServices = getUserServices;
//# sourceMappingURL=userController.js.map