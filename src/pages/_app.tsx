import type { AppProps } from "next/app";
import { UserProvider } from "../contexts/UserContext";
import { PostsProvider } from "../contexts/PostsContext";
import { Sidebar } from "../components/Sidebar";

import styles from "../styles/pages/Layout.module.scss";
import "../styles/globals.scss";

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
