export type IServiceCreateRequest = {
  serviceName: string;
  description: string;
  serviceImage: string;
  servicePrice: number;
};

export type IServiceFilterRequest = {
  searchTerm?: string | undefined;
};

export type IUpdateServiceRequest = {
  serviceName?: string;
  description?: string;
  serviceImage?: string;
  servicePrice?: number;
};
