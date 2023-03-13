import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthContext } from '../context/auth';
//------ Screens ------
// import Create from '../screens/Create';
import Home from './HomeBottomTab';
import { entryInterface } from '../interfaces/entries';
import { expenseInterface } from '../interfaces/expenses';
import Register from '../screens/Register';
import ThemeSelector from '../components/ThemeSelector';
// import { themes } from '../utils/themes';
import Login from '../screens/Login';

export type RootStackParamList = {
    Home: undefined;
    Login: undefined;
    Register: undefined;
    Create: {
        entry?: entryInterface;
        expense?: expenseInterface;
        type: createType;
    };
};

const DefaultStack = createStackNavigator<RootStackParamList>();
const Stack = DefaultStack.Navigator;
const StackScreen = DefaultStack.Screen;

export enum createType {
    EXPENSE = 'EXPENSE',
    ENTRY = 'ENTRY',
}

const options = () => {
    return {
        // headerStyle: {
        // backgroundColor: themes.dark.bg,
        // color: themes.dark.fg,
        // },
        title: 'Manage Salary',
        headerRight: () => <ThemeSelector />,
    };
};

export default function StackRoutes() {
    const { auth } = useContext(AuthContext);

    return (
        <Stack initialRouteName="Login">
            {!auth ? (
                <>
                    <StackScreen
                        name="Login"
                        component={Login}
                        options={options}
                    />
                    <StackScreen
                        name="Register"
                        component={Register}
                        options={options}
                    />
                </>
            ) : (
                <StackScreen name="Home" component={Home} options={options} />
            )}
        </Stack>
    );
}
