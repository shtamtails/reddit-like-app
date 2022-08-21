import React, { useEffect, useState } from "react";
import { deleteFromLocalStorage, readFromLocalStorage } from "../utils/localStorage";
import { LoginModal } from "./LoginModal";

interface ILayoutProps {
  children: JSX.Element;
}

export const Layout: React.FC<ILayoutProps> = ({ children }) => {
  const [username, setUsername] = useState(null);

  useEffect(() => {
    setUsername(readFromLocalStorage("name"));
  }, []);

  const [modal, setModal] = useState(false);

  const handleOpenModal = () => {
    setModal(true);
  };

  const handleCloseModal = () => {
    setModal(false);
  };

  const handleLogout = () => {
    deleteFromLocalStorage("name");
    deleteFromLocalStorage("token");
    window.location.reload();
  };

  return (
    <>
      {modal && <LoginModal handleCloseModal={handleCloseModal} />}
      <header className="bg-gray-100 h-16 flex items-center justify-end px-4">
        <div className="login-btn cursor-pointer" onClick={!username ? handleOpenModal : handleLogout}>
          {!username ? <>Login / Register</> : <>{username}</>}
        </div>
      </header>
      <div className="flex full justify-center items-center">{children}</div>
    </>
  );
};
