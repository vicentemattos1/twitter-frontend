import Image from "next/image";
import { useState } from "react";
import DefaultImage from "../public/image-default.svg";
import { BiRepost } from "react-icons/bi";
import { FaRegCommentDots } from "react-icons/fa";

import { Post, usePosts } from "../contexts/PostsContext";
import { useUser } from "../contexts/UserContext";
import { useRouter } from "next/router";
import { CommentSection } from "./CommentSection";

import styles from "../styles/components/PostComponent.module.scss";
import { currentDateFormater } from "../utils/currentDateFormater";
import Link from "next/link";

type PostComponentProps = {
  post: Post;
};

export function PostComponent({ post }: PostComponentProps) {
  const router = useRouter();
  const { user, userCanPost } = useUser();
  const { posts, setPosts } = usePosts();
  const [showComments, setShowComments] = useState(false);

  function handleRepost(post: Post) {
    if (user && userCanPost()) {
      const postsUpdated = [
        { ...post, reposted_by: { user, reposted_at: currentDateFormater() } },
        ...posts,
      ];

      setPosts(postsUpdated);
    }
  }

  if (post && post.user && user) {
    return (
      <div className={styles["container"]}>
        <Image
          unoptimized
          width={50}
          height={50}
          loader={() => post.user.avatar_url || DefaultImage}
          src={post.user.avatar_url || DefaultImage}
          alt="User image"
        />
        <div>
          <div>
            <Link href={`/posts/profile/${post.user.id}`}>
              <a>
                <strong>{post.user.username}</strong>
              </a>
            </Link>
            {post.reposted_by?.user?.username && (
              <span> Reposted by: {post.reposted_by?.user.username}</span>
            )}
          </div>
          <span className={styles["post-text"]}>{post.post_text}</span>
          <div className={styles["options"]}>
            <button onClick={() => handleRepost(post)}>
              <BiRepost size={20} />
            </button>
            <button onClick={() => setShowComments(!showComments)}>
              <span>{post.comments.length}</span>
              <FaRegCommentDots size={20} />
            </button>
          </div>
          {showComments && (
            <CommentSection comments={post.comments} post_id={post.id} />
          )}
        </div>
      </div>
    );
  }
  return <></>;
}
