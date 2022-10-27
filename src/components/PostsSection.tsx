import { PostComponent } from "./PostComponent";
import { NewPost } from "./NewPost";
import { useRouter } from "next/router";
import { Post, usePosts } from "../contexts/PostsContext";

import styles from "../styles/components/PostsSection.module.scss";
import { CommentComponent } from "./CommentComponent";

export function PostsSection() {
  const router = useRouter();
  const { posts, isFilterSelected, searchInput } = usePosts();

  const postsData = searchInput
    ? posts.filter(
        (post) =>
          post.post_text.toLowerCase().includes(searchInput.toLowerCase()) &&
          !post.reposted_by
      )
    : [...posts];
  const commentsData = searchInput
    ? posts.flatMap((post) =>
        post.comments.filter((comment) =>
          comment.comment_text.toLowerCase().includes(searchInput.toLowerCase())
        )
      )
    : [];

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
      {!!postsData ? (
        postsData.map((post, idx) => {
          if (isFilterSelected) {
            if (post && post.user.following) {
              return <PostComponent post={post} key={idx} />;
            }
            return null;
          }
          return <PostComponent post={post} key={idx} />;
        })
      ) : (
        <div className={styles["no-posts-found"]}>
          <span>No posts found</span>
        </div>
      )}

      {commentsData &&
        commentsData.map((comment, idx) => (
          <CommentComponent key={idx} comment={comment} />
        ))}
    </main>
  );
}
