import { BookingStatus } from '@prisma/client';

export type IBookingCreateRequest = {
  bookingDate: Date;
  serviceId: string;
  slotId: string;
};
export type IBookingUpdateRequest = {
  bookingDate?: Date;
  serviceId?: string;
  slotId?: string;
  bookingStatus?: BookingStatus;
};

export type IMyBookingUpdateRequest = {
  bookingStatus?: BookingStatus;
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
  firstName?: string | undefined;
  lastName?: string | undefined;
  serviceName?: string | undefined;
  bookingStatus?: BookingStatus | undefined;
};
