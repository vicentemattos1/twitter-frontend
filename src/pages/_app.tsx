import "../styles/globals.scss";
import type { AppProps } from "next/app";

import styles from "../styles/pages/Layout.module.scss";
import { Sidebar } from "../components/Sidebar";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={styles["container"]}>
      <Sidebar />
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
