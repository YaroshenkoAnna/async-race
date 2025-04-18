import { Observable } from "../core/observable";
import { DEFAULT_SERVER_URL } from "./constants";
import { WSMessage } from "./types";

export class SocketClient {
  private socket: WebSocket | null = null;
  public isConnected$ = new Observable<boolean>(false);

  private messageListeners = new Map<string, ((msg: WSMessage) => void)[]>();

  constructor(private url = DEFAULT_SERVER_URL) {
    this.connect();
  }

  private connect() {
    this.socket = new WebSocket(this.url);

    this.socket.addEventListener("open", () => {
      console.log("WebSocket opened", new Date());
      this.isConnected$.set(true);
    });

    this.socket.addEventListener("close", () => {

      this.isConnected$.set(false);
      setTimeout(() => this.connect(), 5000);
    });

    this.socket.addEventListener("error", (event) => {
      console.error("WebSocket error:", event);
    });

    this.socket.addEventListener("message", (event) => {
      const msg: WSMessage = JSON.parse(event.data);
      this.messageListeners.get(msg.type)?.forEach((cb) => cb(msg));
    });
  }

  public send(message: WSMessage) {
    this.socket?.send(JSON.stringify(message));
  }

  public on(type: string, callback: (msg: WSMessage) => void): () => void {
    if (!this.messageListeners.has(type)) {
      this.messageListeners.set(type, []);
    }
    this.messageListeners.get(type)!.push(callback);

    return () => {
      const listeners = this.messageListeners.get(type)!;
      this.messageListeners.set(
        type,
        listeners.filter((l) => l !== callback)
      );
    };
  }
}
