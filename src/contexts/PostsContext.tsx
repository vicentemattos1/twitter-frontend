import { useRouter } from "next/router";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import posts_mock from "../public/posts_mock.json";
import { currentDateFormater } from "../utils/currentDateFormater";
import { User, useUser } from "./UserContext";

export type Post = {
  id: string;
  user: User;
  post_text: string;
  posted_at: string;
  reposted_by: Repost | null;
  comments: Comment[];
};

type Repost = {
  user: User;
  reposted_at: string;
};

export type Comment = {
  id: string;
  user: User;
  comment_text: string;
  commented_at: string;
};

type PostsContextData = {
  posts: Post[];
  setPosts: (posts: Post[]) => void;
  isFilterSelected: boolean;
};

type PostsProviderProps = {
  children: ReactNode;
};

const PostsContext = createContext({} as PostsContextData);

export function PostsProvider({ children }: PostsProviderProps) {
  const router = useRouter();
  const { page_id } = router.query;
  const [posts, setPosts] = useState<Post[]>([]);
  const [isFilterSelected, setIsFilterSelected] = useState(false);
  const { setUserTodayPosts } = useUser();
  const { user } = useUser();

  function countTodayUserPosts(posts: Post[]) {
    const count = posts.reduce((amount, post) => {
      if (user) {
        if (
          post.user.id === user.id &&
          post.posted_at === currentDateFormater()
        ) {
          return amount + 1;
        } else if (
          post.reposted_by &&
          post.reposted_by.user &&
          post.reposted_by.user.id === user.id &&
          post.reposted_by.reposted_at === currentDateFormater()
        ) {
          return amount + 1;
        } else if (post.comments.length > 0) {
          return (
            amount +
            post.comments.filter(
              (comment) =>
                comment.user.id === user.id &&
                comment.commented_at === currentDateFormater()
            ).length
          );
        }
      }
      return amount;
    }, 0);
    setUserTodayPosts(count);
  }

  useEffect(() => {
    if (!!(posts.length > 0)) {
      localStorage.setItem("posts", JSON.stringify(posts));
      countTodayUserPosts(posts);
    } else {
      const postsLocalStorage = localStorage.getItem("posts") || "";

      if (!postsLocalStorage) {
        const postsInit: Post[] = posts_mock.sort(
          (date1, date2) =>
            +new Date(date1.posted_at) - +new Date(date2.posted_at)
        );
        localStorage.setItem("posts", JSON.stringify(postsInit));
        setPosts(postsInit);
        countTodayUserPosts(postsInit);
      } else {
        const localStoragePosts = JSON.parse(postsLocalStorage);
        setPosts(localStoragePosts);
        countTodayUserPosts(localStoragePosts);
      }
    }
  }, [posts]);

  useEffect(() => {
    if (page_id == "following") {
      setIsFilterSelected(true);
    } else {
      setIsFilterSelected(false);
    }
  }, [page_id]);

  return (
    <PostsContext.Provider
      value={{
        posts,
        setPosts,
        isFilterSelected,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
}

export function usePosts() {
  return useContext(PostsContext);
}
