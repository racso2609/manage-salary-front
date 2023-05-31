import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
//------ Screens ------
import Create from '../screens/Create';
import { entryInterface } from '../interfaces/entries';
import { expenseInterface } from '../interfaces/expenses';
import ThemeSelector from '../components/ThemeSelector';
import { NavigatorScreenParams } from '@react-navigation/native';

export type EntriesStackParamList = {
    Info: NavigatorScreenParams<undefined>;
    Create: {
        entry?: entryInterface;
        expense: expenseInterface;
        type: createType;
    };
};

const DefaultStack = createStackNavigator<EntriesStackParamList>();
const Stack = DefaultStack.Navigator;
const StackScreen = DefaultStack.Screen;

export enum createType {
    EXPENSE = 'EXPENSE',
    ENTRY = 'ENTRY',
}

interface propsType {
    component: any;
}

export default function LoggedStackRoutes({ component }: propsType) {
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
        <Stack initialRouteName="Info">
            <StackScreen name="Info" component={component} options={options} />
            <StackScreen name="Create" component={Create} options={options} />
        </Stack>
    );
}
