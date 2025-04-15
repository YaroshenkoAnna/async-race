
export type WSMessage = {
  id: string | null;
  type: string;
  payload: any;
};