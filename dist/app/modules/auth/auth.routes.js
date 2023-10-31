"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const auth_controller_1 = require("./auth.controller");
const auth_validations_1 = require("./auth.validations");
const router = express_1.default.Router();
router.post('/create-user', (0, validateRequest_1.default)(auth_validations_1.AuthValidations.createUser), auth_controller_1.AuthController.createNewUser);
router.post('/login', (0, validateRequest_1.default)(auth_validations_1.AuthValidations.loginUser), auth_controller_1.AuthController.userLogin);
router.post('/refresh-token', auth_controller_1.AuthController.refreshToken);
exports.AuthRoutes = router;
