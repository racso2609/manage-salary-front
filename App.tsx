import ThemeProvider from './context/theme';
import Router from './router';
import AuthProvider from './context/auth';
import 'react-native-gesture-handler';

export default function App() {
    return (
        <ThemeProvider>
            <AuthProvider>
                <Router />
            </AuthProvider>
        </ThemeProvider>
    );
}
