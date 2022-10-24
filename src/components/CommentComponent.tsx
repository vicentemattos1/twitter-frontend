import Image from "next/image";
import { useRouter } from "next/router";
import { Comment } from "../contexts/PostsContext";
import DefaultImage from "../public/image-default.svg";

import styles from "../styles/components/CommentComponent.module.module.scss";

type CommentComponentProps = {
  comment: Comment;
};

export function CommentComponent({ comment }: CommentComponentProps) {
  const router = useRouter();
  return (
    <div className={styles["container"]}>
      <Image
        width={50}
        height={50}
        loader={() => comment.user.avatar_url || DefaultImage}
        src={comment.user.avatar_url || DefaultImage}
        alt="User image"
      />
      <div>
        <div>
          <button onClick={() => router.push(`/profile/${comment.user.id}`)}>
            <strong>{comment.user.username}</strong>
          </button>
        </div>
        <span>{comment.comment_text}</span>
      </div>
    </div>
  );
}
