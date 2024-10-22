"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticate = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token)
        return res.status(401).json({ message: 'No token provided' });
    jsonwebtoken_1.default.verify(token, 'your_jwt_secret', (err, decoded) => {
        if (err)
            return res.status(403).json({ message: 'Invalid token' });
        next();
    });
};
exports.authenticate = authenticate;
//# sourceMappingURL=auth.js.map