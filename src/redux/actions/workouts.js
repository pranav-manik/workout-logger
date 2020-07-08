import React from 'react'
import { Alert } from "react-native";
import Firebase, { db }  from '../../../config/Firebase'
// import { storeToken, removeToken, getIsLoggedIn } from '../Token'

// define types

export const ADD_WORKOUT = 'ADD_WORKOUT'
export const DELETE_WORKOUT = 'DELETE_WORKOUT'
export const GET_WORKOUTS = 'GET_WORKOUTS'
export const UPDATE_WORKOUTS = 'UPDATE_WORKOUTS'


export const getWorkouts = () => {
    return async (dispatch, getState) => {
        try {
        const user = await Firebase.auth().currentUser.uid
        const userDB = await db.collection('users').doc(user)
        let workouts = []
        let getWorkouts = await userDB.get()
            .then(doc => {
                if (doc.exists) {
                    workouts = doc.data().workouts
                } else {
                    workouts = []
                    console.log('No such document!');
                }
            })
            .catch(err => {
                console.log('Error getting document', err);
            });

            console.log('workouts', workouts)
        
            dispatch({ type: GET_WORKOUTS, payload: workouts })
        } catch (e) {
            console.log(e)
        }
    }
}

export const addWorkout = () => {
    return async (dispatch, getState) => {
        try {
            const workout = []
            const workouts = getState().workouts

            const user = await Firebase.auth().currentUser.uid
            const userDB = await db.collection('users').doc(user)
            

            let getWorkouts = await userDB.get()
            .then(doc => {
                if (doc.exists) {
                    workouts = doc.data().workouts
                } else {
                    workouts = []
                    console.log('No such document!');
                }
            })
            .catch(err => {
                console.log('Error getting document', err);
            });

            console.log('workouts', workouts)

        }
        catch (e) {
            console.log(e)
        }
    }
}