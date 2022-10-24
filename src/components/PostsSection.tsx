import { usePosts } from "../contexts/PostsContext";
import { PostComponent } from "./PostComponent";

import styles from "../styles/components/PostsSection.module.scss";

export function PostsSection() {
  const { posts } = usePosts();
  return (
    <main className={styles["container"]}>
      <div className={styles["filter"]}>
        <label className={styles["switch"]}>
          <input type="checkbox" checked={true} onChange={() => {}} />
          <span className={`${styles["slider"]} ${styles["round"]}`}></span>
        </label>
        Only following
      </div>
      <PostComponent post={posts[0]} />
    </main>
  );
}
