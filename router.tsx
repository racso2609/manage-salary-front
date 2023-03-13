import { NavigationContainer } from '@react-navigation/native';
import StackRoutes from './navigation/Stack';
import React from 'react';
import { RootSiblingParent } from 'react-native-root-siblings';

export default function () {
    return (
        <RootSiblingParent>
            <NavigationContainer>
                <StackRoutes />
            </NavigationContainer>
        </RootSiblingParent>
    );
}
