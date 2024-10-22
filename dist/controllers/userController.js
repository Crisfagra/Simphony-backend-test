"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../entities/user.entity");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const registerUser = async (req, res) => {
    const { nombre, email, password, rol } = req.body;
    const hashedPassword = await bcryptjs_1.default.hash(password, 10);
    const user = new user_entity_1.User();
    user.nombre = nombre;
    user.email = email;
    user.password = hashedPassword;
    user.rol = rol;
    const userRepo = (0, typeorm_1.getRepository)(user_entity_1.User);
    await userRepo.save(user);
    res.status(201).json({ message: 'User created' });
};
exports.registerUser = registerUser;
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    const userRepo = (0, typeorm_1.getRepository)(user_entity_1.User);
    const user = await userRepo.findOne({ where: { email } });
    if (!user || !(await bcryptjs_1.default.compare(password, user.password))) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jsonwebtoken_1.default.sign({ userId: user.id, rol: user.rol }, 'your_jwt_secret');
    res.json({ token });
};
exports.loginUser = loginUser;
//# sourceMappingURL=userController.js.map