export const bookingFilterableFields: string[] = [
  'searchTerm',
  'bookingDate',
  'serviceId',
  'slotId',
];

export const bookingSearchableFields: string[] = [
  'serviceId',
  'bookingDate',
  'slotId',
];

export const bookingFields: string[] = ['profileId'];
export const bookingRelationalFieldsMapper: { [key: string]: string } = {
  profileId: 'profileId',
};
