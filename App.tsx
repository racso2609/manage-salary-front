import { StatusBar } from 'expo-status-bar';
import { View, Text } from './components/styledComponents';
import ThemeSelector from './components/ThemeSelector';
import ThemeProvider from './context/theme';

export default function App() {
    return (
        <ThemeProvider>
            <View flex={1} alignItems="center" justifyContent="center">
                <Text>Open up App.tsx to start working on your app!</Text>
                <ThemeSelector />
                <StatusBar style="auto" />
            </View>
        </ThemeProvider>
    );
}
