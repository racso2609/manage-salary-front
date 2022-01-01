import {
  ReactChildren,
  ReactChild,
  createContext,
  useState,
  useEffect,
} from "react";
import { useColorScheme } from "react-native";
import { childrenProps } from "../../types";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";

interface colorInterface {
  primary: string;
  card: string;
  text: string;
  border: string;
  notification: string;
  background: string;
}

interface colorContext {
  color: colorInterface;
  darkMode: boolean;
  toogleMode: () => void;
}

const defaultValue = {
  color: DarkTheme.colors,
  darkMode: true,
  toogleMode: () => {},
};

const ThemeContext = createContext<colorContext>(defaultValue);
interface propsTypes extends childrenProps {}
export default ThemeContext;
export function ThemeProvider(props: propsTypes) {
  const { children } = props;
  const [color, setColor] = useState<colorInterface>(defaultValue.color);
  const [darkMode, setDarkMode] = useState<boolean>(defaultValue.darkMode);
  const schema = useColorScheme();

  useEffect(() => {
    setDarkMode(schema === "dark");
  }, []);

  useEffect(() => {
    setColor(darkMode ? DarkTheme.colors : DefaultTheme.colors);
  }, [darkMode]);

  const toogleMode = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <ThemeContext.Provider value={{ color, darkMode, toogleMode }}>
      <NavigationContainer theme={{ dark: darkMode, colors: color }}>
        {children}
      </NavigationContainer>
    </ThemeContext.Provider>
  );
}
