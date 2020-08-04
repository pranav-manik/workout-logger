import React from 'react'
import { Alert } from "react-native";

// define types

export const UPDATE_SETS = 'UPDATE_SETS'
export const DELETE_SET = 'DELETE_SET'
export const UPDATE_WORKOUT_NAME = 'UPDATE_WORKOUT_NAME'
export const UPDATE_WORKOUT_NOTES = 'UPDATE_WORKOUT_NOTES'
export const CLEAR_FORM = 'CLEAR_FORM'
export const SUBMIT_FORM = 'SUBMIT_FORM'



// actions

export const updateWorkoutName = name => {
    return {
        type: UPDATE_WORKOUT_NAME,
        payload: name
    }
}

export const updateWorkoutNotes = notes => {
    return {
        type: UPDATE_WORKOUT_NOTES,
        payload: notes
    }
}

export const updateSets = sets => {
    return {
        type: UPDATE_SETS,
        payload: sets
    }
}

export const submitForm = () => {
    return async (dispatch, getState) => {
        console.log("submit form called")
    }
}