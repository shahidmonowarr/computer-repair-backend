import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { BlogRoutes } from '../modules/blogs/blog.routes';
import { bookingRoutes } from '../modules/booking/booking.routes';
import { FaqRoutes } from '../modules/faq/faq.routes';
import { FeedbackRoutes } from '../modules/feedbacks/feedback.routes';
import { reviewAndRatingRoutes } from '../modules/reviewAndRatings/reviewAndRating.routes';
import { RepairServiceRoutes } from '../modules/services/service.routes';
import { SlotRoutes } from '../modules/slots/slots.routes';
import { UserRoutes } from '../modules/users/user.routes';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/services',
    route: RepairServiceRoutes,
  },
  {
    path: '/slots',
    route: SlotRoutes,
  },
  {
    path: '/bookings',
    route: bookingRoutes,
  },
  {
    path: '/blogs',
    route: BlogRoutes,
  },
  {
    path: '/faqs',
    route: FaqRoutes,
  },
  {
    path: '/feedbacks',
    route: FeedbackRoutes,
  },
  {
    path: '/reviewsAndRatings',
    route: reviewAndRatingRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
