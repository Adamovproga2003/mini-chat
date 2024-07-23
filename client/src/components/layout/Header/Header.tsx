import { useState } from "react";
import Modal from "../../core/Modal/Modal";
import { LoginForm, SignUpForm } from "../../forms";
import styles from "./Header.module.scss";
type Props = {};

enum Form {
  LOGIN,
  SIGN_UP,
}

const Header = () => {
  const [form, setForm] = useState<Form | null>(null);
  return (
    <header className={styles.header}>
      <div className={styles.header_logo}>MiniChat</div>
      <div className={styles.header_actions}>
        <button onClick={() => setForm(Form.LOGIN)}>Login</button>
        <button onClick={() => setForm(Form.SIGN_UP)}>Sign up</button>
      </div>
      <Modal
        handleClose={() => setForm(null)}
        isOpen={form !== null}
        hasButtonClose={true}
      >
        {form === Form.LOGIN && <LoginForm />}
        {form === Form.SIGN_UP && <SignUpForm />}
      </Modal>
    </header>
  );
};

export default Header;
