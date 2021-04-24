import { ServerMessage } from "@/types/message";

export interface Room {
  name: string;
  messages: ServerMessage[];
}
