import Loader from './loader';

interface AppLoaderOptions {
  apiKey: string;
}

class AppLoader extends Loader {
  constructor(baseLink: string, options: AppLoaderOptions) {
    const apiUrl = baseLink;
    const apiKey = options.apiKey;
    super(apiUrl, { apiKey });
  }
}

export default AppLoader;
