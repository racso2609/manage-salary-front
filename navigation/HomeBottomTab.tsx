import { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import CreateEntry from '../screens/CreateEntry';
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
      headerStyle: {
        backgroundColor: colors.background,
      },
      tabBarStyle: {
        backgroundColor: colors.background,
        borderColor: colors.border,
      },
      headerRight: () => (
        <TouchableOpacity
          style={{ marginRight: 20 }}
          onPress={() => toggleMode()}
        >
          {darkMode ? "dark" : "light"}
        </TouchableOpacity>
      ),
    };
  };

  return (
    <Tab.Navigator screenOptions={options}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Create form" component={CreateEntry} />
    </Tab.Navigator>
  );
}
