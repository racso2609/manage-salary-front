import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import { NavigatorScreenParams } from '@react-navigation/native';
import Entries from '../screens/EntrySection';
import Expenses from '../screens/ExpenseSection';
import CreateStack, { EntriesStackParamList } from './CreateStack';
export type TabParamList = {
    Info: NavigatorScreenParams<undefined>;
    Entries: NavigatorScreenParams<EntriesStackParamList>;
    Expenses: NavigatorScreenParams<EntriesStackParamList>;
};
const Tab = createBottomTabNavigator<TabParamList>();

const EntriesScreen: React.FC = () => <CreateStack component={Entries} />;
const ExpensesScreen: React.FC = () => <CreateStack component={Expenses} />;

export default function LoggedRouter() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Info" component={Home} />
            <Tab.Screen name="Entries" component={EntriesScreen} />
            <Tab.Screen name="Expenses" component={ExpensesScreen} />
        </Tab.Navigator>
    );
}
// <Tab.Screen name="Expenses" component={Expenses} />
