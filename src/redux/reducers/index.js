import { combineReducers } from 'redux'
import { LOGIN, LOGOUT, SIGNUP, UPDATE_EMAIL, UPDATE_PASSWORD, UPDATE_NAME } from '../actions/user'
import { UPDATE_IS_LOGGED_IN } from '../actions/loginState'
import { ADD_WORKOUT, DELETE_WORKOUT, UPDATE_WORKOUT, GET_WORKOUTS } from '../actions/workouts'

const user = (state = {}, action) => {
    switch (action.type) {
        case LOGIN:
            return action.payload
        case LOGOUT:
            return action.payload
        case SIGNUP:
            return action.payload
        case UPDATE_EMAIL:
            return { ...state, email: action.payload }
        case UPDATE_PASSWORD:
            return { ...state, password: action.payload }
        case UPDATE_NAME:
                return { ...state, name: action.payload }
        default:
            return state
    }
}

const loginState = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_IS_LOGGED_IN:
            return { ...state, isLoggedIn: action.payload } 
        default:
            return state
            // return {isLoggedIn: false}
    }
}

const workouts = (state = {}, action) => {
    switch (action.type) {
        case ADD_WORKOUT:
            return { ...state, workout: action.payload }
        case DELETE_WORKOUT:
                return { ...state, workout: action.payload } 
        case UPDATE_WORKOUT:
            return { ...state, workout: action.payload }
        case GET_WORKOUTS:
            return action.payload

        default:
            return state
            // return {isLoggedIn: false}
    }
}

// const loginState = ()

const rootReducer = combineReducers({
    user,
    loginState,
    workouts
})

export default rootReducer