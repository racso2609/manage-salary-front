import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import UnLoggedStackRoutes from './navigation/UnLoggedStack';
import { RootSiblingParent } from 'react-native-root-siblings';
import { AuthContext } from './context/auth';
import LoggedRouter from './navigation/LoggedRouter';

export default function Router() {
    const { auth } = useContext(AuthContext);
    return (
        <RootSiblingParent>
            <NavigationContainer>
                {!auth && <UnLoggedStackRoutes />}
                {auth && <LoggedRouter />}
            </NavigationContainer>
        </RootSiblingParent>
    );
}
