import { SocketClient } from "../network/socket-client";
import { createUniqueId } from "../network/helpers/create-unique-id";
import { userStore } from "../stores/user-store";

interface User {
  login: string;
  isLogined: boolean;
}

export class UserService {
  constructor(private client: SocketClient) {
    this.subscribeToExternalChanges();
    this.fetchAll();
  }

  public async fetchAll(): Promise<void> {
    const [active, inactive] = await Promise.all([
      this.fetchUsers("USER_ACTIVE"),
      this.fetchUsers("USER_INACTIVE"),
    ]);

    userStore.setActive(active);
    userStore.setInactive(inactive);
  }

  public fetchActiveUsers(): Promise<User[]> {
    
    return this.fetchUsers("USER_ACTIVE");
  }

  public fetchInactiveUsers(): Promise<User[]> {
    return this.fetchUsers("USER_INACTIVE");
  }

  private fetchUsers(type: "USER_ACTIVE" | "USER_INACTIVE"): Promise<User[]> {
    return new Promise((resolve, reject) => {
      const id = createUniqueId();

      const unsub = this.client.on(type, (res) => {
        if (res.id === id) {
          unsub();
          resolve(res.payload.users);
        }
      });

      const errUnsub = this.client.on("ERROR", (res) => {
        if (res.id === id) {
          errUnsub();
          reject(res.payload.error);
        }
      });

      this.client.send({
        id,
        type,
        payload: null,
      });
    });
  }

  private subscribeToExternalChanges() {
    this.client.on("USER_EXTERNAL_LOGIN", (res) => {
      const user = res.payload.user;
      if (user.isLogined) {
        const current = userStore.activeUsers$.value;
        const exists = current.some((u) => u.login === user.login);
        if (!exists) {
          userStore.setActive([...current, user]);
        }
      }
    });

    this.client.on("USER_EXTERNAL_LOGOUT", (res) => {
      
      const user = res.payload.user;
      const updated = userStore.activeUsers$.value.filter(
        (u) => u.login !== user.login
      );
      userStore.setActive(updated);
    });
  }
}
