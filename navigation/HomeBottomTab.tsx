import { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
// import type { NativeStackScreenProps } from "@react-navigation/native-stack";
// import CreateEntry from "../screens/CreateEntry";
// import { TouchableOpacity } from "../components/styledComponents";
// import AuthContext from "../context/auth";
import ThemeContext from "../context/colorContext";
const Tab = createBottomTabNavigator();

// <Tab.Screen name="Settings" component={SettingsScreen} />
// type propsType = {};
// type Props = NativeStackScreenProps<propsType, "Home">;

export default function TabNavigator() {
  const { theme } = useContext(ThemeContext);
  const { colors } = theme;

  const options = () => {
    return {
      headerShown: false,
      tabBarStyle: {
        backgroundColor: colors.background,
        borderColor: colors.border,
      },
    };
  };

  return (
    <Tab.Navigator screenOptions={options}>
      <Tab.Screen name="Info" component={Home} />
    </Tab.Navigator>
  );
}