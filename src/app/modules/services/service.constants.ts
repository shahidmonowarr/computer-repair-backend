export const serviceFilterableFields: string[] = [
  'searchTerm',
  'profileId',
  'createdAt',
];

export const serviceSearchableFields: string[] = [
  'serviceId',
  'serviceName',
  'description',
  'servicePrice',
];

export const serviceRelationalFields: string[] = ['profileId'];

export const serviceRelationalFieldsMapper: any = {
  profileId: 'profile',
};
