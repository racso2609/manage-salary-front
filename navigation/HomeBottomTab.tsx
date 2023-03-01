import { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import ThemeContext from '../context/colorContext';
import Expense from '../screens/ExpenseSection';
import {
    faHome,
    faMoneyBill,
    IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import Entries from '../screens/EntrySection';
const Tab = createBottomTabNavigator();
const Navigator = Tab.Navigator;

type iconKeys = 'Expense' | 'Info' | 'Entry'; // create some types to define the 'types' object
type iconsList = { [key in iconKeys]: IconDefinition };

export default function TabNavigator() {
    const { theme } = useContext(ThemeContext);
    const { colors } = theme;

    const options = ({ route }: { route: { name: iconKeys } }) => {
        return {
            headerShown: false,
            tabBarStyle: {
                backgroundColor: colors.background,
                borderColor: colors.border,
            },
            tabBarIcon: ({
                color,
                size,
            }: {
                focused: any;
                color: string;
                size: number;
            }) => {
                let icons: iconsList = {
                    Expense: faMoneyBill,
                    Info: faHome,
                    Entry: faMoneyBill,
                };
                const icon = icons[route.name] || faHome;

                // You can return any component that you like here!
                return (
                    <FontAwesomeIcon icon={icon} size={size} color={color} />
                );
            },
        };
    };

    return (
        <Navigator screenOptions={options}>
            <Tab.Screen name="Info" component={Home} />
            <Tab.Screen name="Entry" component={Entries} />
            <Tab.Screen name="Expense" component={Expense} />
        </Navigator>
    );
}
