import { Link } from "../model/endpoint";
import { useEffect, useState } from "react";
import { Post } from "../components/Post";
import { Layout } from "../components/Layout";
import { GET_PAGINATED_LINKS, IGetLinks } from "../queries/getPaginatedLinks";
import { PostModal } from "../components/PostModal";
import { useSubscription } from "@apollo/client";
import { SUBSCRIBE_TO_POSTS } from "../queries/subscribeToPosts";

export default function Index({ data }: any) {
  const [postModal, setPostModal] = useState(false);

  const [postsToSkip, setPostsToSkip] = useState(10);
  const [posts, setPosts] = useState<Link[] | null>(data.feed.links);

  const fetchMore = async ({ take, skip }: IGetLinks) => {
    const { data } = await GET_PAGINATED_LINKS({ take, skip });
    setPostsToSkip(postsToSkip + 10);
    const newPosts = data.feed.links;
    posts && setPosts([...posts, ...newPosts]);
  };

  useEffect(() => {
    document.addEventListener("scroll", scrollHandler);
    return () => document.removeEventListener("scroll", scrollHandler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [posts]);

  const scrollHandler = (e: any) => {
    if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100) {
      fetchMore({ take: 10, skip: postsToSkip });
    }
  };

  const handleOpenModal = () => {
    setPostModal(true);
  };

  const handleCloseModal = () => {
    setPostModal(false);
  };

  /**
   * SUBSCRIPTION FOR SOME REASON DOES NOT WORK! {@link SUBSCRIBE_TO_POSTS}
   */
  const { data: newPosts, loading } = useSubscription(SUBSCRIBE_TO_POSTS, {
    onSubscriptionData: (data) => {
      console.log(data);
    },
  });

  return (
    <Layout>
      <>
        {postModal && <PostModal handleCloseModal={handleCloseModal} />}
        <div className="container flex flex-col justify-center items-center">
          <button onClick={handleOpenModal} className="bg-black text-white py-2 px-4 mt-3">
            New Post
          </button>
          {posts?.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </div>
      </>
    </Layout>
  );
}

export const getStaticProps = async () => {
  const { data } = await GET_PAGINATED_LINKS({ take: 10, skip: 0 });
  return {
    props: {
      data,
    },
  };
};
