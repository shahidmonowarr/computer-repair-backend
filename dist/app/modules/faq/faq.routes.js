"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FaqRoutes = void 0;
const client_1 = require("@prisma/client");
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const faq_controller_1 = require("./faq.controller");
const faq_validation_1 = require("./faq.validation");
const router = express_1.default.Router();
router.post('/create', (0, auth_1.default)(client_1.Role.super_admin, client_1.Role.admin), (0, validateRequest_1.default)(faq_validation_1.FaqValidation.createFaq), faq_controller_1.FaqController.createNewFaq);
router.get('/', faq_controller_1.FaqController.getAllFaqs);
router.get('/:faqId', faq_controller_1.FaqController.getFaqById);
router.patch('/:faqId', (0, validateRequest_1.default)(faq_validation_1.FaqValidation.updateFaq), (0, auth_1.default)(client_1.Role.super_admin, client_1.Role.admin), faq_controller_1.FaqController.updateFaq);
router.delete('/:faqId', (0, auth_1.default)(client_1.Role.super_admin, client_1.Role.admin), faq_controller_1.FaqController.deleteFaq);
exports.FaqRoutes = router;
