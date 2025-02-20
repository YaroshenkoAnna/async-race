import './sources.css';
import { NewsSource } from '../../../types/index';

class Sources {
  draw(data: NewsSource[]): void {
    const fragment = document.createDocumentFragment();
    const sourceItemTemp = document.querySelector<HTMLTemplateElement>('#sourceItemTemp');

    data.forEach((item) => {
      if (!sourceItemTemp) {
        console.error('Template element #sourceItemTemp not found');
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
    if (sourceContainer) sourceContainer.append(fragment);
  }
}

export default Sources;
