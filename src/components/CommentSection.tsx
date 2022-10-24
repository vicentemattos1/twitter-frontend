import Image from "next/image";
import { Comment } from "../contexts/PostsContext";
import styles from "../styles/components/CommentSection.module.scss";
import { CommentComponent } from "./CommentComponent";

type CommentSectionProps = {
  comments: Comment[];
};

export function CommentSection({ comments }: CommentSectionProps) {
  console.log(comments);
  return (
    <div className={styles["container"]}>
      {comments?.map((comment) => (
        <CommentComponent key={comment.id} comment={comment} />
      ))}
    </div>
  );
}
