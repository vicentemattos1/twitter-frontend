import { createContext, ReactNode, useContext } from "react";

type PostsContextData = {};

type PostsProviderProps = {
  children: ReactNode;
};

const PostsContext = createContext({} as PostsContextData);

export function PostsProvider({ children }: PostsProviderProps) {
  return <PostsContext.Provider value={{}}>{children}</PostsContext.Provider>;
}

export function usePosts() {
  return useContext(PostsContext);
}
