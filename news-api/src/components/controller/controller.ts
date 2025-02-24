import AppLoader from './appLoader';
import { SourcesResponse, NewsResponse } from '../../types/index';

class AppController extends AppLoader {
  public getSources(callback: (data: SourcesResponse) => void): void {
    this.getResp({ endpoint: 'sources' }, (data: SourcesResponse) => {
      callback(data);
    });
  }

  public getNews(e: Event, callback: (data: NewsResponse) => void): void {
    let target = e.target as HTMLElement;
    const newsContainer = e.currentTarget as HTMLElement;

    while (target !== newsContainer) {
      if (target.classList.contains('source__item')) {
        const sourceId = target.getAttribute('data-source-id') ?? '';
        if (newsContainer.getAttribute('data-source') !== sourceId) {
          newsContainer.setAttribute('data-source', sourceId);

          super.getResp<NewsResponse>(
            {
              endpoint: 'everything',
              options: {
                sources: sourceId,
                apiKey: this.options.apiKey,
              },
            },
            (data: NewsResponse) => {
              callback(data);
            }
          );
        }
        return;
      }
      target = target.parentNode as HTMLElement;
    }
  }
}

export default AppController;
