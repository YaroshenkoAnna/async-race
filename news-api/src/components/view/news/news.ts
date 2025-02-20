import './news.css';
import { NewsArticle } from '../../../types/index';

class News {
  draw(data: NewsArticle[]) {
    const news = data.length >= 10 ? data.slice(0, 10) : data;

    const fragment = document.createDocumentFragment();
    const newsItemTemp = document.querySelector<HTMLTemplateElement>('#newsItemTemp');
    if (!newsItemTemp) return;

    news.forEach((item, idx) => {
      const newsClone = newsItemTemp.content.cloneNode(true) as HTMLElement;

      if (idx % 2 === 1) {
        const newsItem = newsClone.querySelector('.news__item');
        newsItem?.classList.add('alt');
      }

      const image = newsClone.querySelector('.news__meta-photo') as HTMLElement;
      image.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;

      const authorElement = newsClone.querySelector('.news__meta-author');
      if (authorElement) {
        authorElement.textContent = item.author || item.source.name;
      }

      const dateElement = newsClone.querySelector('.news__meta-date');
      if (dateElement) {
        dateElement.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');
      }

      const descriptionTitleElement = newsClone.querySelector('.news__description-title');
      if (descriptionTitleElement) {
        descriptionTitleElement.textContent = item.title;
      }

      const descriptionSourceElement = newsClone.querySelector('.news__description-source');
      if (descriptionSourceElement) {
        descriptionSourceElement.textContent = item.source.name;
      }

      const descriptionElement = newsClone.querySelector('.news__description-content');
      if (descriptionElement) {
        descriptionElement.textContent = item.description;
      }

      const urlElement = newsClone.querySelector('.news__read-more a');
      if (urlElement) {
        urlElement.setAttribute('href', item.url);
      }

      fragment.append(newsClone);
    });

    const newsContainer = document.querySelector('.news');
    if (newsContainer) {
      newsContainer.replaceChildren(fragment);
    }
  }
}

export default News;
