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
  status: 'ok' | 'error';
  sources: NewsSource[];
}

export interface NewsResponse {
  status: 'ok' | 'error';
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
