export const FeedbackFilterableFields: string[] = [
  'feedbackComment',
  'searchTerm',
  'service',
  'profile',
];

export const FeedbackSearchableFields: string[] = [
  'feedbackComment',
  'service',
  'profile',
];

export const feedbackRelationalFields: string[] = ['profileId'];
export const feedbackRelationalFieldsMapper: { [key: string]: string } = {
  profileId: 'profileId',
};
