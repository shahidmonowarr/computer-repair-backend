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
exports.UserService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../../config"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const getAllUsers = (options) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, page, skip } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    const result = yield prisma_1.default.user.findMany({
        skip,
        take: limit,
        select: {
            userId: true,
            email: true,
            createdAt: true,
            profile: true,
        },
        orderBy: {
            createdAt: 'desc',
        },
    });
    const total = yield prisma_1.default.user.count();
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
const getUserById = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.user.findUnique({
        where: { userId },
        select: {
            userId: true,
            email: true,
            createdAt: true,
            profile: true,
        },
    });
    return result;
});
// Update my user Profile info
const updateMyUserInfo = (userId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existingUser = yield prisma_1.default.user.findUnique({ where: { userId } });
    if (!existingUser) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'You are  not a valid user!');
    }
    const { oldPassword, newPassword, email } = payload;
    const updatedData = {};
    if (oldPassword && newPassword) {
        const isOldPasswordCorrect = yield bcrypt_1.default.compare(oldPassword, existingUser.password);
        if (!isOldPasswordCorrect) {
            throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Old password is incorrect');
        }
        const hashPassword = yield bcrypt_1.default.hash(newPassword, Number(config_1.default.bcrypt_salt_rounds));
        updatedData.password = hashPassword;
    }
    if (email) {
        updatedData.email = email;
    }
    if (Object.keys(updatedData).length === 0) {
        return {
            message: 'No changes to update',
            updatedInfo: {},
        };
    }
    const result = yield prisma_1.default.user.update({
        where: { userId },
        data: updatedData,
    });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'User update failed');
    }
    return {
        message: 'User updated successfully',
        updatedInfo: updatedData,
    };
});
// Update user profile info
const updateProfileInfo = (profileId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, profileImage, role, phoneNumber, address } = payload;
    if ('profileId' in payload) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Profile Id cannot be updated');
    }
    // Check if the profile exists
    const existingProfile = yield prisma_1.default.profile.findUnique({
        where: {
            profileId,
        },
    });
    if (!existingProfile) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Profile not found!');
    }
    const updateData = {};
    if (firstName !== undefined) {
        updateData.firstName = firstName;
    }
    if (lastName !== undefined) {
        updateData.lastName = lastName;
    }
    if (profileImage !== undefined) {
        updateData.profileImage = profileImage;
    }
    if (role !== undefined) {
        updateData.role = role;
    }
    if (phoneNumber !== undefined) {
        updateData.phoneNumber = phoneNumber;
    }
    if (address !== undefined) {
        updateData.address = address;
    }
    if (Object.keys(updateData).length === 0) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'At least one field is required for update');
    }
    // Update the profile
    const result = yield prisma_1.default.profile.update({
        where: {
            profileId,
        },
        data: updateData,
    });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Profile update failed');
    }
    return {
        message: 'Profile updated successfully',
        updatedInfo: updateData,
    };
});
const getMyProfile = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.user.findUnique({
        where: {
            userId,
        },
        select: {
            userId: true,
            email: true,
            profile: true,
            createdAt: true,
            updatedAt: true,
        },
    });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User not Found !!');
    }
    return result;
});
// Update my Profile info
const updateMyProfileInfo = (profileId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, profileImage, role, phoneNumber, address } = payload;
    if ('profileId' in payload) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Profile Id cannot be updated');
    }
    // Check if the profile exists
    const existingProfile = yield prisma_1.default.profile.findUnique({
        where: {
            profileId,
        },
    });
    if (!existingProfile) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Profile not found!');
    }
    const updateData = {};
    if (firstName !== undefined) {
        updateData.firstName = firstName;
    }
    if (lastName !== undefined) {
        updateData.lastName = lastName;
    }
    if (profileImage !== undefined) {
        updateData.profileImage = profileImage;
    }
    if (role !== undefined) {
        updateData.role = role;
    }
    if (phoneNumber !== undefined) {
        updateData.phoneNumber = phoneNumber;
    }
    if (address !== undefined) {
        updateData.address = address;
    }
    if (Object.keys(updateData).length === 0) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'At least one field is required for update');
    }
    // Update the profile
    const result = yield prisma_1.default.profile.update({
        where: {
            profileId,
        },
        data: updateData,
    });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Profile update failed');
    }
    return {
        message: 'Profile updated successfully',
        updatedInfo: updateData,
    };
});
exports.UserService = {
    getAllUsers,
    getUserById,
    updateProfileInfo,
    getMyProfile,
    updateMyUserInfo,
    updateMyProfileInfo,
};
