import { FC, useEffect, useRef } from "react";
import { IoClose } from "react-icons/io5";
import { CSSTransition } from "react-transition-group";
import { Portal } from "..";

import "./Modal.scss";
type Props = {
  children: React.ReactNode;
  isOpen: boolean;
  hasButtonClose?: boolean;
  handleClose: () => void;
};

const Modal: FC<Props> = ({
  children,
  isOpen,
  handleClose,
  hasButtonClose = false,
}) => {
  const nodeRef = useRef(null);

  useEffect(() => {
    const closeOnEscapeKey = (e: KeyboardEvent) =>
      e.key === "Escape" ? handleClose() : null;
    document.body.addEventListener("keydown", closeOnEscapeKey);
    return () => {
      document.body.removeEventListener("keydown", closeOnEscapeKey);
    };
  }, [handleClose]);

  return (
    <Portal wrapperId="react-portal-modal-container">
      <CSSTransition
        in={isOpen}
        timeout={{ enter: 0, exit: 300 }}
        unmountOnExit
        classNames="modal"
        nodeRef={nodeRef}
      >
        <div className="modal" ref={nodeRef}>
          {children}
          {hasButtonClose && (
            <button className="close-button" onClick={handleClose}>
              <IoClose size={25} />
            </button>
          )}
        </div>
      </CSSTransition>
    </Portal>
  );
};

export default Modal;
