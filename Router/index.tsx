import { NavigationContainer } from "@react-navigation/native";
import StackRoutes from "../navigation/Stack";
import React, { useContext } from "react";
import ThemeContext from "../context/colorContext";
import { RootSiblingParent } from "react-native-root-siblings";

export default function () {
  const { theme } = useContext(ThemeContext);
  return (
    <RootSiblingParent>
      <NavigationContainer theme={theme}>
        <StackRoutes />
      </NavigationContainer>
    </RootSiblingParent>
  );
}
