// context/UserContext.tsx
import {
  createContext,
  useContext,
  useState,
  type PropsWithChildren,
} from "react";

type UserContextType = {
  username: string;
  setUsername: (username: string) => void;
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
};

const UserContext = createContext<UserContextType>({
  username: "",
  setUsername: () => {},
  accessToken: null,
  setAccessToken: () => {},
});

export const UserProvider = ({ children }: PropsWithChildren) => {
  const [username, setUsername] = useState("");
  const [accessToken, setAccessToken] = useState<string | null>(null);

  return (
    <UserContext.Provider
      value={{ username, setUsername, accessToken, setAccessToken }}
    >
      {children}
    </UserContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useUser = () => useContext(UserContext);
