export interface LoaderOptions {
  apiKey: string;
  sources?: string;
}

class Loader {
  constructor(
    private baseLink: string,
    public options: LoaderOptions
  ) {}

  public getResp<T>(params: { endpoint: string; options?: LoaderOptions }, callback: (data: T) => void = () => {}): void {
    const { endpoint, options } = params;
    this.load<T>('GET', endpoint, callback, options);
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

  private makeUrl(endpoint: string, options?: LoaderOptions): string {
    const urlOptions = { ...this.options, ...options };
    const url = new URL(endpoint, this.baseLink);

    Object.keys(urlOptions).forEach((key) => {
      const value = urlOptions[key as keyof LoaderOptions];
      if (value !== undefined) {
        url.searchParams.append(key, String(value));
      }
    });

    return url.toString();
  }

  private load<T>(
    method: string,
    endpoint: string,
    callback: (data: T) => void,
    options?: LoaderOptions
  ): void {
    fetch(this.makeUrl(endpoint, options), { method })
      .then((res) => this.errorHandler(res))
      .then((res) => res.json())
      .then((data: T) => {
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
