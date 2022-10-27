import { PostComponent } from "./PostComponent";
import { NewPost } from "./NewPost";
import { useRouter } from "next/router";
import { Post, usePosts } from "../contexts/PostsContext";

import styles from "../styles/components/PostsSection.module.scss";
import { PostModel } from "./PostModel";
import Link from "next/link";

export function PostsSection() {
  const router = useRouter();
  const { page_name } = router.query;
  const { posts, isFilterSelected, searchInput } = usePosts();

  var allPosts: Post[] = [...posts];
  const unique_post = posts.find((post) => post.id === page_name);
  if (unique_post) {
    allPosts = [unique_post];
  }

  const postsData = searchInput
    ? posts.filter((post) =>
        post.post_text.toLowerCase().includes(searchInput.toLowerCase())
      )
    : allPosts;

  const commentsData = searchInput
    ? posts.flatMap((post) =>
        post.comments.filter((comment) =>
          comment.comment_text.toLowerCase().includes(searchInput.toLowerCase())
        )
      )
    : [];

  return (
    <main className={styles["container"]}>
      <NewPost />
      <Link href={isFilterSelected ? "/posts/all" : "/posts/following"}>
        <a className={styles["filter"]}>
          {isFilterSelected ? "Only following" : "All posts"}
          <label className={styles["switch"]}>
            <input type="checkbox" defaultChecked={isFilterSelected} />
            <span className={`${styles["slider"]} ${styles["round"]}`}></span>
          </label>
        </a>
      </Link>

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
          <PostModel
            key={idx}
            avatar_url={comment.user.avatar_url}
            text={comment.comment_text}
            user_id={comment.user.id}
            username={comment.user.username}
          />
        ))}
    </main>
  );
}
