import Image from "next/image";
import { FormEvent, useState } from "react";
import { uuid } from "uuidv4";
import { Post, usePosts } from "../contexts/PostsContext";
import { useUser } from "../contexts/UserContext";

import styles from "../styles/components/NewPost.module.scss";
import { currentDateFormater } from "../utils/currentDateFormater";

export function NewPost() {
  const [newPostTextArea, setNewPostTextArea] = useState("");
  const { user, setUser } = useUser();
  const { posts, setPosts } = usePosts();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (user) {
      const newPost: Post = {
        id: { $oid: uuid() },
        user: {
          id: user.id,
          avatar_url:
            "https://avatars.githubusercontent.com/u/48080194?s=400&u=186f9e014dbd489912da4d1d5194e2b2137c0e52&v=4",
          date_joined: user.date_joined,
          following: false,
          number_posts: user.number_posts,
          username: user.username,
          num_followers: user.num_followers,
          num_following: user.num_following,
        },
        posted_at: currentDateFormater(),
        reposted_by: null,
        post_text: newPostTextArea,
      };
      const postsUpdated = [newPost, ...posts];
      const postsAndUsersUpdated = postsUpdated.map((postUpdated) => {
        if (postUpdated.user.id === user.id) {
          return {
            ...postUpdated,
            user: {
              ...postUpdated.user,
              number_posts: postUpdated.user.number_posts + 1,
            },
          };
        }
        return postUpdated;
      });
      setPosts(postsAndUsersUpdated);
      setUser({ ...user, number_posts: user.number_posts + 1 });
      setNewPostTextArea("");
    }
  }

  return (
    <div className={styles["container"]}>
      <Image
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
        />
        <button type="submit">Post</button>
      </form>
    </div>
  );
}
