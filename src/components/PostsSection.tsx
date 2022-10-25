import { PostComponent } from "./PostComponent";
import { NewPost } from "./NewPost";
import { useRouter } from "next/router";
import { usePosts } from "../contexts/PostsContext";

import styles from "../styles/components/PostsSection.module.scss";

export function PostsSection() {
  const router = useRouter();
  const { posts, isFilterSelected, searchInput } = usePosts();

  const postsData = searchInput
    ? posts.filter((post) => post.post_text.includes(searchInput))
    : [...posts];

  function handleOnChange() {
    if (isFilterSelected) {
      router.push("/posts/all");
    } else {
      router.push("/posts/following");
    }
  }

  return (
    <main className={styles["container"]}>
      <NewPost />
      <div className={styles["filter"]}>
        Only following
        <label className={styles["switch"]}>
          <input
            type="checkbox"
            checked={isFilterSelected}
            onChange={() => handleOnChange()}
          />
          <span className={`${styles["slider"]} ${styles["round"]}`}></span>
        </label>
      </div>
      {postsData.map((post, idx) => {
        if (isFilterSelected) {
          if (post && post.user.following) {
            return <PostComponent post={post} key={idx} />;
          }
          return null;
        }
        return <PostComponent post={post} key={idx} />;
      })}
    </main>
  );
}
