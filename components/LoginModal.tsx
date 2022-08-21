import { useMutation } from "@apollo/client";
import React, { FormEvent, useRef, useState } from "react";
import { LOGIN } from "../queries/signIn";
import { REGISTER } from "../queries/signUp";
import { writeUser } from "../utils/writeUser";
import { Modal } from "./UI/Modal";

interface ILoginModalProps {
  handleCloseModal: () => void;
}

export const LoginModal: React.FC<ILoginModalProps> = ({ handleCloseModal }) => {
  const [login, { error: logError, loading: logLoading }] = useMutation(LOGIN);
  const [register, { error: regError, loading: regLoading }] = useMutation(REGISTER);
  const [error, setError] = useState<string>("");

  const loginEmail = useRef<HTMLInputElement>(null);
  const loginPassword = useRef<HTMLInputElement>(null);
  const registerName = useRef<HTMLInputElement>(null);
  const registerEmail = useRef<HTMLInputElement>(null);
  const registerPassword = useRef<HTMLInputElement>(null);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    if (loginEmail.current?.value && loginPassword.current?.value) {
      login({
        variables: {
          email: loginEmail.current?.value,
          password: loginPassword.current?.value,
        },
      }).then(({ data: { login: response } }) => {
        writeUser(response);
        handleCloseModal();
      });
    } else {
      setError("Please fill all fields");
    }
  };

  const handleRegister = (e: FormEvent) => {
    e.preventDefault();
    if (registerEmail.current?.value && registerEmail.current?.value && registerName.current?.value) {
      register({
        variables: {
          name: registerName.current?.value,
          email: registerEmail.current?.value,
          password: registerPassword.current?.value,
        },
      }).then(({ data: { signup: response } }) => {
        writeUser(response);
        handleCloseModal();
      });
    } else {
      setError("Please fill all fields");
    }
  };

  return (
    <>
      <Modal title="Login" handleCloseModal={handleCloseModal}>
        <>
          <div className="flex w-full justify-center items-center pb-2 text-red-500 font-bold text-sm">
            {error && error}
            {logError && logError.message}
            {regError && regError.message}
          </div>

          <form onSubmit={handleLogin}>
            <input
              placeholder="email"
              className=" p-4 mb-2 bg-gray-100 h-3 w-full border-2 border-gray-200"
              ref={loginEmail}
            />
            <input
              placeholder="password"
              className=" p-4 bg-gray-100 h-3 w-full border-2 border-gray-200"
              ref={loginPassword}
            />
            <button className="w-full mt-4 py-2 bg-gray-200" type="submit">
              {logLoading ? "Loading..." : "Sign In"}
            </button>
          </form>
          <div className="my-4 flex justify-center">OR</div>
          <form onSubmit={handleRegister}>
            <input
              placeholder="name"
              className=" p-4 mb-2 bg-gray-100 h-3 w-full border-2 border-gray-200"
              ref={registerName}
            />
            <input
              placeholder="email"
              className=" p-4 mb-2 bg-gray-100 h-3 w-full border-2 border-gray-200"
              ref={registerEmail}
            />
            <input
              placeholder="password"
              className=" p-4 bg-gray-100 h-3 w-full border-2 border-gray-200"
              ref={registerPassword}
            />
            <button className="w-full mt-4 py-2 bg-gray-200" type="submit">
              {regLoading ? "Loading..." : "Sign Up"}
            </button>
          </form>
        </>
      </Modal>
    </>
  );
};
