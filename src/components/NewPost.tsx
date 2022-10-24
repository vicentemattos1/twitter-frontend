import Image from "next/image";
import { FormEvent, useState } from "react";
import { uuid } from "uuidv4";
import { Post, usePosts } from "../contexts/PostsContext";
import { useUser } from "../contexts/UserContext";

import styles from "../styles/components/NewPost.module.scss";
import { currentDateFormater } from "../utils/currentDateFormater";

export function NewPost() {
  const [newPostTextArea, setNewPostTextArea] = useState("");
  const { user } = useUser();
  const { posts, setPosts } = usePosts();
  const postMaxCaracteres = 777;

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (user && newPostTextArea.length <= postMaxCaracteres) {
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
        post_text: newPostTextArea,
        comments: [],
      };
      const postsUpdated = [newPost, ...posts];
      setPosts(postsUpdated);
      setNewPostTextArea("");
    }
  }

  return (
    <div className={styles["container"]}>
      <Image
        unoptimized
        width={50}
        height={50}
        loader={() =>
          "https://avatars.githubusercontent.com/u/48080194?s=400&u=186f9e014dbd489912da4d1d5194e2b2137c0e52&v=4"
        }
        src="https://avatars.githubusercontent.com/u/48080194?s=400&u=186f9e014dbd489912da4d1d5194e2b2137c0e52&v=4"
        alt="User image"
      />
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="What are you thinking?"
          rows={6}
          name="textarea"
          value={newPostTextArea}
          onChange={(e) => setNewPostTextArea(e.target.value)}
          className={
            newPostTextArea.length > postMaxCaracteres ? styles["active"] : ""
          }
        />
        <div>
          <span
            className={
              newPostTextArea.length > postMaxCaracteres ? styles["active"] : ""
            }
          >
            {`${newPostTextArea.length}/${postMaxCaracteres}`}
          </span>
          <button type="submit">Post</button>
        </div>
      </form>
    </div>
  );
}
