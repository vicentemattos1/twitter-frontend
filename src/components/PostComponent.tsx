import Image from "next/image";
import DefaultImage from "../public/image-default.svg";
import { BiRepost } from "react-icons/bi";
import { FaRegCommentDots } from "react-icons/fa";

import { Post, usePosts } from "../contexts/PostsContext";
import { useUser } from "../contexts/UserContext";
import { useRouter } from "next/router";
import { CommentSection } from "./CommentSection";

import styles from "../styles/components/PostComponent.module.scss";

type PostComponentProps = {
  post: Post;
};

export function PostComponent({ post }: PostComponentProps) {
  const router = useRouter();
  const { user, setUser } = useUser();
  const { posts, setPosts } = usePosts();

  function handleRepost(post: Post) {
    if (user) {
      const postsUpdated = [{ ...post, reposted_by: user }, ...posts];

      setPosts(postsUpdated);
    }
  }

  if (post && post.user && user) {
    return (
      <div className={styles["container"]}>
        <Image
          width={50}
          height={50}
          loader={() => post.user.avatar_url || DefaultImage}
          src={post.user.avatar_url || DefaultImage}
          alt="User image"
        />
        <div>
          <div>
            <div>
              <div>
                <button onClick={() => router.push(`/profile/${post.user.id}`)}>
                  <strong>{post.user.username}</strong>
                  {post.reposted_by?.username && (
                    <span> Reposted by: {post.reposted_by?.username}</span>
                  )}
                </button>
              </div>
            </div>
          </div>
          <span>{post.post_text}</span>
          <div style={{ marginTop: "1rem" }}>
            <button
              style={{ color: "var(--title)" }}
              onClick={() => handleRepost(post)}
            >
              <BiRepost size={20} />
            </button>
            <button style={{ color: "var(--title)" }}>
              <FaRegCommentDots size={20} />
            </button>
          </div>
          <CommentSection comments={post.comments} />
        </div>
      </div>
    );
  }
  return <></>;
}
