import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
//------ Screens ------
import Create from '../screens/Create';
import Home from './HomeBottomTab';
import { entryInterface } from '../interfaces/entries';
import { expenseInterface } from '../interfaces/expenses';
import ThemeSelector from '../components/ThemeSelector';
import useColor from '../hooks/useColors';

export type RootStackLoggedParamList = {
    Home: undefined;
    Create: {
        entry?: entryInterface;
        expense?: expenseInterface;
        type: createType;
    };
};

const DefaultStack = createStackNavigator<RootStackLoggedParamList>();
const Stack = DefaultStack.Navigator;
const StackScreen = DefaultStack.Screen;

export enum createType {
    EXPENSE = 'EXPENSE',
    ENTRY = 'ENTRY',
}

export default function LoggedStackRoutes() {
    const { colors } = useColor();
    const options = () => {
        return {
            headerStyle: {
                // backgroundColor: colors.bg,
                // color: colors.fg,
            },
            title: 'Manage Salary',
            headerRight: () => <ThemeSelector />,
        };
    };
    return (
        <Stack initialRouteName="Home">
            <StackScreen name="Home" component={Home} options={options} />
            <StackScreen name="Create" component={Create} options={options} />
        </Stack>
    );
}
