import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { NewsResponse, SourcesResponse } from '../../types/index';
import { initMenuToggle } from '../menu';

class App {
  private controller: AppController;
  private view: AppView;

  constructor() {
    const API_URL = process.env.API_URL ?? '';
    const API_KEY = process.env.API_KEY ?? '';

    this.controller = new AppController(API_URL, { apiKey: API_KEY });
    this.view = new AppView();
  }

  public start(): void {
    const sourcesElement = document.querySelector('.sources');
    if (sourcesElement) {
      sourcesElement.addEventListener('click', (e) => {
        this.controller.getNews(e, (data: NewsResponse) => {
          this.view.drawNews(data);
        });
      });
    }

    this.controller.getSources((data: SourcesResponse) => {
      this.view.drawSources(data);
    });
    initMenuToggle('.menu__button', '.menu');
  }
}

export default App;
