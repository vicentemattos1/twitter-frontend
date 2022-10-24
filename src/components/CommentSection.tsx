import Image from "next/image";
import { Comment } from "../contexts/PostsContext";
import { CommentComponent } from "./CommentComponent";
import styles from "../styles/components/CommentSection.module.scss";

type CommentSectionProps = {
  comments: Comment[];
};

export function CommentSection({ comments }: CommentSectionProps) {
  return (
    <div className={styles["container"]}>
      {comments?.map((comment) => (
        <CommentComponent key={comment.id} comment={comment} />
      ))}
    </div>
  );
}
