import type { AppProps } from "next/app";
import { UserProvider } from "../contexts/UserContext";
import { Sidebar } from "../components/Sidebar";

import styles from "../styles/pages/Layout.module.scss";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <div className={styles["container"]}>
        <Sidebar />
        <Component {...pageProps} />
      </div>
    </UserProvider>
  );
}

export default MyApp;
