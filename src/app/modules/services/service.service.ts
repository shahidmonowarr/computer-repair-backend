import { Prisma, Service } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import {
  serviceRelationalFields,
  serviceRelationalFieldsMapper,
  serviceSearchableFields,
} from './service.constants';
import {
  ICreateNewServiceResponse,
  IServiceCreateRequest,
  IServiceFilterRequest,
  IUpdateServiceRequest,
} from './service.interface';

const createNewService = async (
  data: IServiceCreateRequest
): Promise<ICreateNewServiceResponse> => {
  const serviceData = {
    serviceName: data.serviceName,
    description: data.description,
    serviceImage: data.serviceImage,
    servicePrice: data.servicePrice,
    serviceStatus: data.serviceStatus,
  };

  const serviceExists = await prisma.service.findFirst({
    where: {
      serviceName: serviceData.serviceName,
    },
    select: {
      serviceName: true,
    },
  });

  if (serviceExists) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Service already exists');
  }

  const result = await prisma.service.create({
    data: serviceData,
  });

  return result;
};

const getAllServices = async (
  filters: IServiceFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<Service[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);

  const { searchTerm, ...filterData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: serviceSearchableFields.map((field: any) => ({
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
        if (serviceRelationalFields.includes(key)) {
          return {
            [serviceRelationalFieldsMapper[key]]: {
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

  const whereConditions: Prisma.ServiceWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.service.findMany({
    include: {
      reviewAndRatings: true,
      bookings: true,
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
  const total = await prisma.service.count({
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

const getSingleService = async (serviceId: string): Promise<Service | null> => {
  //

  const result = await prisma.service.findUnique({
    where: {
      serviceId,
    },
    include: {
      reviewAndRatings: true,
      bookings: true,
    },
  });
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Service Not Found !!!');
  }
  return result;
};

const updateService = async (
  serviceId: string,
  payload: Partial<IUpdateServiceRequest>
): Promise<Service | null> => {
  const isExistService = await prisma.service.findUnique({
    where: {
      serviceId,
    },
  });

  if (!isExistService) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Service Not Found !!!');
  }

  const updateServiceData = {
    serviceName: payload?.serviceName,
    description: payload?.description,
    serviceImage: payload?.serviceImage,
    servicePrice: payload?.servicePrice,
  };

  const result = await prisma.service.update({
    where: {
      serviceId,
    },
    data: updateServiceData,
  });

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Updating Service Failed');
  }
  return result;
};

const deleteService = async (serviceId: string): Promise<Service | null> => {
  const isExistService = await prisma.service.findUnique({
    where: {
      serviceId,
    },
  });

  if (!isExistService) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Service Not Found !!!');
  }

  const result = await prisma.service.delete({
    where: {
      serviceId,
    },
  });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Deleting Service Failed');
  }

  return result;
};

export const RepairService = {
  createNewService,
  getAllServices,
  getSingleService,
  updateService,
  deleteService,
};
