export type IFeedbackCreateRequest = {
  feedbackSubject: string;
  feedbackDescription: string;
};
export type IFeedbackUpdateRequest = {
  feedbackComment?: string;
  serviceId?: string;
};

export type IFeedbackCreateResponse = {
  feedbackSubject: string;
  feedbackDescription: string;
  createdAt: Date;
};

export type IFeedBackFilterRequest = {
  searchTerm?: string | undefined;
  feedbackSubject?: string | undefined;
  profile?: string | undefined;
};
