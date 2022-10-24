import { createContext, ReactNode, useContext, useState } from "react";

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

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
