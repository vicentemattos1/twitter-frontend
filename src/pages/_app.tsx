import type { AppProps } from "next/app";
import { UserProvider } from "../contexts/UserContext";
import { PostsProvider } from "../contexts/PostsContext";
import Modal from "react-modal";
import { Sidebar } from "../components/Sidebar";

import styles from "../styles/pages/Layout.module.scss";
import "../styles/globals.scss";

Modal.setAppElement("#__next");

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <PostsProvider>
        <div className={styles["container"]}>
          <Sidebar />
          <Component {...pageProps} />
        </div>
      </PostsProvider>
    </UserProvider>
  );
}

export default MyApp;
