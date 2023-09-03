import React from 'react';
import {
    createStackNavigator,
    StackNavigationOptions,
} from '@react-navigation/stack';
//------ Screens ------
import Register from '../screens/Register';
import ThemeSelector from '../components/ThemeSelector';
// import { themes } from '../utils/themes';
import Login from '../screens/Login';
import useColor from '../hooks/useColors';
// import useColor from '../hooks/useColors';

export type RootStackParamList = {
    Home: undefined;
    Login: undefined;
    Register: undefined;
};

const DefaultStack = createStackNavigator<RootStackParamList>();
const Stack = DefaultStack.Navigator;
const StackScreen = DefaultStack.Screen;

export default function UnLoggedStackRoutes() {
    const { colors } = useColor();

    const options = {
        headerStyle: {
            backgroundColor: colors.bg2,
        },
        headerTintColor: colors.fg,
        headerTitleStyle: {
            fontWeight: 'bold',
        },
        title: 'Manage Salary',
        headerRight: () => <ThemeSelector />,
    } as StackNavigationOptions;
    return (
        <>
            <Stack initialRouteName="Login" screenOptions={options}>
                <StackScreen name="Login" component={Login} />
                <StackScreen name="Register" component={Register} />
            </Stack>
        </>
    );
}
