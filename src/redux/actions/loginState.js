import React from 'react'
import { AsyncStorage} from "react-native";
import { storeToken, getIsLoggedIn } from '../../Token'

// define types

export const UPDATE_IS_LOGGED_IN = 'UPDATE_IS_LOGGED_IN'


export const updateIsLoggedIn = () => {
    return async (dispatch, getState) => {
        try {
            let IsSignedIn = await AsyncStorage.getItem("IsSignedIn");
            console.log("IsSignedIn", IsSignedIn)
            // if no async storage
            IsSignedIn === 'true' ?  IsSignedIn = true : IsSignedIn = false
            dispatch({ type: UPDATE_IS_LOGGED_IN, payload: Boolean(IsSignedIn) })
        } catch (e) {
            console.log(e)
        }
    }
}

// try {
//     let IsSignedIn = await AsyncStorage.getItem("IsSignedIn");
//     console.log(IsSignedIn)
//   //   let data = JSON.parse(IsSignedIn);
//     return IsSignedIn;
//   } catch (error) {
//     console.log("Something went wrong", error);
//   }