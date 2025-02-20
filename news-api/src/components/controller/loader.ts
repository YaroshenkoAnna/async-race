import { SourcesResponse } from '../../types/index';

class Loader {
  private baseLink: string;
  private options: Record<string, string>;

  constructor(baseLink: string, options: Record<string, string>) {
    this.baseLink = baseLink;
    this.options = options;
  }

  getResp(
    { endpoint, options = {} }: { endpoint: string; options?: Record<string, string> },
    callback: (data: SourcesResponse) => void
  ): void {
    this.load('GET', endpoint, callback, options);
  }

  private errorHandler(res: Response): Response {
    if (!res.ok) {
      if (res.status === 401 || res.status === 404) {
        console.error(`Sorry, but there is ${String(res.status)} error: ${String(res.statusText)}`);
      }
      throw new Error(res.statusText);
    }
    return res;
  }

  private makeUrl(options: Record<string, string>, endpoint: string): string {
    const urlOptions = { ...this.options, ...options };
    const url = new URL(endpoint, this.baseLink);

    Object.keys(urlOptions).forEach((key) => {
      url.searchParams.append(key, urlOptions[key]);
    });

    return url.toString();
  }

  private load(
    method: string,
    endpoint: string,
    callback: (data: SourcesResponse) => void,
    options: Record<string, string> = {}
  ): void {
    fetch(this.makeUrl(options, endpoint), { method })
      .then((res) => this.errorHandler(res))
      .then((res) => res.json())
      .then((data: SourcesResponse) => {
        callback(data);
      })
      .catch((err: unknown) => {
        if (err instanceof Error) {
          console.error(err.message);
        } else {
          console.error('An unknown error occurred');
        }
      });
  }
}

export default Loader;
