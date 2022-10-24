import Image from "next/image";
import { useState } from "react";

import styles from "../styles/components/NewPost.module.scss";

export function NewPost() {
  const [newPostTextArea, setNewPostTextArea] = useState("");

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
      <form onSubmit={() => {}}>
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
