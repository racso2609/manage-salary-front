import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ThemeContext from "../context/colorContext";
import AuthContext from "../context/auth";
import { TouchableOpacity } from "../components/styledComponents";
//------ Screens ------
import Login from "../screens/Login";
import Create from "../screens/Create";
import HomeBottom from "./HomeBottomTab";
import { entryInterface } from "../interfaces/entries";
import { expenseInterface } from "../interfaces/expenses";
import Register from "../screens/Register";

const DefaultStack = createNativeStackNavigator();
const Stack = DefaultStack.Navigator;
const StackScreen = DefaultStack.Screen;

export enum createType {
  EXPENSE = "EXPENSE",
  ENTRY = "ENTRY",
}
export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Register: undefined;
  Create: {
    entry?: entryInterface;
    expense?: expenseInterface;
    type: createType;
  };
};

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
  return (
    <Stack initialRouteName="Login">
      {!auth ? (
        <>
          <StackScreen name="Login" component={Login} options={options} />
          <StackScreen name="Register" component={Register} options={options} />
        </>
      ) : (
        <>
          <StackScreen name="Home" component={HomeBottom} options={options} />
          <StackScreen name="Create" component={Create} options={options} />
        </>
      )}
    </Stack>
  );
}
