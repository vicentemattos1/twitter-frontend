import { useState } from "react"
import { BiRepost } from "react-icons/bi"
import { FaRegCommentDots } from "react-icons/fa"

import { Post, usePosts } from "../contexts/PostsContext"
import { useUser } from "../contexts/UserContext"
import { CommentSection } from "./CommentSection"

import styles from "../styles/components/PostComponent.module.scss"
import { currentDateFormater } from "../utils/currentDateFormater"
import { PostModel } from "./PostModel"
import { uuid } from "uuidv4"
import Link from "next/link"

type PostComponentProps = {
  post: Post
}

export function PostComponent({ post }: PostComponentProps) {
  const { user, userCanPost } = useUser()
  const { posts, setPosts } = usePosts()
  const [showComments, setShowComments] = useState(false)

  function handleRepost(post: Post) {
    if (user && userCanPost()) {
      const postsUpdated = [
        {
          id: uuid(),
          user: user,
          post_text: "",
          posted_at: currentDateFormater(),
          repost: { user, post_id: post.id },
          comments: [],
        },
        ...posts,
      ]

      setPosts(postsUpdated)
    }
  }

  if (post && post.user) {
    if (post.repost) {
      const postReposted = posts.find((postData) => postData.id === post.repost?.post_id)
      if (!!postReposted && post.post_text) {
        return (
          <PostModel
            avatar_url={post.user.avatar_url}
            text={post.post_text}
            user_id={post.user.id}
            username={post.user.username}
          >
            <Link href={`/posts/${postReposted.id}`}>
              <a>
                <PostModel
                  avatar_url={postReposted.user.avatar_url}
                  text={postReposted.post_text}
                  user_id={postReposted.user.id}
                  username={postReposted.user.username}
                />
              </a>
            </Link>
            <div className={styles["container"]}>
              <div className={styles["options"]}>
                <button onClick={() => handleRepost(post)}>
                  <BiRepost size={20} />
                </button>
                <button onClick={() => setShowComments(!showComments)}>
                  <span>{post.comments.length}</span>
                  <FaRegCommentDots size={20} />
                </button>
              </div>
              {showComments && <CommentSection comments={post.comments} post_id={post.id} />}
            </div>
          </PostModel>
        )
      } else if (!!postReposted) {
        return (
          <PostModel
            avatar_url={postReposted.user.avatar_url}
            text={postReposted.post_text}
            user_id={postReposted.user.id}
            username={postReposted.user.username}
            reposted_by={post.user.username}
          >
            <div className={styles["container"]}>
              <div className={styles["options"]}>
                <button onClick={() => handleRepost(postReposted)}>
                  <BiRepost size={20} />
                </button>
                <button onClick={() => setShowComments(!showComments)}>
                  <span>{postReposted.comments.length}</span>
                  <FaRegCommentDots size={20} />
                </button>
              </div>
              {showComments && <CommentSection comments={postReposted.comments} post_id={postReposted.id} />}
            </div>
          </PostModel>
        )
      }
    }
    return (
      <PostModel
        avatar_url={post.user.avatar_url}
        text={post.post_text}
        user_id={post.user.id}
        username={post.user.username}
      >
        <div className={styles["container"]}>
          <div className={styles["options"]}>
            <button onClick={() => handleRepost(post)}>
              <BiRepost size={20} />
            </button>
            <button onClick={() => setShowComments(!showComments)}>
              <span>{post.comments.length}</span>
              <FaRegCommentDots size={20} />
            </button>
          </div>
          {showComments && <CommentSection comments={post.comments} post_id={post.id} />}
        </div>
      </PostModel>
    )
  }
  return <></>
}
