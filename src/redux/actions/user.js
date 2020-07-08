import React from 'react'
import { Alert } from "react-native";
import Firebase, { db }  from '../../../config/Firebase'
import { storeToken, removeToken, getIsLoggedIn } from '../../Token'

// define types

export const UPDATE_EMAIL = 'UPDATE_EMAIL'
export const UPDATE_PASSWORD = 'UPDATE_PASSWORD'
export const UPDATE_NAME = 'UPDATE_NAME'
export const LOGIN = 'LOGIN'
export const SIGNUP = 'SIGNUP'
export const LOGOUT = 'LOGOUT'
export const UPDATE_IS_LOGGED_IN ='UPDATE_IS_LOGGED_IN'

// actions

export const updateEmail = email => {
    return {
        type: UPDATE_EMAIL,
        payload: email
    }
}

export const updatePassword = password => {
    return {
        type: UPDATE_PASSWORD,
        payload: password
    }
}

export const updateName = name => {
    return {
        type: UPDATE_NAME,
        payload: name
    }
}

export const login = () => {
    return async (dispatch, getState) => {
        try {
            const { email, password } = getState().user
            const response = await Firebase.auth().signInWithEmailAndPassword(email, password)

            if (response.user) {
                await storeToken(response.user);
            }
            dispatch({ type: LOGIN, payload: response.user })
            dispatch({ type: UPDATE_IS_LOGGED_IN, payload: true })
        } catch (e) {
            console.log(e)
            switch (e.code) {
                case 'auth/argument-error':
                    return Alert.alert('Error', 'Invalid email or password')
                case 'auth/invalid-email':
                    return Alert.alert('Error', 'The email you have entered is not associated with an account')
                case 'auth/user-not-found':
                    return Alert.alert('Error', 'The email you have entered is not associated with an account')
                default:
                    return Alert.alert('Error', 'Invalid email or password')
            }

        }
    }
}

export const logout = () => {
    return async (dispatch, getState) => {
        try {
            await removeToken();
            await Firebase.auth().signOut()
            console.log('logout')
            dispatch({ type: LOGOUT, payload: '' })
            dispatch({ type: UPDATE_IS_LOGGED_IN, payload: false })
        } catch (e) {
            console.log(e)
        }
    }


//     removeToken();
//   firebase.auth().signOut().then(function() {
//     // navigation.reset
//     console.log('signed out');
//   }).catch(function(error) {
//     console.log(error);
//   });
}

export const signup = (navigation) => {
    return async (dispatch, getState) => {
        try {
            const { name, email, password } = getState().user
            
            const response = await Firebase.auth().createUserWithEmailAndPassword(email, password)
            if (response.user.uid) {
                
                const user = {
                    uid: response.user.uid,
                    email: email,
                    name: name,
                    isVerified: false,
                    workouts: []
                }

                db.collection('users')
                    .doc(response.user.uid)
                    .set(user)


                dispatch({ type: SIGNUP, payload: user })
                navigation.navigate('Confirmation');
            }
        } catch (e) {
            console.log(e)
            switch (e.code) {
                case 'auth/argument-error':
                    return Alert.alert('Error', 'Invalid email or password')
                case 'auth/invalid-email':
                    return Alert.alert('Error', 'Please enter a valid email')
                default:
                    return Alert.alert('Error', 'Please enter a valid email')
            }
        }
    }
}