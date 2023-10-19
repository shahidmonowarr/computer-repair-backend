import { serviceStatus } from '@prisma/client';

export type IServiceCreateRequest = {
  serviceName: string;
  description: string;
  serviceImage: string;
  servicePrice: number;
  serviceStatus: serviceStatus;
};

export type IServiceFilterRequest = {
  searchTerm?: string | undefined;
  servicePrice?: string | undefined;
};

export type IUpdateServiceRequest = {
  serviceName?: string;
  description?: string;
  serviceImage?: string;
  servicePrice?: number;
  serviceStatus?: serviceStatus;
};

export type ICreateNewServiceResponse = {
  serviceName: string;
  description: string;
  serviceImage: string;
  servicePrice: number;
  serviceStatus: serviceStatus;
};
