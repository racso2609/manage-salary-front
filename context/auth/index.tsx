import { createContext, useState } from "react";
import { userInterface, childrenProps } from "../../types";
import { loginDataInterface } from "../../interfaces/auth";
import { loginRequest } from "../../requests/auth";
import notify from "../../utils/notify";

interface authInterface {
  user?: userInterface;
  auth: boolean;
  login?: (authData: loginDataInterface) => Promise<void>;
}
interface propsTypes extends childrenProps {}

const defaultValue = {
  auth: false,
};

const AuthContext = createContext<authInterface>(defaultValue);

export function AuthProvider(props: propsTypes) {
  const { children } = props;
  const [user, setUser] = useState<userInterface>();
  const auth = user ? true : false;
  const setToken = (token: string) => localStorage.setItem("session", token);
  const getToken = () => localStorage.getItem("session");

  const login = async (authData: loginDataInterface) => {
    const { data, error } = await loginRequest(authData);
    if (data) {
      const newUser = {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
      };
      setUser(newUser);
    }
    if (error)
      notify.send({ type: "error", title: "Login Error", message: error });
  };

  return (
    <AuthContext.Provider value={{ user, login, auth }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
