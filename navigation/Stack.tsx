import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ThemeContext from "../context/colorContext";
import AuthContext from "../context/auth";
import { TouchableOpacity, Text } from "../components/styledComponents";
//------ Screens ------
import Login from "../screens/Login";
const DefaultStack = createNativeStackNavigator();
const Stack = DefaultStack.Navigator;
const StackScreen = DefaultStack.Screen;


export default function StackRoutes() {
  const { toggleMode, darkMode, theme } = useContext(ThemeContext);
  const { colors } = theme;
  const { auth } = useContext(AuthContext);

  const options = () => {
    return {
      headerStyle: {
        backgroundColor: colors.background,
        color: colors.text,
      },
      headerRight: () => (
        <TouchableOpacity onPress={() => toggleMode()}>
          {darkMode ? "dark" : "light"}
        </TouchableOpacity>
      ),
    };
  };
        // <StackScreen name="home" component={Home} options={options} />
  return (
    <Stack initialRouteName="login">
      {!auth &&(
        <StackScreen name="login" component={Login} options={options} />
      )} 
      
    </Stack>
  );
}
