import { useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useRef, useState } from "react";
import { CgSandClock } from "react-icons/cg";
import { GrSend } from "react-icons/gr";
import { TbMoodEmpty } from "react-icons/tb";
import io, { Socket } from "socket.io-client";
import { getMessages } from "../../../api/get-messages";
import { useAuth } from "../../../hooks/useAuth";
import { Message } from "../../../types/Message";
import { MessageComponent } from "../../components";
import styles from "./Main.module.scss";

const { VITE_SERVER_HOST, VITE_SERVER_PORT } = import.meta.env;

const Main = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const { isAuth, username } = useAuth();
  const [message, setMessage] = useState("");
  const socketRef = useRef<Socket | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const { isLoading } = useQuery({
    queryKey: ["getMessages"],
    queryFn: async () => {
      const messages = await getMessages();
      setMessages(messages);
    },
  });

  const handleSendMessage = () => {
    socketRef.current?.emit("sendMessage", { text: message });
    setMessage("");
  };

  const handleAddMessage = (message: Message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  const initializeSocket = useCallback(() => {
    if (socketRef.current) {
      socketRef.current.disconnect();
    }

    socketRef.current = io(`http://${VITE_SERVER_HOST}:${VITE_SERVER_PORT}`, {
      extraHeaders: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    socketRef.current.on("recMessage", handleAddMessage);
  }, []);

  useEffect(() => {
    initializeSocket();

    return () => {
      socketRef.current?.off("recMessage", handleAddMessage);
      socketRef.current?.disconnect();
    };
  }, [initializeSocket]);

  useEffect(() => {
    initializeSocket();
  }, [username, initializeSocket]);

  return (
    <main className={styles.main}>
      <div className={styles.main_wrapper}>
        <div className={styles.main_chatBox}>
          {isLoading && (
            <div className={styles["main_chatBox--empty"]}>
              <CgSandClock size={40} />
              <span>Loading...</span>
            </div>
          )}
          {!isLoading && messages.length === 0 && (
            <div className={styles["main_chatBox--empty"]}>
              <TbMoodEmpty size={40} />
              <span>Nobody chat on yet...</span>
            </div>
          )}
          {!isLoading &&
            messages.length > 0 &&
            messages.map((message) => (
              <MessageComponent key={message.id} message={message} />
            ))}
          <div ref={bottomRef} />
        </div>
        {isAuth && (
          <form className={styles.main_chatForm}>
            <input
              type="text"
              placeholder="Type your message..."
              className={styles.main_chatForm_input}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              maxLength={255}
            />
            <button type="button" onClick={handleSendMessage}>
              <GrSend />
            </button>
          </form>
        )}
      </div>
    </main>
  );
};

export default Main;
