type Listener<T> = (value: T) => void;

export class EventEmitter<T> {
  protected listeners: Set<Listener<T>> = new Set();

  public emit(value: T): void {
    for (const listener of this.listeners) {
      listener(value);
    }
  }

  public subscribe(listener: Listener<T>): () => void {
    console.log("subscribing");
    this.listeners.add(listener);
    return this.unsubscribe.bind(this, listener);
  }

  public unsubscribe(listener: Listener<T>): void {
    console.log("Unsubscribing");
    this.listeners.delete(listener);
  }
}
