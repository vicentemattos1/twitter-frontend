import { useRouter } from "next/router";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import posts_mock from "../public/posts_mock.json";
import { User } from "./UserContext";

export type Post = {
  id: string;
  user: User;
  post_text: string;
  posted_at: string;
  reposted_by?: User | null;
  comments: Comment[];
};

export type Comment = {
  id: string;
  user: User;
  comment_text: string;
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

  useEffect(() => {
    if (!!(posts.length > 0)) {
      localStorage.setItem("posts", JSON.stringify(posts));
    } else {
      const postsLocalStorage = localStorage.getItem("posts") || "";

      if (!postsLocalStorage) {
        const postsInit: Post[] = posts_mock.sort(
          (date1, date2) =>
            +new Date(date1.posted_at) - +new Date(date2.posted_at)
        );
        localStorage.setItem("posts", JSON.stringify(postsInit));
        setPosts(postsInit);
      } else {
        setPosts(JSON.parse(postsLocalStorage));
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
