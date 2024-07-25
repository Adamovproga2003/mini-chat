import { Message } from "../types/Message";

export function compareCreationTime(a: Message, b: Message) {
  return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
}
