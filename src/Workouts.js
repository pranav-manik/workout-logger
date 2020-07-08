import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, ActivityIndicator, TouchableOpacity } from 'react-native';
import { styles } from './styles/styles'
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Button, Card, IconButton, Title, Paragraph } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import { ViewWorkout } from './ViewWorkout'
import Animated from 'react-native-reanimated';
import { removeToken } from './Token'
import Firebase from '../config/Firebase'
import AddWorkoutButton from './Components/AddWorkoutButton'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { logout } from './redux/actions/user'
import { getWorkouts } from './redux/actions/workouts'
import Swipeable from 'react-native-swipeable-row';
import SwipeableExample from './SwipeableExample'

// const workouts = []
const workouts = [
  {
    'id': 1,
    'name': 'Bench Press',
    'sets': [
    	{
	    	'setNbr': 1,
	    	'reps': 8,
	    	'rpe': 60,
	    	'weight': 145
    	},
    	{
	    	'setNbr': 2,
	    	'reps': 7,
	    	'rpe': 70,
	    	'weight': 150
    	},
    	{
	    	'setNbr': 3,
	    	'reps': 7,
	    	'rpe': 90,
	    	'weight': 155
    	},
    	{ 
	    	'setNbr': 4,
	    	'reps': 7,
	    	'rpe': 90,
	    	'weight': 155
    	},
    	{
	    	'setNbr': 5,
	    	'reps': 7,
	    	'rpe': 95,
	    	'weight': 145
    	}
    ],
    'notes': 'max out last set'
  },
  {
    'id': 2,
    'name': 'Pull up',
    'sets': [
    	{
	    	'setNbr': 1,
	    	'reps': 7,
	    	'rpe': 70,
	    	'weight': 30
    	},
    	{
	    	'setNbr': 2,
	    	'reps': 7,
	    	'rpe': 85,
	    	'weight': 30
    	},
    	{
	    	'setNbr': 3,
	    	'reps': 7,
	    	'rpe': 85,
	    	'weight': 30
    	},
    	{
	    	'setNbr': 4,
	    	'reps': 7,
	    	'rpe': 85,
	    	'weight': 30
    	},
    	{
	    	'setNbr': 5,
	    	'reps': 7,
	    	'rpe': 85,
	    	'weight': 30
    	}
    ],
    'notes': 'come all the way down'
  },
  {
    'id': 3,
    'name': 'Squat',
    'sets': [
    	{
	    	'setNbr': 1,
	    	'reps': 8,
	    	'rpe': 60,
	    	'weight': 225
    	},
    	{
	    	'setNbr': 2,
	    	'reps': 8,
	    	'rpe': 70,
	    	'weight': 240
    	},
    	{
	    	'setNbr': 3,
	    	'reps': 8,
	    	'rpe': 90,
	    	'weight': 250
    	},
    	{
	    	'setNbr': 4,
	    	'reps': 8,
	    	'rpe': 90,
	    	'weight': 250
    	},
    	{
	    	'setNbr': 5,
	    	'reps': 8,
	    	'rpe': 95,
	    	'weight': 250
    	}
    ],
    'notes': 'keep back straight, quit WHINING'
  }
]

const handleSignOut = (navigation) => {
  removeToken();
  firebase.auth().signOut().then(function() {
    // navigation.reset
    console.log('signed out');
  }).catch(function(error) {
    console.log(error);
  });
}

const handleAddWorkout = (navigation) => {
  navigation.navigate('Add Workout');
}

const GoToWorkout = (navigation, id) => {
  // console.log(this + 'called')
  // const workout = workouts.find(i => i.id == id);
  const workout = workouts.find(i => i.id == id);
  navigation.navigate('View Workout', 
    {
      itemId : workout.id,
      itemName : workout.name,
      itemWeight : workout.weight,
      itemSets : workout.sets,
      itemReps : workout.reps,
      itemNotes : workout.notes
    });
}

// add workout
function AddButton(props) {
    const navigation = useNavigation();
    return (
        <IconButton 
          {...props} 
          icon='plus'
          style={styles.addButton}
          onPress={() => handleAddWorkout(navigation)} 
        />
    );
  }

