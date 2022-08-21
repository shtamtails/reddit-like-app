import { Vote } from "../model/endpoint";
import { Modal } from "./UI/Modal";

interface IVotersModal {
  currentPost: Vote[];
  handleCloseModal: () => void;
}

export const VotersModal: React.FC<IVotersModal> = ({ currentPost, handleCloseModal }) => {
  return (
    <>
      <Modal handleCloseModal={handleCloseModal} title="People who upvoted this post" height="600px">
        <>
          {currentPost &&
            currentPost?.map((vote) => {
              return (
                <div key={vote.id} className="voter w-full px-4 py-2 border-2 border-gray-100">
                  {vote.user.name || "Anonymous"}
                </div>
              );
            })}
        </>
      </Modal>
    </>
  );
};
