import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, AsyncStorage, Animated } from 'react-native';
import {DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthStackNavigator from './src/AuthStackNavigator';
import { MainStackNavigator, ModalStackNavigator } from './src/MainStackNavigator';
import { getToken, getIsLoggedIn } from './src/Token'
import firebase from 'firebase'
import SplashScreen from './src/screens/SplashScreen';
import { applyMiddleware, bindActionCreators } from 'redux'
import { useSelector, connect, useDispatch } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import reducer from './src/redux/reducers'
import { isLoggedIn, login } from './src/redux/actions/user'
import { updateIsLoggedIn } from './src/redux/actions/loginState'
import { store } from './ReduxWrapper'


function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
    </View>
  );
}

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    accent: 'lightblue',
  },
};

const Stack = createStackNavigator();

function App() {
  const loginState = useSelector(state => state.loginState)
  const dispatch = useDispatch()
  const [IsSignedIn, setIsSignedIn] = useState(loginState);
  const [IsLoading, setIsLoading] = useState(true);

  // verify if logged in through AsyncStorage
  useEffect ( () => {
    
    // updateIsLoggedIn()
    // console.log("current user",firebase.auth().currentUser)
    
    AsyncStorage.getItem("IsSignedIn")
    .then( IsSignedIn => {
      console.log('IsSignedIn', IsSignedIn)
      IsSignedIn === 'true' ?  IsSignedIn = true : IsSignedIn = false
      dispatch({ type: "UPDATE_IS_LOGGED_IN", payload: Boolean(IsSignedIn)})
    } )
    .then( () => setIsLoading(false) );


    // getIsLoggedIn()
    // .then(userData => setIsSignedIn(userData))
    //   .then(() => {
    //     setIsLoading(false);
    //     // console.log('isloading', IsLoading);
    //     // var obj = JSON.parse(JSON.parse(IsSignedIn));
    //     // return obj.stsTokenManager
    //   })
      // .then(i => console.log('\n\n', i));
    
  }, []);

  if (IsLoading) {
    // console.log('isloading', IsLoading);
    return <SplashScreen />
  }

  return (
     // <PaperProvider theme={theme}>
    //   <NavigationContainer>
    //     <Stack.Navigator>
    //       <Stack.Screen name="Workouts" component={WorkoutScreen} />
    //       <Stack.Screen
    //         name="View Workout"
    //         options={({ route }) => ({ title: route.params.itemName, headerBackTitle: null, headerBackTitleVisible: false })}
    //         component={ViewWorkout} />
    //       <Stack.Screen name="Profile" component={Progress} />
    //     </Stack.Navigator>
    //   </NavigationContainer>
    // </PaperProvider>

      <PaperProvider theme={theme}>
        <NavigationContainer>
          { loginState.isLoggedIn ?
            <ModalStackNavigator /> 
          :
            <AuthStackNavigator />
          }
        </NavigationContainer>
      </PaperProvider>
  );
}


const mapDispatchToProps = dispatch => {
  return bindActionCreators({ updateIsLoggedIn }, dispatch)
}

const mapStateToProps = state => {
  return {
      user: state.user,
      loginState: state.loginState
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

// export default App;
