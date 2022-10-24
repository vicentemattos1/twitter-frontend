import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { uuid } from "uuidv4";

export type User = {
  id: string;
  username: string;
  date_joined: string;
  following?: boolean;
  num_followers: number;
  num_following: number;
  avatar_url: string;
  number_posts: number;
};

type UserContextData = {
  user: User | null;
  setUser: (user: User) => void;
};

type UserProviderProps = {
  children: ReactNode;
};

const UserContext = createContext({} as UserContextData);

export function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User | null>(null);

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
        number_posts: 0,
      };
      localStorage.setItem("user_data", JSON.stringify(userInit));
      setUser(userInit);
    } else {
      setUser(JSON.parse(userLocalStorageData));
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
