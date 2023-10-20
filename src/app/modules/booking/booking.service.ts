/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Booking, Prisma } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import {
  bookingFields,
  bookingRelationalFieldsMapper,
  bookingSearchableFields,
} from './booking.constants';
import {
  IBookingCreateRequest,
  IBookingCreateResponse,
  IBookingFilterRequest,
  IBookingUpdateRequest,
} from './booking.interface';

const createNewBooking = async (
  profileId: string,
  payload: IBookingCreateRequest
): Promise<IBookingCreateResponse> => {
  const { serviceId, bookingDate, slotId } = payload;

  // Check if the service exists
  const existingService = await prisma.service.findUnique({
    where: {
      serviceId,
    },
  });

  if (!existingService) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Service not found!');
  }

  // Check if the slot exists
  const existingSlot = await prisma.timeSlot.findUnique({
    where: {
      slotId,
    },
  });

  if (!existingSlot) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Slot not found!');
  }

  const takenSlot = await prisma.booking.findFirst({
    where: {
      slotId: payload.slotId,
      bookingDate: payload.bookingDate,
      serviceId: payload.serviceId,
      OR: [{ bookingStatus: 'pending' }, { bookingStatus: 'confirmed' }],
    },
  });

  if (takenSlot) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Slot already booked');
  }

  const result = await prisma.booking.create({
    data: {
      bookingDate,
      slotId,
      serviceId,
      profileId,
    },
    select: {
      bookingDate: true,
      createdAt: true,
    },
  });

  if (!result) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Something went wrong while creating booking'
    );
  }

  return result;
};

const getAllBookings = async (
  filters: IBookingFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<Booking[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);

  const { searchTerm, ...filterData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: bookingSearchableFields.map((field: any) => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => {
        if (bookingFields.includes(key)) {
          return {
            [bookingRelationalFieldsMapper[key]]: {
              id: (filterData as any)[key],
            },
          };
        } else {
          return {
            [key]: {
              equals: (filterData as any)[key],
            },
          };
        }
      }),
    });
  }

  const whereConditions: Prisma.BookingWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.booking.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
            createdAt: 'desc',
          },
  });
  const total = await prisma.booking.count({
    where: whereConditions,
  });
  const totalPage = Math.ceil(total / limit);
  return {
    meta: {
      page,
      limit,
      total,
      totalPage,
    },
    data: result,
  };
};
const getMyBooking = async (
  profileId: string,
  filters: IBookingFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<Booking[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);

  const { searchTerm, firstName, bookingStatus, ...filterData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: bookingSearchableFields.map((field: any) => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (firstName) {
    andConditions.push({
      profile: {
        firstName: {
          contains: firstName,
          mode: 'insensitive',
        },
      },
    });
  }

  if (bookingStatus) {
    andConditions.push({
      bookingStatus: {
        equals: bookingStatus,
      },
    });
  }

  andConditions.push({
    profileId: (filters as any).profileId,
  });

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => {
        if (bookingFields.includes(key)) {
          return {
            [bookingRelationalFieldsMapper[key]]: {
              id: (filterData as any)[key],
            },
          };
        } else {
          return {
            [key]: {
              equals: (filterData as any)[key],
            },
          };
        }
      }),
    });
  }

  // @ts-ignore
  const whereConditions: Prisma.BookingWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.booking.findMany({
    include: {
      service: {
        select: {
          serviceName: true,
        },
      },
      slot: {
        select: {
          slotTime: true,
        },
      },
      profile: {
        select: {
          firstName: true,
          lastName: true,
          phoneNumber: true,
        },
      },
    },
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
            createdAt: 'desc',
          },
  });
  const total = await prisma.booking.count({
    where: whereConditions,
  });
  const totalPage = Math.ceil(total / limit);
  return {
    meta: {
      page,
      limit,
      total,
      totalPage,
    },
    data: result,
  };
};

const getSingleBooking = async (bookingId: string): Promise<Booking> => {
  const result = await prisma.booking.findUnique({
    where: {
      bookingId,
    },
  });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Booking not found!');
  }

  return result;
};

const updateBooking = async (
  bookingId: string,
  payload: Partial<IBookingUpdateRequest>
): Promise<Booking | null> => {
  const isExist = await prisma.booking.findUnique({
    where: {
      bookingId,
    },
  });

  if (!isExist) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      'Appointment Booking Not Found !!!'
    );
  }

  const updateData = {
    serviceId: payload?.serviceId,
    appointmentDate: payload?.bookingDate,
    slotId: payload?.slotId,
  };

  const result = await prisma.booking.update({
    where: {
      bookingId,
    },
    data: updateData,
  });
  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Updating Failed !!!');
  }
  return result;
};

const deleteBooking = async (bookingId: string): Promise<Booking | null> => {
  const result = await prisma.$transaction(async transactionClient => {
    const isExist = await transactionClient.booking.findUnique({
      where: {
        bookingId,
      },
    });

    if (!isExist) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Appointment Booking Not Found');
    }

    const BookingDeleted = await transactionClient.booking.delete({
      where: {
        bookingId,
      },
    });

    return BookingDeleted;
  });
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Appointment Booking Not Deleted');
  }
  return result;
};

export const bookingService = {
  createNewBooking,
  getAllBookings,
  getSingleBooking,
  updateBooking,
  deleteBooking,
  getMyBooking,
};
