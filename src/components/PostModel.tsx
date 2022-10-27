import { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import DefaultImage from "../public/image-default.svg";

import styles from "../styles/components/PostModel.module.scss";
import { BiRepost } from "react-icons/bi";

type PostModelProps = {
  user_id: string;
  avatar_url: string;
  username: string;
  text: string;
  reposted_by?: string;
  children?: ReactNode;
};

export function PostModel({
  user_id,
  avatar_url,
  text,
  username,
  reposted_by,
  children,
}: PostModelProps) {
  return (
    <div className={styles["container"]}>
      <Image
        unoptimized
        width={50}
        height={50}
        loader={() => avatar_url || DefaultImage}
        src={avatar_url || DefaultImage}
        alt="User image"
      />
      <div>
        <header className={styles["post-header"]}>
          <Link href={`/posts/profile/${user_id}`}>
            <a>
              <strong>{username}</strong>
            </a>
          </Link>
          {reposted_by && (
            <span className={styles["reply"]}>
              <BiRepost size={12} /> {reposted_by}
            </span>
          )}
        </header>
        <span className={styles["post-text"]}>{text}</span>

        {children}
      </div>
    </div>
  );
}
