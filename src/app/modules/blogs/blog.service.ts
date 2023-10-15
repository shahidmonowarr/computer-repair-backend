import { Blog, Prisma } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { serviceSearchableFields } from '../services/service.constants';
import {
  blogRelationalFields,
  blogRelationalFieldsMapper,
} from './blog.constants';
import { IBlogCreateRequest, IBlogFilterRequest } from './blog.interface';

const createBlog = async (profileId: string, blog: IBlogCreateRequest) => {
  const result = await prisma.blog.create({
    data: {
      ...blog,
      profile: {
        connect: {
          profileId,
        },
      },
    },
  });
  return result;
};

const getAllBlogs = async (
  filters: IBlogFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<Blog[]>> => {
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
        if (blogRelationalFields.includes(key)) {
          return {
            [blogRelationalFieldsMapper[key]]: {
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

  const whereConditions: Prisma.BlogWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.blog.findMany({
    include: {
      profile: {
        select: {
          firstName: true,
          lastName: true,
          profileImage: true,
        },
      },
    },
    where: whereConditions,
    skip,
    take: limit,
  });

  const total = await prisma.blog.count({
    where: whereConditions,
  });

  const totalPage = Math.ceil(total / limit);

  return {
    meta: {
      total,
      page,
      limit,
      totalPage,
    },
    data: result,
  };
};

const getBlogById = async (blogId: string): Promise<Blog | null> => {
  const result = await prisma.blog.findUnique({
    where: {
      blogId,
    },
    include: {
      profile: true,
    },
  });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Blog Not Found !!!');
  }

  return result;
};

export const BlogService = {
  createBlog,
  getAllBlogs,
  getBlogById,
};
