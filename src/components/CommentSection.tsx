import { Comment } from "../contexts/PostsContext";
import { NewComment } from "./NewComment";
import styles from "../styles/components/CommentSection.module.scss";
import { PostModel } from "./PostModel";

type CommentSectionProps = {
  post_id: string;
  comments: Comment[];
};

export function CommentSection({ comments, post_id }: CommentSectionProps) {
  return (
    <div className={styles["container"]}>
      <NewComment post_id={post_id} />
      {comments?.map((comment) => (
        <PostModel
          key={comment.id}
          avatar_url={comment.user.avatar_url}
          text={comment.comment_text}
          user_id={comment.user.id}
          username={comment.user.username}
        />
      ))}
    </div>
  );
}
