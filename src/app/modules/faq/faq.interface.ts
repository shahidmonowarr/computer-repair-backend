export type IFaqCreateRequest = {
  faqTitle: string;
  faqDescription: string;
};

export type IUpdateFaqRequest = {
  faqTitle?: string;
  faqDescription?: string;
};

export type IFaqResponse = {
  faqTitle: string;
  faqDescription: string;
  createdAt: Date;
};
