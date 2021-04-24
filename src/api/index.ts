import { ServerMessage, Settings } from "@/types";

const apiUrl = process.env.VUE_APP_API_URL;
console.log(apiUrl);

// Настройки сервера
export const getSettings = async (): Promise<Settings> => {
  const resp = await fetch(apiUrl + "api/settings");
  const { result } = (await resp.json()) as { result: Settings };
  return result;
};

interface RoomsResponse {
  name: string;
  last_message: ServerMessage;
}
// Список всех комнат
export const getRooms = async (): Promise<RoomsResponse[]> => {
  const resp = await fetch(apiUrl + "api/rooms");
  const { result } = (await resp.json()) as { result: RoomsResponse[] };
  return result;
};

// История сообщений комнаты
export const getRoomHistory = async (
  roomName: string
): Promise<ServerMessage[]> => {
  const resp = await fetch(apiUrl + `api/rooms/${roomName}/history`);
  const { result } = (await resp.json()) as { result: ServerMessage[] };
  return result;
};
