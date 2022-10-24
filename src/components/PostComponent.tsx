import Image from "next/image";
import DefaultImage from "../public/image-default.svg";
import { BiRepost } from "react-icons/bi";

import styles from "../styles/components/PostComponent.module.scss";
import { Post, usePosts } from "../contexts/PostsContext";
import { useUser } from "../contexts/UserContext";

type PostComponentProps = {
  post: Post;
};

export function PostComponent({ post }: PostComponentProps) {
  const { user, setUser } = useUser();
  const { posts, setPosts } = usePosts();

  function handleRepost(post: Post) {
    if (user) {
      const postsUpdated = [{ ...post, reposted_by: user }, ...posts];
      const postsAndUsersUpdated = postsUpdated.map((postUpdated) => {
        if (postUpdated.user.id === user.id) {
          return {
            ...postUpdated,
            user: {
              ...postUpdated.user,
              number_posts: postUpdated.user.number_posts + 1,
            },
          };
        }
        return postUpdated;
      });
      setPosts(postsAndUsersUpdated);
      setUser({ ...user, number_posts: user.number_posts + 1 });
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
                <button>
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
          </div>
        </div>
      </div>
    );
  }
  return <></>;
}
