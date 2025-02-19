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
