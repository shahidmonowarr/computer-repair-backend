"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceRelationalFieldsMapper = exports.serviceRelationalFields = exports.serviceSearchableFields = exports.serviceFilterableFields = void 0;
exports.serviceFilterableFields = [
    'searchTerm',
    'profileId',
    'createdAt',
];
exports.serviceSearchableFields = [
    'serviceId',
    'serviceName',
    'description',
    'servicePrice',
];
exports.serviceRelationalFields = ['profileId'];
exports.serviceRelationalFieldsMapper = {
    profileId: 'profile',
};
