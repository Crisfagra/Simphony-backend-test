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
exports.getUserProfile = exports.loginUser = exports.registerUser = void 0;
const data_source_1 = require("../data-source");
const user_entity_1 = require("../entities/user.entity");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, email, password, rol } = req.body;
    try {
        const userRepo = data_source_1.AppDataSource.getRepository(user_entity_1.User);
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
        const token = jsonwebtoken_1.default.sign({ userId: user.id, rol: user.rol }, process.env.JWT_SECRET || 'your_jwt_secret', { expiresIn: '1h' });
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
//# sourceMappingURL=userController.js.map