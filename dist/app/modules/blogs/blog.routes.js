"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogRoutes = void 0;
const client_1 = require("@prisma/client");
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const blog_controller_1 = require("./blog.controller");
const blog_validation_1 = require("./blog.validation");
const router = express_1.default.Router();
router.post('/create', (0, auth_1.default)(client_1.Role.customer), (0, validateRequest_1.default)(blog_validation_1.BlogValidation.createBlog), blog_controller_1.BlogController.createBlog);
router.get('/', blog_controller_1.BlogController.getAllBlogs);
router.get('/:blogId', blog_controller_1.BlogController.getBlogById);
router.patch('/:blogId', (0, auth_1.default)(client_1.Role.admin, client_1.Role.super_admin), (0, validateRequest_1.default)(blog_validation_1.BlogValidation.createBlog), blog_controller_1.BlogController.updateBlogById);
router.delete('/:blogId', (0, auth_1.default)(client_1.Role.admin, client_1.Role.super_admin), blog_controller_1.BlogController.deleteBlogById);
exports.BlogRoutes = router;
