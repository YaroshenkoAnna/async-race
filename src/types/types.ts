export interface Car {
  id: number;
  name: string;
  color: string;
}

export function isCar(detail: unknown): detail is Car {
  return (
    typeof detail === "object" &&
    detail !== null &&
    "id" in detail &&
    typeof detail.id === "number" &&
    "name" in detail &&
    typeof detail.name === "string" &&
    "color" in detail &&
    typeof detail.color === "string"
  );
}
