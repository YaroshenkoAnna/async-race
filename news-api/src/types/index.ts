enum ResponseStatus {
  OK = 'ok',
  ERROR = 'error',
}

export enum Language{
All = "all",
Arabic = "ar",
German = "de",
English = "en",
Spanish = "es",
French = "fr",
Hebrew = "he",
Italian = "it",
Dutch = "nl",
Portuguese = "pt",
Russian = "ru",
Swedish = "sv",
Chinese = "zh"
}

export interface NewsSource {
  id: string;
  name: string;
  description: string;
  url: string;
  category: string;
  language: Language;
  country: string;
}

export interface SourcesResponse {
  status: ResponseStatus;
  sources: NewsSource[];
}

export interface NewsResponse {
  status: ResponseStatus;
  totalResults?: number;
  articles?: NewsArticle[];
}

export interface NewsArticle {
  author: string | null;
  content: string | null;
  description: string | null;
  publishedAt: string;
  source: NewsSource;
  title: string;
  url: string;
  urlToImage: string | null;
}
