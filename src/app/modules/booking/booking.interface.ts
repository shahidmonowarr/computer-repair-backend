export type IBookingCreateRequest = {
  bookingDate: Date;
  serviceId: string;
  slotId: string;
};
export type IBookingUpdateRequest = {
  bookingDate?: Date;
  serviceId?: string;
  slotId?: string;
};

export type IBookingCreateResponse = {
  bookingDate: Date;
  createdAt: Date;
};

export type IBookingFilterRequest = {
  searchTerm?: string | undefined;
  serviceId?: string | undefined;
  bookingDate?: string | undefined;
  slotId?: string | undefined;
};
