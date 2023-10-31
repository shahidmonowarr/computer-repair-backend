"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingRelationalFieldsMapper = exports.bookingFields = exports.bookingSearchableFields = exports.bookingFilterableFields = void 0;
exports.bookingFilterableFields = [
    'searchTerm',
    'bookingDate',
    'serviceId',
    'slotId',
];
exports.bookingSearchableFields = [
    'serviceId',
    'bookingDate',
    'slotId',
];
exports.bookingFields = ['profileId'];
exports.bookingRelationalFieldsMapper = {
    profileId: 'profileId',
};
