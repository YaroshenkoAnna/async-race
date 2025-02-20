import Loader from './loader';

class AppLoader extends Loader {
  constructor(baseLink: string, options: Record<string, string>) {
    const apiUrl = baseLink;
    const apiKey = options.apiKey;
    super(apiUrl, { apiKey });
  }
}

export default AppLoader;
