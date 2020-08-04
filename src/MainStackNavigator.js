import React from 'react'
import { TouchableWithoutFeedback, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons'; 
import { Button } from 'react-native-paper';
import { StackActions } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import  WorkoutScreen  from './Workouts'
import { Progress } from './Progress'
import { ViewWorkout } from './ViewWorkout'
import { AddWorkout } from './Components/AddWorkout'
// import { connect, getState } from 'react-redux'
import { useSelector, connect, useDispatch } from 'react-redux'
// import { submitForm } from "./redux/actions/workoutForm";


const MainStack = createStackNavigator();
const ModalStack = createStackNavigator();

export function MainStackNavigator() {
    return(
        <MainStack.Navigator initialRouteName="Home">
          <MainStack.Screen name="Workouts" component={WorkoutScreen} />
          <MainStack.Screen
            name="View Workout"
            options={({ route }) => ({ title: route.params.itemName, headerBackTitle: null, headerBackTitleVisible: false })}
            component={ViewWorkout}
          />
          <MainStack.Screen 
            name="Profile"
            component={Progress}
          />
        </MainStack.Navigator>
    );
}

export function ModalStackNavigator() {
  const workoutFormSelector = useSelector(state => state.workoutForm)
  const dispatch = useDispatch()
  const submitForm = () => ({type: "SUBMIT_FORM"})
  function handleFormSubmit() {
    // console.log(getState())
    // const workoutForm = useSelector(state => state.workoutForm)
    // console.log(workoutFormSelector)
    // submitForm()
    dispatch(submitForm())
    // submitForm()

  }

  return(
      <ModalStack.Navigator mode="modal" >
          <ModalStack.Screen
            name="Main"
            component={MainStackNavigator}
            options={{ headerShown: false }}
          />
          <ModalStack.Screen
            name="Add Workout"  
            options={({ navigation }) => ({
              headerTitle: null,
              headerStyle: { shadowColor: 'transparent' },
              headerLeft: () => (
                <TouchableWithoutFeedback
                  onPress={() => navigation.goBack()} icon>
                    <AntDesign name="close" size={18} color="black" style={{marginLeft: 12}}/>
                </ TouchableWithoutFeedback>
              ),
              headerRight: () => (
                <TouchableWithoutFeedback
                  onPress={() => handleFormSubmit()} icon>
                    <AntDesign name="check" size={18} color="black" style={{marginRight: 12}}/>
                </ TouchableWithoutFeedback>
              )
              })
            }   
            component={AddWorkout}
            submitFormCallback={handleFormSubmit}
          />
      </ModalStack.Navigator>
  );
}

// const mapDispatchToProps = dispatch => {
//   return bindActionCreators({ updateWorkoutName, updateWorkoutNotes, updateSets }, dispatch)
// }

// const mapStateToProps = state => {
//   return {
//       workoutForm: state.workoutForm,
//   }
// }

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(ModalStackNavigator)

// export default MainStackNavigator