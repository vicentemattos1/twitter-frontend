import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { uuid } from "uuidv4";

import Swal from "sweetalert2";

export type User = {
  id: string;
  username: string;
  date_joined: string;
  following?: boolean;
  num_followers: number;
  num_following: number;
  avatar_url: string;
};

type UserContextData = {
  user: User | null;
  setUser: (user: User) => void;
  userTodayPosts: number;
  setUserTodayPosts: (userTodayPosts: number) => void;
  userCanPost: () => boolean;
};

type UserProviderProps = {
  children: ReactNode;
};

const UserContext = createContext({} as UserContextData);

export function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [userTodayPosts, setUserTodayPosts] = useState(0);
  const userPostsDayLimit = 5;

  function userCanPost() {
    if (userTodayPosts < userPostsDayLimit) {
      return true;
    }
    Swal.fire({
      icon: "error",
      title: "Limit of posts reached!",
      text: `Limit: ${userPostsDayLimit}`,
    });
    return false;
  }

  useEffect(() => {
    const userLocalStorageData = localStorage.getItem("user_data") || "";

    if (!userLocalStorageData) {
      const userInit = {
        id: uuid(),
        username: "Vicente Mattos",
        date_joined: new Date().toString(),
        avatar_url:
          "https://avatars.githubusercontent.com/u/48080194?s=400&u=186f9e014dbd489912da4d1d5194e2b2137c0e52&v=4",
        num_followers: 0,
        num_following: 3,
      };
      localStorage.setItem("user_data", JSON.stringify(userInit));
      setUser(userInit);
    } else {
      setUser(JSON.parse(userLocalStorageData));
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        userTodayPosts,
        setUserTodayPosts,
        userCanPost,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
