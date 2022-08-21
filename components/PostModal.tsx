import { useMutation } from "@apollo/client";
import React, { FormEvent, useRef, useState } from "react";
import { ADD_POST } from "../queries/addPost";
import { readFromLocalStorage } from "../utils/localStorage";
import { Modal } from "./UI/Modal";

export const PostModal: React.FC<any> = ({ handleCloseModal }) => {
  const [addPost] = useMutation(ADD_POST);
  const [error, setError] = useState("");

  const descRef = useRef<HTMLInputElement>(null);
  const urlRef = useRef<HTMLInputElement>(null);

  const handleAddPost = (e: FormEvent) => {
    e.preventDefault();
    const token = readFromLocalStorage("token");
    if (token) {
      if (descRef.current?.value && urlRef.current?.value) {
        addPost({
          variables: {
            url: urlRef.current?.value,
            description: descRef.current?.value,
          },
        }).then(() => {
          handleCloseModal();
        });
      } else {
        setError("Please fill all fields");
      }
    } else {
      setError("Authentication required");
    }
  };

  return (
    <Modal handleCloseModal={handleCloseModal} title="New Post">
      <form onSubmit={handleAddPost}>
        <div className="text-xs font-bold text-red-600 text-center pb-3">{error && error}</div>
        <input
          placeholder="description"
          className=" p-4 mb-2 bg-gray-100 h-3 w-full border-2 border-gray-200"
          ref={descRef}
        />
        <input placeholder="url" className=" p-4 mb-2 bg-gray-100 h-3 w-full border-2 border-gray-200" ref={urlRef} />
        <button className="w-full mt-4 py-2 bg-gray-200" type="submit">
          Add post
        </button>
      </form>
    </Modal>
  );
};
