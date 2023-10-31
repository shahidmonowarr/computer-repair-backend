"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedbackRoutes = void 0;
const client_1 = require("@prisma/client");
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const feedback_controller_1 = require("./feedback.controller");
const feedback_validations_1 = require("./feedback.validations");
const router = express_1.default.Router();
router.get('/', feedback_controller_1.FeedbackController.getAllFeedbacks);
router.post('/create', (0, auth_1.default)(client_1.Role.customer), (0, validateRequest_1.default)(feedback_validations_1.FeedBackValidation.createFeedBack), feedback_controller_1.FeedbackController.createNewFeedback);
router.patch('/:feedbackId', (0, auth_1.default)(client_1.Role.customer, client_1.Role.technician, client_1.Role.admin, client_1.Role.super_admin), (0, validateRequest_1.default)(feedback_validations_1.FeedBackValidation.updateFeedBack), feedback_controller_1.FeedbackController.updateFeedback);
router.delete('/:feedbackId', (0, auth_1.default)(client_1.Role.customer, client_1.Role.technician, client_1.Role.admin, client_1.Role.super_admin), feedback_controller_1.FeedbackController.deleteFeedback);
exports.FeedbackRoutes = router;
