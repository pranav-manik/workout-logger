import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'

const Stack = createStackNavigator();

export const Routes = ({}) => {
    return(
        <Stack.Navigator>
            <Stack.Screen name='workouts' />
        </Stack.Navigator>
    );
}