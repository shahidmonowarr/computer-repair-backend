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
exports.SlotService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const createSlot = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    //
    const existingSlot = yield prisma_1.default.timeSlot.findFirst({
        where: {
            slotTime: payload.slotTime,
        },
    });
    if (existingSlot) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Slot already exists');
    }
    const createdNewSlot = yield prisma_1.default.timeSlot.create({
        data: {
            slotTime: payload.slotTime,
        },
        select: {
            slotId: true,
            slotTime: true,
            createdAt: true,
        },
    });
    if (!createdNewSlot) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Slot not created');
    }
    return createdNewSlot;
});
const getAllSlots = () => __awaiter(void 0, void 0, void 0, function* () {
    const slots = yield prisma_1.default.timeSlot.findMany();
    return slots;
});
const getSingleSlot = (slotId) => __awaiter(void 0, void 0, void 0, function* () {
    const slot = yield prisma_1.default.timeSlot.findFirst({
        where: {
            slotId,
        },
    });
    return slot;
});
const updateSlot = (slotId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExistSlot = yield prisma_1.default.timeSlot.findUnique({
        where: {
            slotId,
        },
    });
    if (!isExistSlot) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Slot Not Found !!!');
    }
    const updatedSlot = yield prisma_1.default.timeSlot.update({
        where: {
            slotId,
        },
        data: {
            slotTime: payload.slotTime,
        },
    });
    if (!updatedSlot) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, ' time Slot Updating Failed !!!');
    }
    return updatedSlot;
});
const deleteSlot = (slotId) => __awaiter(void 0, void 0, void 0, function* () {
    const isExistSlot = yield prisma_1.default.timeSlot.findUnique({
        where: {
            slotId,
        },
    });
    if (!isExistSlot) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Slot Not Found !!!');
    }
    const deletedSlot = yield prisma_1.default.timeSlot.delete({
        where: {
            slotId,
        },
    });
    if (!deletedSlot) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Slot Deleting Failed !!!');
    }
    return deletedSlot;
});
exports.SlotService = {
    createSlot,
    getAllSlots,
    getSingleSlot,
    updateSlot,
    deleteSlot,
};
