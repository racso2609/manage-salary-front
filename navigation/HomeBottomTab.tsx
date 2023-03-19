import {
    BottomTabNavigationOptions,
    createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';

import Home from '../screens/Home';
import Expense from '../screens/ExpenseSection';
import Entry from '../screens/EntrySection';

import {
    faHome,
    faMoneyBill,
    IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { Text } from '../components/styledComponents';
import { RootStackLoggedParamList } from './LoggedStack';
import { NavigatorScreenParams } from '@react-navigation/native';
import useColor from '../hooks/useColors';
export type TabParamList = {
    Info: NavigatorScreenParams<RootStackLoggedParamList>;
    Entry: NavigatorScreenParams<RootStackLoggedParamList>;
    Expense: NavigatorScreenParams<RootStackLoggedParamList>;
};

const Tab = createBottomTabNavigator<TabParamList>();
const Navigator = Tab.Navigator;

type iconKeys = 'Expense' | 'Info' | 'Entry'; // create some types to define the 'types' object
type iconsList = { [key in iconKeys]: IconDefinition };

export default function TabNavigator() {
    const { colors } = useColor();
    const options = ({
        route,
    }: {
        route: { name: iconKeys };
    }): BottomTabNavigationOptions => {
        return {
            headerShown: false,
            tabBarStyle: {
                backgroundColor: colors.bg,
                // borderColor: colors.border,
            },
            tabBarIcon: ({
                color,
                size,
            }: {
                focused: any;
                color: string;
                size: number;
            }) => {
                const icons: iconsList = {
                    Expense: faMoneyBill,
                    Info: faHome,
                    Entry: faMoneyBill,
                };
                const icon = icons[route.name] || faHome;

                // You can return any component that you like here!
                return (
                    <Text>
                        <FontAwesomeIcon
                            icon={icon}
                            size={size}
                            color={color}
                        />
                    </Text>
                );
            },
        };
    };

    return (
        <Navigator screenOptions={options}>
            <Tab.Screen name="Info" component={Home} />
            <Tab.Screen name="Entry" component={Entry} />
            <Tab.Screen name="Expense" component={Expense} />
        </Navigator>
    );
}
