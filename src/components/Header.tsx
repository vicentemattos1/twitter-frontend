import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { usePosts } from "../contexts/PostsContext";
import styles from "../styles/components/Header.module.scss";

export function Header() {
  const { searchInput, setSearchInput } = usePosts();
  return (
    <header className={styles["container"]}>
      <div>
        <div className={styles["custom-input"]}>
          <AiOutlineSearch size={20} />
          <input
            type="text"
            value={searchInput}
            placeholder="Search..."
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
      </div>
    </header>
  );
}
