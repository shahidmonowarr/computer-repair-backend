"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const client_1 = require("@prisma/client");
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const user_controller_1 = require("./user.controller");
const user_validation_1 = require("./user.validation");
const router = express_1.default.Router();
router.get('/my-profile', (0, auth_1.default)(client_1.Role.super_admin, client_1.Role.admin, client_1.Role.technician, client_1.Role.customer), user_controller_1.UserController.getMyProfile);
router.get('/:userId', (0, auth_1.default)(client_1.Role.super_admin, client_1.Role.admin), user_controller_1.UserController.getUserById);
router.get('/', (0, auth_1.default)(client_1.Role.super_admin, client_1.Role.admin), user_controller_1.UserController.getAllUsers);
// Update user profile info
router.patch('/update-profile/:profileId', (0, auth_1.default)(client_1.Role.super_admin, client_1.Role.admin), (0, validateRequest_1.default)(user_validation_1.UserValidation.updateUser), user_controller_1.UserController.updateProfileInfo);
// Update my user info
router.patch('/update-my-email-password', (0, auth_1.default)(client_1.Role.super_admin, client_1.Role.admin, client_1.Role.customer), (0, validateRequest_1.default)(user_validation_1.UserValidation.updateUser), user_controller_1.UserController.updateUserInfo);
// Update my profile info
router.patch('/update-my-profile', (0, auth_1.default)(client_1.Role.super_admin, client_1.Role.admin, client_1.Role.technician, client_1.Role.customer), (0, validateRequest_1.default)(user_validation_1.UserValidation.updateUser), user_controller_1.UserController.updateMyProfileInfo);
exports.UserRoutes = router;
