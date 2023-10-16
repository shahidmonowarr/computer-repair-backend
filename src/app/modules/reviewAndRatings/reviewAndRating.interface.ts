export type ICreateReviewAndRatingRequest = {
  reviewComment: string;
  reviewRating: string;
  serviceId: string;
};
export type ICreateReviewAndRatingResponse = {
  reviewComment: string;
  reviewRating: string;
  createdAt: Date;
};

export type IUpdateReviewAndRatingRequest = {
  reviewComment?: string;
  reviewRating?: string;
};

export type IReviewAndRatingFilterRequest = {
  searchTerm?: string | undefined;
  reviewComment?: string | undefined;
  service?: string | undefined;
  profile?: string | undefined;
};
