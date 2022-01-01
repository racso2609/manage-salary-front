import { createContext } from "react";
import { userInterface, childrenProps } from "../../types";

interface authInterface {
  user?: userInterface;
}
interface propsTypes extends childrenProps {}

const defaultValue = {
  user: null,
};

const AuthContext = useContext<authInterface>(defaultValue);

export function AuthProvider(props: propsTypes) {
  const { children } = props;
  const [user, setUser] = useState<userInterface>(initialState.user);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}
