import Image from "next/image"
import { useRouter } from "next/router"
import Modal from "react-modal"
import { User, useUser } from "../contexts/UserContext"
import { PostComponent } from "./PostComponent"
import styles from "../styles/components/ProfileModal.module.scss"
import { Post, usePosts } from "../contexts/PostsContext"
import { useState, useEffect } from "react"
import { AiOutlineCloseCircle } from "react-icons/ai"
import { currentDateFormater } from "../utils/currentDateFormater"
import { NewPost } from "./NewPost"
import Link from "next/link"
import { PostModel } from "./PostModel"

type ProfileModalProps = {
  isOpen: boolean
  user_id?: string
}

export function ProfileModal({ isOpen, user_id }: ProfileModalProps) {
  const router = useRouter()
  const { user, setUser } = useUser()
  const { posts, setPosts } = usePosts()
  const [userData, setUserData] = useState<User>({} as User)

  const comments = posts.flatMap((post) => post.comments.filter((comment) => comment.user.id === userData.id))

  function handleUnfollow(id: string) {
    const updatedPosts: Post[] = posts.map((post) =>
      post.user.id === id ? { ...post, user: { ...post.user, following: false } } : post,
    )
    if (updatedPosts && user) {
      setPosts([...updatedPosts])
      setUser({ ...user, num_following: user.num_following - 1 })
    }
  }

  function handleFollow(id: string) {
    const updatedPosts: Post[] = posts.map((post) =>
      post.user.id === id ? { ...post, user: { ...post.user, following: true } } : post,
    )
    if (updatedPosts && user) {
      setPosts([...updatedPosts])
      setUser({ ...user, num_following: user.num_following + 1 })
    }
  }

  useEffect(() => {
    if (router.asPath === "/posts/profile" && user) {
      setUserData(user)
    } else {
      const data = posts.find((post) => post.user.id === user_id)
      if (data) {
        setUserData(data.user)
      }
    }
  }, [router.asPath, user, posts, user_id])
  return (
    <Modal
      style={{
        content: {
          height: "70%",
          width: "70%",
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
        },
        overlay: { background: "var(=-gray-line)" },
      }}
      isOpen={isOpen}
      onRequestClose={() => router.back()}
    >
      <Link href="/posts" className={styles["close-btn"]}>
        <AiOutlineCloseCircle size={28} />
      </Link>
      <main className={styles["container"]}>
        {posts.find((post) => post.user.id === userData.id) || userData.id === user?.id ? (
          <>
            <div className={styles["profile-info"]}>
              {userData && userData.avatar_url && (
                <Image
                  src={userData.avatar_url}
                  unoptimized
                  width={100}
                  height={100}
                  className={styles["image"]}
                  alt="Vicente Mattos"
                />
              )}
              <div>
                <div className={styles["profile-btn"]}>
                  <strong>{userData.username?.slice(0, 14)}</strong>
                  {userData.id !== user?.id ? (
                    userData.following ? (
                      <button className={styles["following"]} onClick={() => handleUnfollow(userData.id)}>
                        <span>Following</span>
                      </button>
                    ) : (
                      <button onClick={() => handleFollow(userData.id)}>+ Follow</button>
                    )
                  ) : null}
                </div>
                <div>
                  <span>
                    Number of posts:{" "}
                    {posts.reduce((amount, post) => {
                      let interactionCount = 0
                      // Checking only original posts
                      if (post.user.id === userData.id) {
                        interactionCount++
                      }
                      // Count comments from user
                      if (!!post.comments) {
                        interactionCount =
                          interactionCount + post.comments.filter((comment) => comment.user.id === userData.id).length
                      }
                      return amount + interactionCount
                    }, 0)}
                  </span>
                  <span>Following: {userData.num_following}</span>
                  <span>Followers: {userData.num_followers}</span>
                </div>
                <span>Joined at: {currentDateFormater(userData.date_joined)}</span>
              </div>
            </div>

            {(!router.query.user_id || router.query.user_id === user?.id) && <NewPost />}

            {posts.map((post, index) => {
              if (post.user.id === userData.id || post.repost?.user.id === userData.id) {
                return <PostComponent key={index} post={post} />
              }
              return
            })}
            {comments.map((comment, index) => (
              <PostModel
                key={index}
                avatar_url={comment.user.avatar_url}
                text={comment.comment_text}
                user_id={comment.user.id}
                username={comment.user.username}
              />
            ))}
          </>
        ) : (
          <strong className={styles["user-not-found"]}>
            <AiOutlineCloseCircle size={100} />
            User does not exist
          </strong>
        )}
      </main>
    </Modal>
  )
}
