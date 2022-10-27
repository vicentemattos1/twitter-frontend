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
  searchInput: string;
  setSearchInput: (searchInput: string) => void;
};

type PostsProviderProps = {
  children: ReactNode;
};

const PostsContext = createContext({} as PostsContextData);

export function PostsProvider({ children }: PostsProviderProps) {
  const router = useRouter();
  const { page_name } = router.query;
  const [posts, setPosts] = useState<Post[]>([]);

  const [isFilterSelected, setIsFilterSelected] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const { setUserTodayPosts } = useUser();
  const { user } = useUser();

  function countTodayUserPosts(posts: Post[]) {
    if (user) {
      const count = posts.reduce((amount, post) => {
        let interactionCount = 0;
        // Checking only original posts
        if (post.user.id === user.id && !post.reposted_by) {
          interactionCount++;
        }
        // Counting reposts from user
        if (post.reposted_by?.user.id === user.id) {
          interactionCount++;
        }
        // Count comments from user
        if (!!post.comments) {
          interactionCount =
            interactionCount +
            post.comments.filter((comment) => comment.user.id === user.id)
              .length;
        }
        return amount + interactionCount;
      }, 0);
      setUserTodayPosts(count);
    }
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
            +new Date(date2.posted_at) - +new Date(date1.posted_at)
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
    if (page_name == "following") {
      setIsFilterSelected(true);
    } else {
      setIsFilterSelected(false);
    }
  }, [page_name]);

  return (
    <PostsContext.Provider
      value={{
        posts,
        setPosts,
        isFilterSelected,
        searchInput,
        setSearchInput,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
}

export function usePosts() {
  return useContext(PostsContext);
}
