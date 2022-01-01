import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { Text, View } from "./components/styledComponents";
import { ThemeProvider } from "./context/colorContext";

export default function App() {
  return (
    <ThemeProvider>
      <View style={styles.container}>
        <Text>Open up App.tsx to start working on your app!</Text>
        <StatusBar style="auto" />
      </View>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
