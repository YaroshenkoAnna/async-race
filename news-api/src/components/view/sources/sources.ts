import './sources.css';
import { NewsSource, Language } from '../../../types/index';

class Sources {
  private sourcesData: NewsSource[] = [];
  private selectedLanguage: string = Language.All;

  constructor() {
    this.createLanguageFilter();
  }

  private createLanguageFilter(): void {
    const languageFilterContainer = document.getElementById('languageFilter');
    if (!languageFilterContainer) return;

    Object.entries(Language).forEach(([name, code]) => {
      const button = document.createElement('div');
      button.classList.add('language__button');
      button.textContent = name;
      button.dataset.language = code;

      if (code === Language.All) {
        button.classList.add('active');
      }

      button.addEventListener('click', () => {
        this.selectedLanguage = code;
        this.filterSources();
        document.querySelectorAll('.language__button').forEach((btn) => {
          btn.classList.remove('active');
        });
        button.classList.add('active');
      });

      languageFilterContainer.appendChild(button);
    });
  }
  public draw(data: NewsSource[]): void {
    this.sourcesData = data;
    this.renderSources(data);
  }

  private renderSources(data: NewsSource[]): void {
    const fragment = document.createDocumentFragment();
    const sourceItemTemp = document.querySelector<HTMLTemplateElement>('#sourceItemTemp');

    if (!sourceItemTemp) {
      console.error('Template element #sourceItemTemp not found');
      return;
    }

    data.forEach((item) => {
      if (
        (this.selectedLanguage as Language) !== Language.All &&
        item.language !== (this.selectedLanguage as Language)
      ) {
        return;
      }

      const sourceClone = sourceItemTemp.content.cloneNode(true) as DocumentFragment;

      const sourceName = sourceClone.querySelector<HTMLElement>('.source__item-name');
      if (sourceName) sourceName.textContent = item.name;

      const sourceItem = sourceClone.querySelector<HTMLElement>('.source__item');
      if (sourceItem) sourceItem.setAttribute('data-source-id', item.id);

      fragment.append(sourceClone);
    });

    const sourceContainer = document.querySelector('.sources');
    if (sourceContainer) {
      sourceContainer.innerHTML = '';
      sourceContainer.append(fragment);
    }
  }

  private filterSources(): void {
    const filteredSources =
      (this.selectedLanguage as Language) === Language.All
        ? this.sourcesData
        : this.sourcesData.filter((source) => source.language === (this.selectedLanguage as Language));

    this.renderSources(filteredSources);
  }
}

export default Sources;
