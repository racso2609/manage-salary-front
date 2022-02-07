import StackRoutes from "../navigation/Stack";
import { NavigationContainer } from "@react-navigation/native";
import React, { useContext } from "react";
import ThemeContext from "../context/colorContext";
import Toast from "react-native-toast-message";

export default function () {
  const { theme } = useContext(ThemeContext);
  return (
    <NavigationContainer theme={theme}>
      <StackRoutes />
      <Toast />
    </NavigationContainer>
  );
}
