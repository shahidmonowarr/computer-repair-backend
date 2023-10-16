export type IFeedbackCreateRequest = {
  feedbackComment: string;
  serviceId: string;
};
export type IFeedbackUpdateRequest = {
  feedbackComment?: string;
  serviceId?: string;
};

export type IFeedbackCreateResponse = {
  createdAt: Date;
  feedbackComment: string;
};

export type IFeedBackFilterRequest = {
  searchTerm?: string | undefined;
  feedbackComment?: string | undefined;
  service?: string | undefined;
  profile?: string | undefined;
};
