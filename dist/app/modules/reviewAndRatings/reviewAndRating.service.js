"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewAndRatingService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const createNewRatingAndReview = (profileId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    //
    const isExisting = yield prisma_1.default.service.findUnique({
        where: {
            serviceId: payload.serviceId,
        },
    });
    if (!isExisting) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Service not found');
    }
    const createdNewRatingAndReview = yield prisma_1.default.reviewAndRatings.create({
        data: {
            reviewComment: payload.reviewComment,
            reviewRating: payload.reviewRating,
            serviceId: payload.serviceId,
            profileId,
        },
        select: {
            reviewComment: true,
            reviewRating: true,
            createdAt: true,
        },
    });
    if (!createdNewRatingAndReview) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Review and rating failed to add');
    }
    return createdNewRatingAndReview;
});
const getAllReviewAndRatings = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.reviewAndRatings.findMany({
        select: {
            reviewComment: true,
            reviewRating: true,
            createdAt: true,
            profile: {
                select: {
                    firstName: true,
                    lastName: true,
                    profileId: true,
                    profileImage: true,
                },
            },
            service: {
                select: {
                    serviceName: true,
                    serviceId: true,
                },
            },
        },
    });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Review Not Found');
    }
    return result;
});
const getMyReviewsAndRatings = (profileId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.reviewAndRatings.findMany({
        where: {
            profileId,
        },
        orderBy: {
            createdAt: 'desc',
        },
        select: {
            reviewComment: true,
            reviewRating: true,
            createdAt: true,
            reviewId: true,
            profile: {
                select: {
                    firstName: true,
                    lastName: true,
                    profileId: true,
                    profileImage: true,
                },
            },
            service: {
                select: {
                    serviceName: true,
                    serviceId: true,
                },
            },
        },
    });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Review Not Found');
    }
    return result;
});
const updateRatingAndReview = (reviewId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExistReview = yield prisma_1.default.reviewAndRatings.findUnique({
        where: {
            reviewId,
        },
    });
    if (!isExistReview) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Review Not Found !!!');
    }
    const updateReview = {
        reviewComment: payload === null || payload === void 0 ? void 0 : payload.reviewComment,
        reviewRating: payload === null || payload === void 0 ? void 0 : payload.reviewRating,
    };
    const result = yield prisma_1.default.reviewAndRatings.update({
        where: {
            reviewId,
        },
        data: updateReview,
    });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Review sUpdating Failed !!!');
    }
    return result;
});
const DeleteRatingAndReview = (reviewId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        const isExistFeedBack = yield transactionClient.reviewAndRatings.findUnique({
            where: {
                reviewId,
            },
        });
        if (!isExistFeedBack) {
            throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Review Not Found');
        }
        const feedBackDeleted = yield transactionClient.reviewAndRatings.delete({
            where: {
                reviewId,
            },
        });
        return feedBackDeleted;
    }));
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Review Not Deleted');
    }
    return result;
});
exports.reviewAndRatingService = {
    createNewRatingAndReview,
    updateRatingAndReview,
    DeleteRatingAndReview,
    getAllReviewAndRatings,
    getMyReviewsAndRatings,
};
