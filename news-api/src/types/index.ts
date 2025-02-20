export interface NewsSource {
  id: string;
  name: string;
  description: string;
  url: string;
  category: string;
  language: string;
  country: string;
}

export interface NewsSourcesResponse {
  status: 'ok' | 'error';
  sources: NewsSource[];
}

export interface NewsApiError {
  status: 'error';
  code: string;
  message: string;
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
