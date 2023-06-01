import ThemeProvider from './context/theme';
import Router from './router';
import AuthProvider from './context/auth';
import 'react-native-gesture-handler';
import { SWRConfig } from 'swr';
import { AppState, AppStateStatus } from 'react-native';

export default function App() {
    return (
        <ThemeProvider>
            <AuthProvider>
                <SWRConfig
                    value={{
                        provider: () => new Map(),
                        isVisible: () => {
                            return true;
                        },
                        initFocus(callback) {
                            let appState = AppState.currentState;

                            const onAppStateChange = (
                                nextAppState: AppStateStatus
                            ) => {
                                /* If it's resuming from background or inactive mode to active one */
                                if (
                                    appState.match(/inactive|background/) &&
                                    nextAppState === 'active'
                                ) {
                                    callback();
                                }
                                appState = nextAppState;
                            };

                            // Subscribe to the app state change events
                            const subscription = AppState.addEventListener(
                                'change',
                                onAppStateChange
                            );

                            return () => {
                                subscription.remove();
                            };
                        },
                    }}
                >
                    <Router />
                </SWRConfig>
            </AuthProvider>
        </ThemeProvider>
    );
}
