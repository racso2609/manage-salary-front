import { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import { TouchableOpacity } from "../components/styledComponents";
// import AuthContext from "../context/auth";
import ThemeContext from "../context/colorContext";
const Tab = createBottomTabNavigator();

// <Tab.Screen name="Settings" component={SettingsScreen} />

export default function TabNavigator() {
  const { toggleMode, darkMode, theme } = useContext(ThemeContext);
  const { colors } = theme;

  const options = () => {
    return {
      headerShown: false,
      tabBarStyle: {
        backgroundColor: colors.background,
        borderColor: colors.border,
      },
      titleStyle: {
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
    <Tab.Navigator screenOptions={options}>
      <Tab.Screen name="Home" component={Home} />
    </Tab.Navigator>
  );
}
