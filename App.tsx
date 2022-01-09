import Theme from "./ThemeController";
import Login from "./screens/Login";
import Toast from "react-native-toast-message";
import { AuthProvider } from "./context/auth";
import StackRoutes from "./navigation/Stack";

export default function App() {
  return (
    <Theme>
      <AuthProvider>
        <StackRoutes />
        <Toast />
      </AuthProvider>
    </Theme>
  );
}
