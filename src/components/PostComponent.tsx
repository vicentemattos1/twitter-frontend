import Image from "next/image";
import DefaultImage from "../public/image-default.svg";
import { BiRepost } from "react-icons/bi";

import styles from "../styles/components/PostComponent.module.scss";
import { Post } from "../contexts/PostsContext";
import { useUser } from "../contexts/UserContext";

type PostComponentProps = {
  post: Post;
};

export function PostComponent({ post }: PostComponentProps) {
  const { user } = useUser();

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
                <strong>{post.user.username}</strong>
              </div>
            </div>
          </div>
          <span>{post.post_text}</span>
          <div style={{ marginTop: "1rem" }}>
            <button style={{ color: "var(--title)" }} onClick={() => {}}>
              <BiRepost size={20} />
            </button>
          </div>
        </div>
      </div>
    );
  }
  return <></>;
}
