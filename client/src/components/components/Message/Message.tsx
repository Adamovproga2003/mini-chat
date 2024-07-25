import { format } from "date-fns";
import { useAuth } from "../../../hooks/useAuth";
import { Message } from "../../../types/Message";
import styles from "./Message.module.scss";

type Props = {
  message: Message;
};

const MessageComponent = ({ message }: Props) => {
  const { username } = useAuth();

  return (
    <div
      style={{
        alignSelf: message.username === username ? "flex-start" : "flex-end",
      }}
      className={styles.messageBox}
    >
      <div
        style={{
          textAlign: message.username === username ? "left" : "right",
          display: "flex",
          gap: 5,
          flexDirection: message.username === username ? "row" : "row-reverse",
        }}
      >
        <span>{message.username}</span>
        <span className={styles.messageBox_createdTime}>
          {format(new Date(message.createdAt), "HH:mm")}
        </span>
      </div>
      <div
        className={styles.messageBox_message}
        style={{
          borderRadius:
            message.username === username
              ? "8px 8px 8px 0px"
              : "8px 8px 0px 8px",
          marginLeft: message.username === username ? "unset" : "auto",
        }}
      >
        <span>{message.text}</span>
      </div>
    </div>
  );
};

export default MessageComponent;
