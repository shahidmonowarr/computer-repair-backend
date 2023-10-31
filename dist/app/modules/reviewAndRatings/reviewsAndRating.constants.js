"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewAndRatingRelationalFieldsMapper = exports.reviewAndRatingRelationalFields = exports.reviewAndRatingSearchableFields = exports.reviewAndRatingFilterableFields = void 0;
exports.reviewAndRatingFilterableFields = [
    'reviewComment',
    'searchTerm',
    'reviewRating',
    'service',
    'profile',
];
exports.reviewAndRatingSearchableFields = [
    'reviewComment',
    'reviewRating',
    'service',
    'profile',
];
exports.reviewAndRatingRelationalFields = ['profileId'];
exports.reviewAndRatingRelationalFieldsMapper = {
    profileId: 'profileId',
};
