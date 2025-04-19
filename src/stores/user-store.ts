import { Observable } from "../core/observable";
import { StorageService } from "./storage-service";
import { User } from "./types";
import { USER_KEY, USER_PASS_KEY } from "./constants";

export class UserStore {
  public password: string | null = null;
  public currentUser$ = new Observable<User | null>(null);
  public activeUsers$ = new Observable<User[]>([]);
  public inactiveUsers$ = new Observable<User[]>([]);
  private storage: StorageService;

  constructor(storage: StorageService) {
    this.storage = storage;
    const user = this.storage.get<User>(USER_KEY);
    this.password = this.storage.get(USER_PASS_KEY) ?? null;
    if (user?.isLogined) {
      this.currentUser$.set(user);
    }
  }

  public setUser(user: User, password: string) {
    this.currentUser$.set(user);
    this.storage.set(USER_KEY, user);
    this.storage.set(USER_PASS_KEY, password);
    this.password = this.storage.get(USER_PASS_KEY);
  }

  public clear() {
    this.currentUser$.set(null);
    this.storage.remove(USER_KEY);
  }

  public get isAuthenticated(): boolean {
    return !!this.currentUser$.value?.isLogined;
  }

  public setActive(users: User[]) {
    this.activeUsers$.set(this.excludeCurrentUser(users));
  }

  public setInactive(users: User[]) {
    this.inactiveUsers$.set(this.excludeCurrentUser(users));
  }

  public clearAll() {
    this.activeUsers$.set([]);
    this.inactiveUsers$.set([]);
  }

  private excludeCurrentUser(users: User[]): User[] {
    const current = this.currentUser$.value;
    return current ? users.filter((u) => u.login !== current.login) : users;
  }
}

const storage = new StorageService(sessionStorage);
export const userStore = new UserStore(storage);
