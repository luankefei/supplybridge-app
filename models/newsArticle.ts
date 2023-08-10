export interface NewsArticleAttributes {
  id: number;
  url: string;
  image: string;
  publishDate: Date;
  author: string;
  lang: string;
  country: string;
  title: string;
  text: string;
  k0: string;
  k1: string;
  originId: number;
  sentiment: number;
  summary: string;
  processed: boolean;
}

export interface INewsArticleModel extends NewsArticleAttributes {
  createdAt: Date;
  updatedAt: Date;
}
