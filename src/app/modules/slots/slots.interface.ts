export type ICreateSlotRequest = {
  slotTime: string;
};

export type IUpdateSlotRequest = {
  slotId: string;
  slotTime: string;
  serviceId: string;
};

export type ICreateSlotResponse = {
  slotId: string;
  slotTime: string;
  createdAt: Date;
};
