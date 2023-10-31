"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepairServiceRoutes = void 0;
const client_1 = require("@prisma/client");
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const service_controller_1 = require("./service.controller");
const router = express_1.default.Router();
router.post('/create', (0, auth_1.default)(client_1.Role.admin, client_1.Role.super_admin), service_controller_1.RepairServiceController.createNewService);
router.get('/:serviceId', service_controller_1.RepairServiceController.getSingleService);
router.get('/', service_controller_1.RepairServiceController.getAllServices);
router.patch('/:serviceId', (0, auth_1.default)(client_1.Role.admin, client_1.Role.super_admin), service_controller_1.RepairServiceController.updateService);
router.delete('/:serviceId', (0, auth_1.default)(client_1.Role.admin, client_1.Role.super_admin), service_controller_1.RepairServiceController.deleteService);
exports.RepairServiceRoutes = router;
