import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/Login";
import ThemeContext from "../context/colorContext";
import AuthContext from "../context/auth";
import { TouchableOpacity, Text } from "../components/styledComponents";
const DefaultStack = createNativeStackNavigator();
const Stack = DefaultStack.Navigator;
const StackScreen = DefaultStack.Screen;

export default function StackRoutes() {
  const { toggleMode, darkMode } = useContext(ThemeContext);
  const { auth } = useContext(AuthContext);

  const options = () => {
    return {
      headerRight: () => (
        <TouchableOpacity onPress={() => toggleMode()}>
          {darkMode ? "dark" : "light"}
        </TouchableOpacity>
      ),
    };
  };
  return (
    <Stack initialRouteName="login">
      {!auth ? (
        <StackScreen name="login" component={Login} options={options} />
      ) : (
        <StackScreen
          name="home"
          component={() => <Text>Home</Text>}
          options={options}
        />
      )}
    </Stack>
  );
}
