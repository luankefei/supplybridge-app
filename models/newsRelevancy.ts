import { INewsArticleModel } from "./newsArticle";

/**
 * COPY PASTE From Backend
 *
 * src/models/news_relevancy.model.ts
 *
 */
export enum EnumNewsCategory {
  SUPPLIER = "SUPPLIER",
  INDUSTRY = "INDUSTRY",
  RISK = "RISK",
}

export interface NewsRelevancyAttributes {
  id: number;
  newsId: number;
  summary: string;
  keywords: string[];
  category: EnumNewsCategory;
}

export interface INewsRelevancyModel extends NewsRelevancyAttributes {
  createdAt: Date;
  updatedAt: Date;
}

export interface INewsRelevancyModelWithNews extends INewsRelevancyModel {
  NewsArticle: INewsArticleModel;
}

