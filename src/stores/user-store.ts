import { Observable } from "../core/observable";
import { StorageService } from "./storage-service";
import { User } from "./types";
import { USER_KEY } from "./constants";

class UserStore {
  public currentUser$ = new Observable<User | null>(null);
  private storage: StorageService;

  constructor(storage: StorageService) {
    this.storage = storage;

    const user = this.storage.get<User>(USER_KEY);
    if (user?.isLogined) {
      this.currentUser$.set(user);
    }
  }

  public setUser(user: User) {
    this.currentUser$.set(user);
    this.storage.set(USER_KEY, user);
  }

  public clear() {
    this.currentUser$.set(null);
    this.storage.remove(USER_KEY);
  }

  public get isAuthenticated(): boolean {
    return !!this.currentUser$.value?.isLogined;
  }
}

const storage = new StorageService(sessionStorage);
export const userStore = new UserStore(storage);
