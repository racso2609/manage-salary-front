import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
//------ Screens ------
import Register from '../screens/Register';
import ThemeSelector from '../components/ThemeSelector';
// import { themes } from '../utils/themes';
import Login from '../screens/Login';
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
    // const { colors } = useColor();

    const options = () => {
        return {
            // headerStyle: {
            // backgroundColor: colors.bg2,
            // },
            // headerTintColor: colors.fg,
            title: 'Manage Salary',
            headerRight: () => <ThemeSelector />,
        };
    };
    return (
        <>
            <Stack initialRouteName="Login">
                <StackScreen name="Login" component={Login} options={options} />
                <StackScreen
                    name="Register"
                    component={Register}
                    options={options}
                />
            </Stack>
        </>
    );
}
