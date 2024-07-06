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
exports.RepairService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const service_constants_1 = require("./service.constants");
const createNewService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const serviceData = {
        serviceName: data.serviceName,
        description: data.description,
        serviceImage: data.serviceImage,
        servicePrice: data.servicePrice,
        serviceStatus: data.serviceStatus,
    };
    const serviceExists = yield prisma_1.default.service.findFirst({
        where: {
            serviceName: serviceData === null || serviceData === void 0 ? void 0 : serviceData.serviceName,
        },
        select: {
            serviceName: true,
        },
    });
    if (serviceExists) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Service already exists');
    }
    const result = yield prisma_1.default.service.create({
        data: serviceData,
    });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Service creation failed');
    }
    return result;
});
const getAllServices = (filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, page, skip } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    const { searchTerm } = filters, filterData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            OR: service_constants_1.serviceSearchableFields.map((field) => ({
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
                if (service_constants_1.serviceRelationalFields.includes(key)) {
                    return {
                        [service_constants_1.serviceRelationalFieldsMapper[key]]: {
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
    const result = yield prisma_1.default.service.findMany({
        include: {
            reviewAndRatings: true,
            bookings: true,
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
    const total = yield prisma_1.default.service.count({
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
const getSingleService = (serviceId) => __awaiter(void 0, void 0, void 0, function* () {
    //
    const result = yield prisma_1.default.service.findUnique({
        where: {
            serviceId,
        },
        include: {
            reviewAndRatings: {
                include: {
                    profile: true,
                },
                orderBy: {
                    createdAt: 'desc',
                },
            },
            bookings: true,
        },
    });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Service Not Found !!!');
    }
    return result;
});
const updateService = (serviceId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExistService = yield prisma_1.default.service.findUnique({
        where: {
            serviceId,
        },
    });
    if (!isExistService) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Service Not Found !!!');
    }
    const updateServiceData = {
        serviceName: payload === null || payload === void 0 ? void 0 : payload.serviceName,
        description: payload === null || payload === void 0 ? void 0 : payload.description,
        serviceImage: payload === null || payload === void 0 ? void 0 : payload.serviceImage,
        servicePrice: payload === null || payload === void 0 ? void 0 : payload.servicePrice,
    };
    const result = yield prisma_1.default.service.update({
        where: {
            serviceId,
        },
        data: updateServiceData,
    });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Updating Service Failed');
    }
    return result;
});
const deleteService = (serviceId) => __awaiter(void 0, void 0, void 0, function* () {
    const isExistService = yield prisma_1.default.service.findUnique({
        where: {
            serviceId,
        },
    });
    if (!isExistService) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Service Not Found !!!');
    }
    const result = yield prisma_1.default.service.delete({
        where: {
            serviceId,
        },
    });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Deleting Service Failed');
    }
    return result;
});
exports.RepairService = {
    createNewService,
    getAllServices,
    getSingleService,
    updateService,
    deleteService,
};
