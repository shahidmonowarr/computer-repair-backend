import { TimeSlot } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';
import {
  ICreateSlotRequest,
  ICreateSlotResponse,
  IUpdateSlotRequest,
} from './slots.interface';

const createSlot = async (
  payload: ICreateSlotRequest
): Promise<ICreateSlotResponse> => {
  //
  const existingSlot = await prisma.timeSlot.findFirst({
    where: {
      startTime: payload.startTime,
      endTime: payload.endTime,
    },
  });

  if (existingSlot) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Slot already booked');
  }
  const createdNewSlot = await prisma.timeSlot.create({
    data: {
      startTime: payload.startTime,
      endTime: payload.endTime,
    },
    select: {
      slotId: true,
      startTime: true,
      endTime: true,
      createdAt: true,
    },
  });
  if (!createdNewSlot) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Slot not created');
  }

  return createdNewSlot;
};

const getAllSlots = async (): Promise<TimeSlot[]> => {
  const slots = await prisma.timeSlot.findMany();
  return slots;
};

const getSingleSlot = async (slotId: string): Promise<TimeSlot | null> => {
  const slot = await prisma.timeSlot.findFirst({
    where: {
      slotId,
    },
  });
  return slot;
};

const updateSlot = async (
  slotId: string,
  payload: Partial<IUpdateSlotRequest>
): Promise<TimeSlot | null> => {
  const isExistSlot = await prisma.timeSlot.findUnique({
    where: {
      slotId,
    },
  });

  if (!isExistSlot) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Slot Not Found !!!');
  }

  const updatedSlot = await prisma.timeSlot.update({
    where: {
      slotId,
    },
    data: {
      startTime: payload.startTime,
      endTime: payload.endTime,
    },
  });

  if (!updatedSlot) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      ' time Slot Updating Failed !!!'
    );
  }
  return updatedSlot;
};

const deleteSlot = async (slotId: string): Promise<TimeSlot | null> => {
  const isExistSlot = await prisma.timeSlot.findUnique({
    where: {
      slotId,
    },
  });

  if (!isExistSlot) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Slot Not Found !!!');
  }

  const deletedSlot = await prisma.timeSlot.delete({
    where: {
      slotId,
    },
  });

  if (!deletedSlot) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Slot Deleting Failed !!!');
  }
  return deletedSlot;
};

export const SlotService = {
  createSlot,
  getAllSlots,
  getSingleSlot,
  updateSlot,
  deleteSlot,
};
