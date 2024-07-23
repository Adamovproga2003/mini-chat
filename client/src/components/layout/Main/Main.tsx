import { GrSend } from "react-icons/gr";
import { TbMoodEmpty } from "react-icons/tb";
import styles from "./Main.module.scss";

type Props = {};

const Main = (props: Props) => {
  const messages = [
    // {
    //   id: 1,
    //   sender: "Oleg adamov",
    //   text: "Hell",
    // },
  ];

  return (
    <main className={styles.main}>
      <div className={styles.main_wrapper}>
        <div className={styles.main_chatBox}>
          {messages.length === 0 && (
            <div className={styles["main_chatBox--empty"]}>
              <TbMoodEmpty size={40} />
              <span>Nobody chat on yet...</span>
            </div>
          )}
        </div>
        <form className={styles.main_chatForm}>
          <input
            type="text"
            placeholder="Type your message..."
            className={styles.main_chatForm_input}
          />
          <button type="submit">
            <GrSend />
          </button>
        </form>
      </div>
    </main>
  );
};

export default Main;
