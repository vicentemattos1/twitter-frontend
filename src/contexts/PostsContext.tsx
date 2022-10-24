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
  id: Id;
  user: User;
  post_text: string;
  posted_at: string;
  reposted_by?: User | null;
};

type Id = {
  $oid: string;
};

type PostsContextData = {
  posts: Post[];
  setPosts: (posts: Post[]) => void;
};

type PostsProviderProps = {
  children: ReactNode;
};

const PostsContext = createContext({} as PostsContextData);

export function PostsProvider({ children }: PostsProviderProps) {
  const [posts, setPosts] = useState<Post[]>([]);

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

  return (
    <PostsContext.Provider
      value={{
        posts,
        setPosts,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
}

export function usePosts() {
  return useContext(PostsContext);
}
