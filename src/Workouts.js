import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, ActivityIndicator, TouchableOpacity, Dimensions, Animated } from 'react-native';
import { styles } from './styles/styles'
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Button, Card, IconButton, Title, Paragraph } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import { ViewWorkout } from './ViewWorkout'
// import Animated from 'react-native-reanimated';
import { removeToken } from './Token'
import Firebase from '../config/Firebase'
import AddWorkoutButton from './Components/AddWorkoutButton'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { logout } from './redux/actions/user'
import { getWorkouts } from './redux/actions/workouts'
// import Swipeable from 'react-native-swipeable-row';
import Swipeable, { SwipeListView } from 'react-native-swipe-list-view';
// import SwipeableExample from './SwipeableExample'

const getCircularReplacer = () => {
  const seen = new WeakSet();
  return (key, value) => {
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }
    return value;
  };
};

// const workouts = []
let workouts = [
  {
    'key': 1,
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
    'key': 2,
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
    'key': 3,
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

function WorkoutItem(props) {
  const navigation = useNavigation();
  return (

    // <SwipeRow>
    // <Swipeable 
    // rightActionActivationDistance={20}
    // rightButtons={[
    //   <TouchableHighlight style={styles.deleteSwipeout}><Text style={styles.deleteSwipeoutMsg}>Delete</Text></TouchableHighlight>
    // ]}
    // onRightButtonsOpenRelease={props.onOpen}
    // onRightButtonsCloseRelease={props.onClose}
    // >

      <Card id={props.id} onPress={() => GoToWorkout(navigation, props.id)}>
        <Card.Content>
          <Title>{props.name}</Title>
          <Paragraph>{parseSets(props.sets)} | {props.notes} </Paragraph>
        </Card.Content>
      </Card>

    // {/* </Swipeable> */}
  );
}

class WorkoutList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      workouts: this.props.workouts,
      workoutList: null,
      isLoading: true,
    }
  }
  
  componentDidMount() {

    // this.props.getWorkouts()
    const { getWorkouts, logout } = this.props
    // logout()
    getWorkouts();

    console.log('this.props.', this.props.loginState)
    console.log('this.props.workouts', this.props.workouts)

    this.setState({
      workouts: workouts,
      // workoutList: workoutList,
      isLoading: false
    });
  }
  
  deleteRow = (rowMap, rowKey) => {
    rowMap[rowKey].closeRow()
    const workoutUpdate = workouts.filter(i => i.key != rowKey)
    // console.log(workouts.filter(i => i.key == rowKey))
    // workouts.remove(i => i.key == rowKey)
    workouts = workoutUpdate 
    console.log(workoutUpdate)
    // console.log(rowMap[data.item.id.toString()])
    // rowMap[rowKey].closeRow()
    // newData = data.filter( i => i == index)
    // console.log(newData)
  }
    // const onSwipeValueChange = swipeData => {
  //   const { id, value } = swipeData;
  //   if (
  //       value < -Dimensions.get('window').width &&
  //       !this.animationIsRunning
  //   ) {
  //       this.animationIsRunning = true;
  //       Animated.timing(rowTranslateAnimatedValues[key], {
  //           toValue: 0,
  //           duration: 200,
  //           useNativeDriver: false,
  //       }).start(() => {
  //           const newData = [...listData];
  //           const prevIndex = listData.findIndex(item => item.key === key);
  //           newData.splice(prevIndex, 1);
  //           setListData(newData);
  //           this.animationIsRunning = false;
  //       });
  //   }
  // };

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
    const workoutsKeyed = workouts.map(i => ({
      'key': i.id,
      'name': i.name,
      'sets': i.sets,
      'notes': i.notes
    }))
    // workout list
    return(
      <View>
        {/* { workoutList } */}
        <SwipeListView
          disableRightSwipe
          data={workouts}
          renderItem={ (data, rowMap) => 
                        <WorkoutItem 
                          id={data.item.id}
                          name={data.item.name} 
                          sets={data.item.sets}
                          notes={data.item.notes}
                        /> }
          renderHiddenItem={ (data, rowMap) => (
            <TouchableOpacity  
              style={styles.deleteSwipeout}
              onPress={ () => this.deleteRow(rowMap, data.item.key) }
            >
              <Text style={styles.deleteSwipeoutMsg}>
                Delete
              </Text>
            </TouchableOpacity>
            )}
            // leftOpenValue={75}
            rightOpenValue={-100}
        />
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
      // currentlyOpenSwipeable: null
    }
  }

  render() {

    return (
      <View style={styles.container}>
        <ScrollView onScroll={this.handleScroll}>
            <View>
                <ConnectedWorkoutList />
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
      workouts: state.workouts,
      workoutForm: state.workoutForm
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