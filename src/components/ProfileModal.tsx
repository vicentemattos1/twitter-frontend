import Image from "next/image";
import { useRouter } from "next/router";
import Modal from "react-modal";
import { User, useUser } from "../contexts/UserContext";
import { PostComponent } from "./PostComponent";
import styles from "../styles/components/ProfileModal.module.scss";
import { Post, usePosts } from "../contexts/PostsContext";
import { useState, useEffect } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { currentDateFormater } from "../utils/currentDateFormater";

type ProfileModalProps = {
  isOpen: boolean;
  user_id?: string;
};

export function ProfileModal({ isOpen, user_id }: ProfileModalProps) {
  const router = useRouter();
  const { user } = useUser();
  const { posts, setPosts } = usePosts();
  const [userData, setUserData] = useState<User>({} as User);

  function handleUnfollow(id: string) {
    const updatedPosts: Post[] = posts.map((post) =>
      post.user.id === id
        ? { ...post, user: { ...post.user, following: false } }
        : post
    );
    if (updatedPosts) {
      setPosts([...updatedPosts]);
    }
  }

  function handleFollow(id: string) {
    const updatedPosts: Post[] = posts.map((post) =>
      post.user.id === id
        ? { ...post, user: { ...post.user, following: true } }
        : post
    );
    setPosts([...updatedPosts]);
  }

  useEffect(() => {
    if (router.asPath === "/profile" && user) {
      setUserData(user);
    } else {
      const data = posts.find((post) => post.user.id === user_id);
      if (data) {
        setUserData(data.user);
      }
    }
  }, [router.asPath, user, posts, user_id]);

  return (
    <Modal
      style={{
        content: {
          height: "60%",
          width: "60%",
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
        },
        overlay: { background: "var(=-gray-line)" },
      }}
      isOpen={isOpen}
      onRequestClose={() => router.back()}
    >
      <button onClick={() => router.back()} className={styles["close-btn"]}>
        <AiOutlineCloseCircle size={28} />
      </button>
      <main className={styles["container"]}>
        <Image
          width={150}
          height={150}
          className={styles["image"]}
          src={userData.avatar_url}
          loader={() => userData.avatar_url}
          alt="Vicente Mattos"
        />
        <div className={styles["profile-btn"]}>
          <strong>{userData.username}</strong>
          {userData.id !== user?.id ? (
            userData.following ? (
              <button
                className={styles["following"]}
                onClick={() => handleUnfollow(userData.id)}
              >
                <span>Following</span>
              </button>
            ) : (
              <button onClick={() => handleFollow(userData.id)}>
                + Follow
              </button>
            )
          ) : null}
        </div>
        <div>
          <span>Following: {userData.num_following}</span>
          <span>Followers: {userData.num_followers}</span>
        </div>
        <span>Number of posts: {userData.number_posts}</span>
        <span>Joined at: {currentDateFormater(userData.date_joined)}</span>
        <div></div>
        {posts.map((post) => {
          if (post.user.id === userData.id) {
            return (
              <div
                key={post.id.$oid}
                style={{ display: "flex", width: "100%" }}
              >
                <PostComponent post={post} />
              </div>
            );
          }
          return;
        })}
      </main>
    </Modal>
  );
}
