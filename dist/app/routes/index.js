"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_routes_1 = require("../modules/auth/auth.routes");
const blog_routes_1 = require("../modules/blogs/blog.routes");
const booking_routes_1 = require("../modules/booking/booking.routes");
const faq_routes_1 = require("../modules/faq/faq.routes");
const feedback_routes_1 = require("../modules/feedbacks/feedback.routes");
const reviewAndRating_routes_1 = require("../modules/reviewAndRatings/reviewAndRating.routes");
const service_routes_1 = require("../modules/services/service.routes");
const slots_routes_1 = require("../modules/slots/slots.routes");
const user_routes_1 = require("../modules/users/user.routes");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/auth',
        route: auth_routes_1.AuthRoutes,
    },
    {
        path: '/users',
        route: user_routes_1.UserRoutes,
    },
    {
        path: '/services',
        route: service_routes_1.RepairServiceRoutes,
    },
    {
        path: '/slots',
        route: slots_routes_1.SlotRoutes,
    },
    {
        path: '/bookings',
        route: booking_routes_1.bookingRoutes,
    },
    {
        path: '/blogs',
        route: blog_routes_1.BlogRoutes,
    },
    {
        path: '/faqs',
        route: faq_routes_1.FaqRoutes,
    },
    {
        path: '/feedbacks',
        route: feedback_routes_1.FeedbackRoutes,
    },
    {
        path: '/reviewsAndRatings',
        route: reviewAndRating_routes_1.reviewAndRatingRoutes,
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
