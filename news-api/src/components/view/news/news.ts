import './news.css';
import { NewsArticle } from '../../../types/index';

class News {
  draw(data: NewsArticle[]) {
    const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

    const fragment = document.createDocumentFragment();
    const newsItemTemp = document.querySelector<HTMLTemplateElement>('#newsItemTemp');
    if (!newsItemTemp) return;

    news.forEach((item, idx) => {
      const newsClone = newsItemTemp.content.cloneNode(true) as HTMLElement;

      if (idx % 2) newsClone.querySelector('.news__item')?.classList.add('alt');

      const image = newsClone.querySelector('.news__meta-photo') as HTMLElement;
      if (image) image.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;
      newsClone.querySelector('.news__meta-author')!.textContent = item.author || item.source.name;
      newsClone.querySelector('.news__meta-date')!.textContent = item.publishedAt
        .slice(0, 10)
        .split('-')
        .reverse()
        .join('-');

      newsClone.querySelector('.news__description-title')!.textContent = item.title;
      newsClone.querySelector('.news__description-source')!.textContent = item.source.name;
      newsClone.querySelector('.news__description-content')!.textContent = item.description;
      newsClone.querySelector('.news__read-more a')!.setAttribute('href', item.url);

      fragment.append(newsClone);
    });

    const newsContainer = document.querySelector('.news');
    if (newsContainer) {
      newsContainer.innerHTML = '';
      newsContainer.appendChild(fragment);
    }
  }
}

export default News;
