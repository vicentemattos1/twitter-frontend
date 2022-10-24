import Image from "next/image";
import { FormEvent, useState } from "react";
import { uuid } from "uuidv4";
import { Post, usePosts } from "../contexts/PostsContext";
import { useUser } from "../contexts/UserContext";

import styles from "../styles/components/NewComment.module.scss";
import { currentDateFormater } from "../utils/currentDateFormater";

export function NewComment() {
  const [newCommentTextArea, setNewCommentTextArea] = useState("");
  const { user } = useUser();
  const { posts, setPosts } = usePosts();
  const commentMaxCaracteres = 140;

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (user && newCommentTextArea.length <= commentMaxCaracteres) {
      const newPost: Post = {
        id: uuid(),
        user: {
          id: user.id,
          avatar_url:
            "https://avatars.githubusercontent.com/u/48080194?s=400&u=186f9e014dbd489912da4d1d5194e2b2137c0e52&v=4",
          date_joined: user.date_joined,
          following: false,
          username: user.username,
          num_followers: user.num_followers,
          num_following: user.num_following,
        },
        posted_at: currentDateFormater(),
        reposted_by: null,
        post_text: newCommentTextArea,
        comments: [],
      };
      const postsUpdated = [newPost, ...posts];
      setPosts(postsUpdated);
      setNewCommentTextArea("");
    }
  }
  const hasError = newCommentTextArea.length > commentMaxCaracteres;

  return (
    <div
      className={`${styles["container"]} ${
        hasError && styles["container_active"]
      }`}
    >
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="What are you thinking?"
          rows={6}
          name="textarea"
          value={newCommentTextArea}
          onChange={(e) => setNewCommentTextArea(e.target.value)}
          className={hasError ? styles["active"] : ""}
        />
        <div>
          <span className={hasError ? styles["active"] : ""}>
            {`${newCommentTextArea.length}/${commentMaxCaracteres}`}
          </span>
          <button type="submit">Comment</button>
        </div>
      </form>
    </div>
  );
}