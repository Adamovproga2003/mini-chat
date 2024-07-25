import { useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { Container } from "../../components";
import { Modal } from "../../core";
import { LoginForm, SignUpForm } from "../../forms";
import styles from "./Header.module.scss";

enum Form {
  LOGIN,
  SIGN_UP,
}

const Header = () => {
  const [form, setForm] = useState<Form | null>(null);
  const { isAuth, username, onChangeAuth, onChangeUsername } = useAuth();

  const handleClose = () => setForm(null);

  const logout = () => {
    onChangeAuth(false);
    onChangeUsername(null);
    localStorage.removeItem("token");
  };

  return (
    <header className={styles.header}>
      <Container className={styles.header_wrapper}>
        <div className={styles.header_logo}>MiniChat</div>
        <div className={styles.header_actions}>
          {isAuth ? (
            <div className={styles.header_actions_logOut}>
              <span>
                Hello, <b>{username}</b>
              </span>
              <button onClick={logout}>Logout</button>
            </div>
          ) : (
            <>
              <button onClick={() => setForm(Form.LOGIN)}>Login</button>
              <button onClick={() => setForm(Form.SIGN_UP)}>Sign up</button>
            </>
          )}
        </div>
        <Modal
          handleClose={handleClose}
          isOpen={form !== null}
          hasButtonClose={true}
        >
          {form === Form.LOGIN && <LoginForm handleClose={handleClose} />}
          {form === Form.SIGN_UP && <SignUpForm handleClose={handleClose} />}
        </Modal>
      </Container>
    </header>
  );
};

export default Header;
