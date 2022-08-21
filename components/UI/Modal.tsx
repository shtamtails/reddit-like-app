import { useRef } from "react";
import { useClickOutside } from "../../hooks/useClickOutside";

interface IModalProps {
  title: string;
  handleCloseModal: () => void;
  children: JSX.Element;
  height?: string;
}
export const Modal: React.FC<IModalProps> = ({ title, children, handleCloseModal, height }) => {
  const modalRef = useRef(null);
  useClickOutside(modalRef, () => {
    handleCloseModal();
  });
  return (
    <div className="overlay fixed left-0 top-0 z-10 h-full w-full bg-black bg-opacity-50 flex justify-center">
      <div ref={modalRef} className="modal absolute bg-white mt-32 w-1/3" style={{ height: height }}>
        <div className="modal-header border-2 border-gray-400-500 p-4 flex justify-between">
          <div className="header-title">{title}</div>
          <div className="header-close cursor-pointer" onClick={handleCloseModal}>
            X
          </div>
        </div>
        <div className="modal-body overflow-y-scroll relative h-full bg-white p-4">{children}</div>
      </div>
    </div>
  );
};
