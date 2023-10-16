export const reviewAndRatingFilterableFields = [
  'reviewComment',
  'searchTerm',
  'reviewRating',
  'service',
  'profile',
];

export const reviewAndRatingSearchableFields = [
  'reviewComment',
  'reviewRating',
  'service',
  'profile',
];

export const reviewAndRatingRelationalFields: string[] = ['profileId'];

export const reviewAndRatingRelationalFieldsMapper: { [key: string]: string } =
  {
    profileId: 'profileId',
  };
