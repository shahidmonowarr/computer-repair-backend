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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedbackService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const feedback_constants_1 = require("./feedback.constants");
const createNewFeedback = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const createdNewFeedback = yield prisma_1.default.feedBackForm.create({
        data: {
            feedbackSubject: payload.feedbackSubject,
            feedbackDescription: payload.feedbackDescription,
        },
        select: {
            feedbackId: true,
            feedbackSubject: true,
            feedbackDescription: true,
            createdAt: true,
        },
    });
    if (!createdNewFeedback) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Something went wrong while creating feedback');
    }
    return createdNewFeedback;
});
const getAllFeedbacks = (filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, page, skip } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    const { searchTerm } = filters, filterData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            OR: feedback_constants_1.FeedbackSearchableFields.map((field) => ({
                [field]: {
                    contains: searchTerm,
                    mode: 'insensitive',
                },
            })),
        });
    }
    if (Object.keys(filterData).length > 0) {
        andConditions.push({
            AND: Object.keys(filterData).map(key => {
                if (feedback_constants_1.feedbackRelationalFields.includes(key)) {
                    return {
                        [feedback_constants_1.feedbackRelationalFieldsMapper[key]]: {
                            id: filterData[key],
                        },
                    };
                }
                else {
                    return {
                        [key]: {
                            equals: filterData[key],
                        },
                    };
                }
            }),
        });
    }
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    const result = yield prisma_1.default.feedBackForm.findMany({
        where: whereConditions,
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder
            ? { [options.sortBy]: options.sortOrder }
            : {
                createdAt: 'desc',
            },
    });
    const total = yield prisma_1.default.feedBackForm.count({
        where: whereConditions,
    });
    const totalPage = Math.ceil(total / limit);
    return {
        meta: {
            page,
            limit,
            total,
            totalPage,
        },
        data: result,
    };
});
const updateFeedback = (feedbackId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExistFeedBack = yield prisma_1.default.feedBackForm.findUnique({
        where: {
            feedbackId,
        },
    });
    if (!isExistFeedBack) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'FeedBack Not Found !!!');
    }
    const updateFeedback = {
        feedbackComment: payload === null || payload === void 0 ? void 0 : payload.feedbackComment,
        serviceId: payload === null || payload === void 0 ? void 0 : payload.serviceId,
    };
    const result = yield prisma_1.default.feedBackForm.update({
        where: {
            feedbackId,
        },
        data: updateFeedback,
    });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'FeedBack Updating Failed !!!');
    }
    return result;
});
const deleteFeedback = (feedbackId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        const isExistFeedBack = yield transactionClient.feedBackForm.findUnique({
            where: {
                feedbackId,
            },
        });
        if (!isExistFeedBack) {
            throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Feed Back Not Found');
        }
        const feedBackDeleted = yield transactionClient.feedBackForm.delete({
            where: {
                feedbackId,
            },
        });
        return feedBackDeleted;
    }));
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Feed Back Not Deleted');
    }
    return result;
});
exports.FeedbackService = {
    createNewFeedback,
    getAllFeedbacks,
    updateFeedback,
    deleteFeedback,
};
