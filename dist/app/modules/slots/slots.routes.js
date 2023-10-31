"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlotRoutes = void 0;
const client_1 = require("@prisma/client");
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const slots_controller_1 = require("./slots.controller");
const router = express_1.default.Router();
router.post('/create', (0, auth_1.default)(client_1.Role.customer, client_1.Role.admin, client_1.Role.super_admin), slots_controller_1.SlotController.createNewSlot);
router.get('/:slotId', slots_controller_1.SlotController.getSingleSlot);
router.get('/', slots_controller_1.SlotController.getAllSlots);
router.patch('/:slotId', (0, auth_1.default)(client_1.Role.admin, client_1.Role.super_admin), slots_controller_1.SlotController.updateSlot);
router.delete('/:slotId', (0, auth_1.default)(client_1.Role.admin, client_1.Role.super_admin), slots_controller_1.SlotController.deleteSlot);
exports.SlotRoutes = router;
