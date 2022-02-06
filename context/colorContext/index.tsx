import { createContext, useState, useEffect } from "react";
import { childrenProps } from "../../types";
import { useColorScheme } from "react-native";
// import { Header } from "./styles";

interface colorInterface {
  primary: string;
  card: string;
  text: string;
  border: string;
  notification: string;
  background: string;
}
interface themeInterface {
  dark: boolean;
  colors: colorInterface;
}

interface colorContext {
  darkMode: boolean;
  toggleMode: () => void;
  theme: themeInterface;
}

const DefaultTheme = {
  dark: false,
  colors: {
    primary: "rgb(255, 45, 85)",
    background: "rgb(242, 242, 242)",
    card: "rgb(255, 255, 255)",
    text: "#000",
    border: "rgb(199, 199, 204)",
    notification: "rgb(255, 69, 58)",
  },
};

const DarkTheme = {
  dark: true,
  colors: {
    primary: "rgb(255, 45, 85)",
    background: "rgb(0, 0, 0)",
    card: "rgb(255, 255, 255)",
    text: "#fff",
    border: "rgb(199, 199, 204)",
    notification: "rgb(255, 69, 58)",
  },
};

const defaultValue = {
  darkMode: true,
  toggleMode: () => {},
  theme: DefaultTheme,
};

const ThemeContext = createContext<colorContext>(defaultValue);
interface propsTypes extends childrenProps {}
export default ThemeContext;
export function ThemeProvider(props: propsTypes) {
  const { children } = props;
  const [darkMode, setDarkMode] = useState<boolean>(defaultValue.darkMode);
  const [theme, setTheme] = useState<themeInterface>(defaultValue.theme);
  const schema = useColorScheme();
  useEffect(() => {
    setTheme(darkMode ? DarkTheme : DefaultTheme);
  }, [darkMode]);

  useEffect(() => {
    setDarkMode(schema === "dark");
  }, []);

  const toggleMode = () => setDarkMode((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleMode, theme }}>
      {children}
    </ThemeContext.Provider>
  );
}
