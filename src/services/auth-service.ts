import { SocketClient } from "../network/socket-client";
import { createUniqueId } from "../network/helpers/create-unique-id";

export class AuthService {
  constructor(private client: SocketClient) {}

  public login(
    login: string,
    password: string
  ): Promise<{ login: string; isLogined: boolean }> {
    return new Promise((resolve, reject) => {
      const id = createUniqueId();
      const unsub = this.client.on("USER_LOGIN", (res) => {
        if (res.id === id) {
          unsub();
          resolve(res.payload.user);
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
        type: "USER_LOGIN",
        payload: {
          user: { login, password },
        },
      });
    });
  }

  public logout(
    login: string,
    password: string
  ): Promise<{ login: string; isLogined: boolean }> {
    return new Promise((resolve, reject) => {
      const id = createUniqueId();

      console.log("Logout request sent");

      const unsub = this.client.on("USER_LOGOUT", (res) => {
        if (res.id === id) {
          unsub();
          resolve(res.payload.user);
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
        type: "USER_LOGOUT",
        payload: {
          user: { login, password },
        },
      });
    });
  }
}
