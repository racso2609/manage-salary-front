import React, { useContext } from "react";
import ThemeContext, { ThemeProvider } from "./context/colorContext";
import { childrenProps } from "./types";
import { NavigationContainer } from "@react-navigation/native";


export default function Theme(props: childrenProps) {
  const { children } = props;
  const { theme } = useContext(ThemeContext);
  return (
    <ThemeProvider>
      <NavigationContainer theme={theme}>
        {children}
      </NavigationContainer>
    </ThemeProvider>
  );
}
