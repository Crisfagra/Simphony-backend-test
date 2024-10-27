"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const auth_1 = require("../middlewares/auth");
const validate_1 = require("../middlewares/validate");
const userDto_1 = require("../dto/userDto");
const userServiceDto_1 = require("../dto/userServiceDto");
const router = (0, express_1.Router)();
router.post('/register', (0, validate_1.validateDto)(userDto_1.CreateUserDto), userController_1.registerUser);
router.post('/login', userController_1.loginUser);
router.get('/profile', auth_1.authenticate, userController_1.getUserProfile);
router.get('/:id/services', auth_1.authenticate, userController_1.getUserServices);
router.post('/:id/services', auth_1.authenticate, (0, validate_1.validateDto)(userServiceDto_1.AddServicesToUserDto), userController_1.associateServicesToUser);
exports.default = router;
//# sourceMappingURL=userRoutes.js.map