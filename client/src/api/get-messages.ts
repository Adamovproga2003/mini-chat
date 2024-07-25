import { Message } from "../types/Message";
import { compareCreationTime } from "../utils/compare-dates";

export const getMessages = async (): Promise<Message[]> => {
  const { VITE_SERVER_HOST, VITE_SERVER_PORT } = import.meta.env;

  return new Promise<Message[]>((resolve, reject) => {
    fetch(`http://${VITE_SERVER_HOST}:${VITE_SERVER_PORT}/api/chat`)
      .then((response) => response.json())
      .then((data: Message[]) => {
        resolve(data.sort(compareCreationTime));
      })
      .catch((err) => reject(new Error(err.message)));
  });
};
