// Клиент отправляет сообщения такого формата
export interface ClientMessage {
  // название комнаты. Если такой комнаты нет, она будет создана
  room: string;
  // текст сообщения
  text: string;
  // необязательный идентификатор, можно назначить на клиенте, чтобы получить подтверждение получения сообщения сервером
  id?: string;
}

// Сервер отправляет сообщения такого формата
export interface ServerMessage {
  room: string;
  text: string;
  // если передан клиентом при отправке. Сам сервер этот id не назначает, не использует и не отдаёт в /history
  id?: string;
  // время создания сообщения
  created: string;
  // информация об отправителе
  sender: { username: string };
}
