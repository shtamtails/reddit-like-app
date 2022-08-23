import { useMutation } from "@apollo/client";
import { ThumbUpIcon } from "@heroicons/react/outline";
import React, { useEffect, useState } from "react";
import { Link, Vote } from "../model/endpoint";
import { UPVOTE_POST } from "../queries/upvotePost";
import { readFromLocalStorage } from "../utils/localStorage";
import { Comments } from "./Comments";
import { VotersModal } from "./VotersModal";

interface IPostProps {
  post: Link;
}

export const Post: React.FC<IPostProps> = ({ post }) => {
  const [currentPost, setCurrentPost] = useState<Vote[] | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [upvoted, setUpvoted] = useState(false);
  const [upvote] = useMutation(UPVOTE_POST);

  const handleOpenModal = (vote: Vote[]) => {
    setModalVisible(true);
    setCurrentPost(vote);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setCurrentPost(null);
  };

  const handleUpvote = (e: React.MouseEvent<SVGSVGElement>, id: string) => {
    e.stopPropagation();
    const token = readFromLocalStorage("token");
    if (token) {
      upvote({
        variables: {
          linkId: id,
        },
      }).then(() => {
        setUpvoted(true);
      });
    } else {
      console.error("Authentication required!");
    }
  };

  /* Checking if the user has already voted for the post. */
  useEffect(() => {
    const username = readFromLocalStorage("name");
    const isVoted = !!post.votes.filter((vote) => vote.user.name === username)[0];
    isVoted && setUpvoted(true);
  }, []);

  return (
    <>
      {modalVisible && currentPost && <VotersModal currentPost={currentPost} handleCloseModal={handleCloseModal} />}
      <div
        className="post m-3 w-4/5 bg-white border-2 border-gray-400-500 rounded-sm"
        onClick={() => {
          handleOpenModal(post.votes);
        }}
      >
        <div className="post-main flex w-full">
          <div className="post-left h-full w-36 bg-gray-100 flex flex-col justify-start items-center">
            <div className="vote-btn py-3">
              <ThumbUpIcon
                width={21}
                onClick={(e) => {
                  handleUpvote(e, post.id);
                }}
                className="cursor-pointer"
                fill={upvoted ? "green" : "none"}
              />
            </div>
            <div className="votes text-sm text-green-600">{post.votes.length}</div>
            <div className="votes-people flex gap-2 py-2">
              {post.votes[0]?.user.name[0] && (
                <div className="people rounded-full bg-cyan-300 w-6 h-6 flex justify-center items-center text-xs text-white">
                  {post.votes[0]?.user.name[0].toUpperCase()}
                </div>
              )}
              {post.votes[1]?.user.name[0] && (
                <div className="people rounded-full bg-cyan-300 w-6 h-6 flex justify-center items-center text-xs text-white">
                  {post.votes[1]?.user.name[0].toUpperCase()}
                </div>
              )}
              {post.votes[2]?.user.name[0] && (
                <div className="people rounded-full bg-cyan-300 w-6 h-6 flex justify-center items-center text-xs text-white">
                  {post.votes[2]?.user.name[0].toUpperCase()}
                </div>
              )}
            </div>
            {post.votes.length > 3 && (
              <div className="more text-xs pb-2 text-center">and {post.votes.length - 3} more people</div>
            )}
          </div>
          <div className="post-right w-full flex px-4 items-center">
            <a href={`//${post.url}`} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}>
              {post.postedBy?.name} - {post.description}
            </a>
          </div>
        </div>
        <div className="post-comments flex flex-col bg-gray-100">
          <Comments />
        </div>
      </div>
    </>
  );
};
