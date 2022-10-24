import { Comment } from "../contexts/PostsContext";
import { CommentComponent } from "./CommentComponent";
import { NewComment } from "./NewComment";
import styles from "../styles/components/CommentSection.module.scss";

type CommentSectionProps = {
  post_id: string;
  comments: Comment[];
};

export function CommentSection({ comments, post_id }: CommentSectionProps) {
  return (
    <div className={styles["container"]}>
      <NewComment post_id={post_id} />
      {comments?.map((comment) => (
        <CommentComponent key={comment.id} comment={comment} />
      ))}
    </div>
  );
}
