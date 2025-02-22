enum ResponseStatus {
  OK = 'ok',
  ERROR = 'error',
}

export interface NewsSource {
  id: string;
  name: string;
  description: string;
  url: string;
  category: string;
  language: string;
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
