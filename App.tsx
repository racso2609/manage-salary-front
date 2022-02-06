import { useContext } from "react";
import Theme from "./ThemeController";
// import Login from "./screens/Login";
import Toast from "react-native-toast-message";
import StackRoutes from "./navigation/Stack";
import AuthContext from "./context/auth";
import TabNavigator from "./navigation/HomeBottomTab";

export default function App() {
  const { auth } = useContext(AuthContext);

  return (
    <Theme>
      {auth ? <StackRoutes /> : <TabNavigator />}
      <Toast />
    </Theme>
  );
}
