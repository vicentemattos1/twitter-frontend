import { AiOutlineHome, AiOutlineUser } from "react-icons/ai"
import Link from "next/link"
import { useRouter } from "next/router"

import styles from "../styles/components/Sidebar.module.scss"

export function Sidebar() {
  const router = useRouter()
  return (
    <aside className={styles["container"]}>
      <h1>Posterr</h1>
      <nav>
        <ul>
          <li className={`${styles["nav_option"]} ${router.pathname.includes("/posts") && styles["active"]}`}>
            <AiOutlineHome size={20} />
            <Link href="/">Home</Link>
          </li>
          <li className={`${styles["nav_option"]} ${router.pathname.includes("/posts/profile") && styles["active"]}`}>
            <AiOutlineUser size={20} />
            <Link href="/posts/profile">Profile</Link>
          </li>
        </ul>
      </nav>
    </aside>
  )
}
