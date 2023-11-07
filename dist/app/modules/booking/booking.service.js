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
exports.bookingService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const booking_constants_1 = require("./booking.constants");
const createNewBooking = (profileId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { serviceId, bookingDate, slotId } = payload;
    // Check if the service exists
    const existingService = yield prisma_1.default.service.findUnique({
        where: {
            serviceId,
        },
    });
    if (!existingService) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Service not found!');
    }
    // Check if the slot exists
    const existingSlot = yield prisma_1.default.timeSlot.findUnique({
        where: {
            slotId: payload.slotId,
        },
    });
    if (!existingSlot) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Slot not found!');
    }
    const takenSlot = yield prisma_1.default.booking.findFirst({
        where: {
            slotId,
            bookingDate,
            serviceId,
            OR: [{ bookingStatus: 'pending' }, { bookingStatus: 'confirmed' }],
        },
    });
    if (takenSlot) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Slot already booked');
    }
    const result = yield prisma_1.default.booking.create({
        data: {
            bookingDate,
            slotId,
            serviceId,
            profileId,
        },
        select: {
            bookingDate: true,
            createdAt: true,
        },
    });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Something went wrong while creating booking');
    }
    return result;
});
const getAllBookings = (filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, page, skip } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    const { searchTerm, firstName, bookingStatus } = filters, filterData = __rest(filters, ["searchTerm", "firstName", "bookingStatus"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            OR: booking_constants_1.bookingSearchableFields.map((field) => ({
                [field]: {
                    contains: searchTerm,
                    mode: 'insensitive',
                },
            })),
        });
    }
    if (firstName) {
        andConditions.push({
            profile: {
                firstName: {
                    contains: firstName,
                    mode: 'insensitive',
                },
            },
        });
    }
    if (bookingStatus) {
        andConditions.push({
            bookingStatus: {
                equals: bookingStatus,
            },
        });
    }
    if (Object.keys(filterData).length > 0) {
        andConditions.push({
            AND: Object.keys(filterData).map(key => {
                if (booking_constants_1.bookingFields.includes(key)) {
                    return {
                        [booking_constants_1.bookingRelationalFieldsMapper[key]]: {
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
    // @ts-ignore
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    const result = yield prisma_1.default.booking.findMany({
        include: {
            service: {
                select: {
                    serviceName: true,
                },
            },
            slot: {
                select: {
                    slotTime: true,
                },
            },
            profile: {
                select: {
                    firstName: true,
                    lastName: true,
                    phoneNumber: true,
                },
            },
        },
        where: whereConditions,
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder
            ? { [options.sortBy]: options.sortOrder }
            : {
                createdAt: 'desc',
            },
    });
    const total = yield prisma_1.default.booking.count({
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
const getMyBooking = (profileId, filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, page, skip } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    const { searchTerm, firstName, bookingStatus } = filters, filterData = __rest(filters, ["searchTerm", "firstName", "bookingStatus"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            OR: booking_constants_1.bookingSearchableFields.map((field) => ({
                [field]: {
                    contains: searchTerm,
                    mode: 'insensitive',
                },
            })),
        });
    }
    if (firstName) {
        andConditions.push({
            profile: {
                firstName: {
                    contains: firstName,
                    mode: 'insensitive',
                },
            },
        });
    }
    if (bookingStatus) {
        andConditions.push({
            bookingStatus: {
                equals: bookingStatus,
            },
        });
    }
    andConditions.push({
        profileId,
    });
    if (Object.keys(filterData).length > 0) {
        andConditions.push({
            AND: Object.keys(filterData).map(key => {
                if (booking_constants_1.bookingFields.includes(key)) {
                    return {
                        [booking_constants_1.bookingRelationalFieldsMapper[key]]: {
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
    // @ts-ignore
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    const result = yield prisma_1.default.booking.findMany({
        include: {
            service: {
                select: {
                    serviceName: true,
                },
            },
            slot: {
                select: {
                    slotTime: true,
                },
            },
            profile: {
                select: {
                    firstName: true,
                    lastName: true,
                    phoneNumber: true,
                },
            },
        },
        where: whereConditions,
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder
            ? { [options.sortBy]: options.sortOrder }
            : {
                createdAt: 'desc',
            },
    });
    const total = yield prisma_1.default.booking.count({
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
const getSingleBooking = (bookingId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.booking.findUnique({
        where: {
            bookingId,
        },
    });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Booking not found!');
    }
    return result;
});
const updateBooking = (bookingId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield prisma_1.default.booking.findUnique({
        where: {
            bookingId,
        },
    });
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Appointment Booking Not Found !!!');
    }
    const updateData = {
        serviceId: payload === null || payload === void 0 ? void 0 : payload.serviceId,
        appointmentDate: payload === null || payload === void 0 ? void 0 : payload.bookingDate,
        slotId: payload === null || payload === void 0 ? void 0 : payload.slotId,
        bookingStatus: payload === null || payload === void 0 ? void 0 : payload.bookingStatus,
    };
    const isSlotTaken = yield prisma_1.default.booking.findFirst({
        where: {
            slotId: payload === null || payload === void 0 ? void 0 : payload.slotId,
            bookingDate: payload === null || payload === void 0 ? void 0 : payload.bookingDate,
            serviceId: payload === null || payload === void 0 ? void 0 : payload.serviceId,
            OR: [{ bookingStatus: 'pending' }, { bookingStatus: 'confirmed' }],
        },
    });
    if (isSlotTaken) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Slot already booked');
    }
    const result = yield prisma_1.default.booking.update({
        where: {
            bookingId,
        },
        data: updateData,
    });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Updating Failed !!!');
    }
    return result;
});
const deleteBooking = (bookingId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        const isExist = yield transactionClient.booking.findUnique({
            where: {
                bookingId,
            },
        });
        if (!isExist) {
            throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Appointment Booking Not Found');
        }
        const BookingDeleted = yield transactionClient.booking.delete({
            where: {
                bookingId,
            },
        });
        return BookingDeleted;
    }));
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Appointment Booking Not Deleted');
    }
    return result;
});
exports.bookingService = {
    createNewBooking,
    getAllBookings,
    getSingleBooking,
    updateBooking,
    deleteBooking,
    getMyBooking,
};
