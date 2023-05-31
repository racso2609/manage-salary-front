import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import UnLoggedStackRoutes from './navigation/UnLoggedStack';
import { RootSiblingParent } from 'react-native-root-siblings';
import { AuthContext } from './context/auth';
import LoggedStackRoutes from './navigation/LoggedStack';

export default function Router() {
    const { auth } = useContext(AuthContext);
    return (
        <RootSiblingParent>
            <NavigationContainer>
                {!auth && <UnLoggedStackRoutes />}
                {auth && <LoggedStackRoutes />}
            </NavigationContainer>
        </RootSiblingParent>
    );
}
