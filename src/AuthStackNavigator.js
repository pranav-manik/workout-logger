import React from 'react'
import Login from './screens/Login'
import Signup from './screens/Signup'
import Confirmation from './screens/Confirmation'
import { StackActions } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

const AuthStack = createStackNavigator();

function AuthStackNavigator() {
    return(
        <AuthStack.Navigator>
            <AuthStack.Screen
                name='Sign in'
                component={ Login }
            >
            </AuthStack.Screen>
            <AuthStack.Screen
                name='Signup'
                options={({ route }) => ({ title: 'Sign Up', headerBackTitle: null, headerBackTitleVisible: false })}
                component={ Signup }
            >
            </AuthStack.Screen>
            <AuthStack.Screen
                name='Confirmation'
                options={({ route, navigation }) => ({ headerLeft: null })}
                component={ Confirmation }
            >
            </AuthStack.Screen>
        </AuthStack.Navigator>
    );
}

export default AuthStackNavigator