const parseSets = (sets) => {
  const myReps = [];
  sets.forEach( s => myReps.push(s.reps));
  // checks if all reps the same
  if (myReps.every( (val, i, arr) => val === arr[0] )) {
    return sets.length + ' x ' + myReps[0]
  }
  return sets.length + ' sets';
}

function WorkoutItem(props, {onOpen, onClose}) {
  const navigation = useNavigation();
  return (

    // <SwipeRow>
    <Swipeable 
    rightActionActivationDistance={20}
    rightButtons={[
      <TouchableHighlight style={styles.deleteSwipeout}><Text style={styles.deleteSwipeoutMsg}>Delete</Text></TouchableHighlight>
    ]}
    onRightButtonsOpenRelease={props.onOpen}
    onRightButtonsCloseRelease={props.onClose}
    >

      <Card id={props.id} onPress={() => GoToWorkout(navigation, props.id)}>
        <Card.Content>
          <Title>{props.name}</Title>
          <Paragraph>{parseSets(props.sets)} | {props.notes} </Paragraph>
        </Card.Content>
      </Card>

    </Swipeable>
  );
}

class WorkoutList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      workouts: this.props.workouts,
      workoutList: null,
      isLoading: true,
      onOpen: this.props.onOpen,
      onClose: this.props.onClose
    }
  }
  
  componentDidMount() {

    // this.props.getWorkouts()
    const { getWorkouts, logout } = this.props
    // logout()
    getWorkouts();

    // console.log('this.props.workouts', this.props.workouts)

    this.setState({
      workouts: workouts,
      // workoutList: workoutList,
      isLoading: false
    });
  }

  render() {

    const workoutList = workouts
    // const workoutList = this.props.workouts
                        .sort((a,b) => a.id - b.id)
                        .map((workout, index) => 
                        <WorkoutItem 
                          id={workout.id}
                          name={workout.name} 
                          sets={workout.sets}
                          notes={workout.notes}
                          onOpen={this.state.onOpen}
                          onClose={this.state.onClose}
                          // {...itemProps}
                        />);


    // if loading workouts 
    if (this.state.isLoading) {
      return (
        <View >
          <ActivityIndicator
            size="large"
            color="#676d75"
            style={styles.loading}
           />
        </View>
      );
    }
    // if no workouts
    if (workouts.length == 0) {
    // if (this.props.workouts.length == 0) {
      // console.log('no workouts')
      return (
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{fontFamily: 'Helvetica', fontSize: 20}}>No workouts</Text>
      </View>
      );
    }

    return(
      <View>
        { workoutList }
        {/* <TouchableOpacity 
          style={{flex: 1, alignItems: 'center'}}
          onPress={() => this.props.logout()}
        >
          <Text>
            Logout
          </Text>
        </TouchableOpacity> */}
      </View>
    );
  }

}


export default class WorkoutScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentlyOpenSwipeable: null
    }
  }

  handleScroll = () => {
    const {currentlyOpenSwipeable} = this.state;

    if (currentlyOpenSwipeable) {
      currentlyOpenSwipeable.recenter();
    }
  };


  render() {

    const {currentlyOpenSwipeable} = this.state;
    const itemProps = {
      onOpen: (event, gestureState, swipeable) => {
        if (currentlyOpenSwipeable && currentlyOpenSwipeable !== swipeable) {
          currentlyOpenSwipeable.recenter();
        }

        this.setState({currentlyOpenSwipeable: swipeable});
      },
      onClose: () => this.setState({currentlyOpenSwipeable: null})
    };

    return (
      <View style={styles.container}>
        <ScrollView onScroll={this.handleScroll}>
            <View>
                <ConnectedWorkoutList {...itemProps} />
            </View>
        </ScrollView>
        
        {/* <TouchableOpacity 
          style={{flex: 1, alignItems: 'center'}}
          onPress={() => this.props.logout()}
        >
          <Text>
            Logout
          </Text>
        </TouchableOpacity> */}



        <AddButton />
        {/* <AddWorkoutButton /> */}
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ logout, getWorkouts }, dispatch)
}

const mapStateToProps = state => {
  return {
      user: state.user,
      loginState: state.loginState,
      workouts: state.workouts
  }
}

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(WorkoutScreen)

const ConnectedWorkoutList = 
  connect(
      mapStateToProps,
      mapDispatchToProps
  )(WorkoutList)

// export class WorkoutScreen