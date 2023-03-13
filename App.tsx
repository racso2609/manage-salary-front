import { StatusBar } from 'expo-status-bar';
import { View } from './components/styledComponents';
import ThemeProvider from './context/theme';
import Router from './router';
import 'react-native-gesture-handler';
import AuthProvider from './context/auth';

export default function App() {
    return (
        <ThemeProvider>
            <AuthProvider>
                <Router />
            </AuthProvider>
        </ThemeProvider>
    );
}
