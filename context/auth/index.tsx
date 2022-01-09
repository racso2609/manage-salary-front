import { createContext, useState, useEffect } from "react";
import { userInterface, childrenProps } from "../../types";
import { loginDataInterface } from "../../interfaces/auth";
import { loginRequest, currentUserRequest } from "../../requests/auth";
import notify from "../../utils/notify";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
  const setToken = (token: string) =>
    AsyncStorage.setItem("session", `Bearer ${token}`);
  const getToken = async () => AsyncStorage.getItem("session");
  useEffect(() => {
    currentUser();
  }, []);
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
  const currentUser = async () => {
    const token = await getToken();
    if (!token) return;
    const { data, error } = await currentUserRequest(token);
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
