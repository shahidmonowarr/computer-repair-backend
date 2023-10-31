"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.feedbackRelationalFieldsMapper = exports.feedbackRelationalFields = exports.FeedbackSearchableFields = exports.FeedbackFilterableFields = void 0;
exports.FeedbackFilterableFields = [
    'feedbackComment',
    'searchTerm',
    'service',
    'profile',
];
exports.FeedbackSearchableFields = [
    'feedbackComment',
    'service',
    'profile',
];
exports.feedbackRelationalFields = ['profileId'];
exports.feedbackRelationalFieldsMapper = {
    profileId: 'profileId',
};
