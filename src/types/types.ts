export interface Car {
  id: number;
  name: string;
  color: string;
}

export type Winner = {
  id: number;
  wins: number;
  time: number;
};

export type Id = {
  id: number;
};

export type CarEngineOptions = {
  id: number;
  status: "started" | "stopped";
};

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

export function isId(detail: unknown): detail is Id {
  return (
    typeof detail === "object" &&
    detail !== null &&
    "id" in detail &&
    typeof detail.id === "number"
  );
}

export function isCarEngineOptions(
  detail: unknown,
): detail is CarEngineOptions {
  return (
    typeof detail === "object" &&
    detail !== null &&
    "id" in detail &&
    typeof detail.id === "number" &&
    "status" in detail &&
    (detail.status === "started" || detail.status === "stopped")
  );
}
