"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingRoutes = void 0;
const client_1 = require("@prisma/client");
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const booking_controller_1 = require("./booking.controller");
const booking_validation_1 = require("./booking.validation");
const router = express_1.default.Router();
router.get('/', (0, auth_1.default)(client_1.Role.super_admin, client_1.Role.admin, client_1.Role.customer), booking_controller_1.bookingController.getAllBookings);
router.get('/my-booking', (0, auth_1.default)(client_1.Role.super_admin, client_1.Role.admin, client_1.Role.customer), booking_controller_1.bookingController.getMyBooking);
router.post('/create', (0, auth_1.default)(client_1.Role.customer), (0, validateRequest_1.default)(booking_validation_1.BookingValidation.createBooking), booking_controller_1.bookingController.createNewBooking);
router.patch('/:bookingId', (0, auth_1.default)(client_1.Role.super_admin, client_1.Role.admin, client_1.Role.customer), booking_controller_1.bookingController.updateBooking);
router.delete('/:bookingId', (0, auth_1.default)(client_1.Role.super_admin, client_1.Role.admin, client_1.Role.customer), booking_controller_1.bookingController.deleteBooking);
exports.bookingRoutes = router;
