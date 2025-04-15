export class StorageService {
  constructor(private storage: Storage) {}

  public get<T>(key: string): T | null {
    const raw = this.storage.getItem(key);
    if (!raw) return null;

    try {
      return JSON.parse(raw) as T;
    } catch {
      return null;
    }
  }

  public set<T>(key: string, value: T): void {
    this.storage.setItem(key, JSON.stringify(value));
  }

  public remove(key: string): void {
    this.storage.removeItem(key);
  }
}
