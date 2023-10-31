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
exports.AuthService = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../../config"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const createNewUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { password, email } = data;
    const hashedPassword = yield bcrypt_1.default.hash(password, Number(config_1.default.bcrypt_salt_rounds));
    // transaction start
    const newUser = yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        const isUserExist = yield transactionClient.user.findFirst({
            where: { email },
        });
        if (isUserExist) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Email already exist');
        }
        const createdProfile = yield transactionClient.profile.create({
            data: {
                firstName: data.firstName,
                lastName: data.lastName,
                profileImage: data.profileImage,
                role: data.role,
            },
            select: {
                profileId: true,
                role: true,
            },
        });
        if (createdProfile.role == client_1.Role.technician) {
            yield transactionClient.technician.create({
                data: {
                    expertise: data.expertise,
                    profileId: createdProfile.profileId,
                },
                select: {
                    profileId: true,
                    createdAt: true,
                },
            });
        }
        const createdUser = yield transactionClient.user.create({
            data: {
                email,
                password: hashedPassword,
                profile: {
                    connect: {
                        profileId: createdProfile.profileId,
                    },
                },
            },
            select: {
                profileId: true,
                createdAt: true,
                email: true,
                userId: true,
            },
        });
        if (!createdUser || !createdProfile) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Creating New User Failed');
        }
        return createdUser;
    }));
    return newUser;
});
const userLogin = (loginData) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { email, password } = loginData;
    const isUserExist = yield prisma_1.default.user.findUnique({
        where: {
            email,
        },
        select: {
            userId: true,
            email: true,
            password: true,
            profile: {
                select: {
                    role: true,
                    profileId: true,
                },
            },
        },
    });
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'User not found !!');
    }
    const isPasswordValid = yield bcrypt_1.default.compare(password, isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.password);
    if (isUserExist && !isPasswordValid) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Password is incorrect !!');
    }
    const tokenData = {
        userId: isUserExist.userId,
        role: (_a = isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.profile) === null || _a === void 0 ? void 0 : _a.role,
        email: isUserExist.email,
        profileId: (_b = isUserExist.profile) === null || _b === void 0 ? void 0 : _b.profileId,
    };
    const accessToken = jwtHelpers_1.jwtHelpers.createToken(tokenData, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    const refreshToken = jwtHelpers_1.jwtHelpers.createToken(tokenData, config_1.default.jwt.refresh_secret, config_1.default.jwt.refresh_expires_in);
    return {
        accessToken,
        refreshToken,
    };
});
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d;
    let verifiedToken = null;
    console.log(token, 'token is here=========');
    try {
        verifiedToken = jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.refresh_secret);
    }
    catch (error) {
        // err
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'Invalid Refresh Token');
    }
    const { userId } = verifiedToken;
    const isUserExist = yield prisma_1.default.user.findFirst({
        where: {
            userId,
        },
        select: {
            userId: true,
            email: true,
            password: true,
            profile: {
                select: {
                    role: true,
                    profileId: true,
                },
            },
        },
    });
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User does not exists!!');
    }
    const tokenData = {
        userId: isUserExist.userId,
        role: (_c = isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.profile) === null || _c === void 0 ? void 0 : _c.role,
        email: isUserExist.email,
        profileId: (_d = isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.profile) === null || _d === void 0 ? void 0 : _d.profileId,
    };
    // generate new token
    const newAccessToken = jwtHelpers_1.jwtHelpers.createToken(tokenData, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    return {
        accessToken: newAccessToken,
    };
});
exports.AuthService = {
    createNewUser,
    userLogin,
    refreshToken,
};
