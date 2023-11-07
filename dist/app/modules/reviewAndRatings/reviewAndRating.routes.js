"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewAndRatingRoutes = void 0;
const client_1 = require("@prisma/client");
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const reviewAndRating_controller_1 = require("./reviewAndRating.controller");
const reviewAndRating_validations_1 = require("./reviewAndRating.validations");
const router = express_1.default.Router();
router.post('/create', (0, auth_1.default)(client_1.Role.customer), (0, validateRequest_1.default)(reviewAndRating_validations_1.ReviewAndRatingValidation.createReviewAndRating), reviewAndRating_controller_1.reviewAndRatingController.createNewRatingAndReview);
router.get('/my-reviews', (0, auth_1.default)(client_1.Role.customer), reviewAndRating_controller_1.reviewAndRatingController.getMyReviewsAndRatings);
router.get('/', (0, auth_1.default)(client_1.Role.super_admin, client_1.Role.admin, client_1.Role.customer), reviewAndRating_controller_1.reviewAndRatingController.getAllReviewAndRatings);
router.patch('/:reviewId', (0, auth_1.default)(client_1.Role.customer, client_1.Role.admin, client_1.Role.super_admin), reviewAndRating_controller_1.reviewAndRatingController.updateReview);
router.delete('/:reviewId', (0, auth_1.default)(client_1.Role.customer, client_1.Role.admin, client_1.Role.super_admin), reviewAndRating_controller_1.reviewAndRatingController.singleReviewDelete);
exports.reviewAndRatingRoutes = router;
