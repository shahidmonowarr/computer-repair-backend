"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogRelationalFieldsMapper = exports.blogRelationalFields = exports.blogSearchableFields = exports.blogFilterableFields = void 0;
exports.blogFilterableFields = [
    'searchTerm',
    'profileId',
    'createdAt',
];
exports.blogSearchableFields = [
    'blogId',
    'profileId',
    'blogTitle',
    'blogDescription',
];
exports.blogRelationalFields = ['profileId'];
exports.blogRelationalFieldsMapper = {
    profileId: 'profileId',
};
