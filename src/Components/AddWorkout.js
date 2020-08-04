import React from 'react'
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { DataTable, Checkbox, Divider, IconButton } from 'react-native-paper';
import { Table } from './Table'
import DoneBar from 'done-bar';
import { connect, getStore } from 'react-redux'
import { bindActionCreators } from 'redux'
import { updateWorkoutName, updateWorkoutNotes, updateSets } from "../redux/actions/workoutForm";
// import { styles } from '../styles/styles'

export function AddWorkout({ route, navigation }) {
    function handleSubmit() {
        console.log('handleSubmit')
    }
    return (
        <ConnectedForm />
    );
}

// export class AddWorkout extends React.Component {

  
//     render() {
//         return (
//             <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//               <Text style={{ fontSize: 30 }}>This is a modal!</Text>
//               <Button onPress={() => navigation.goBack()} title="Dismiss" />
//             </View>
//         );
//     }
// }

class Form extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            keyboardType: "numeric",
            name: "",
            notes: "",
            sets: [
                {
                    'setNbr': 1,
                    'reps': '',
                    // 'rpe': '',
                    'weight': ''
                }
            ]
            
        }
    }

    AddWorkoutCallback = () => {
        console.log('addworkoutcallback')
    }

    updateWorkout = (setNbr, reps, weight) => {
        console.log(res, weight)
    }

    handleDelete = async (setNbr) => {
        const setUpdate = this.props.workoutForm.sets.filter(i => i.setNbr != setNbr)
        let index = 1;
        await setUpdate.forEach(i => {
            i.setNbr = index
            index++;
        })
        console.log("setUpdate", setUpdate)
        // this.setState({
        //     sets: setUpdate
        // })
        this.props.updateSets(setUpdate)
        console.log(JSON.stringify(this.props.workoutForm.sets))
    }

    handleRepUpdate = (setNbr, reps) => {
        let setUpdate = []
        this.props.workoutForm.sets.forEach(i => {
            if (i.setNbr == setNbr) {
                i.reps = reps
            }
            setUpdate.push(i)
        })
        // this.setState({sets : setUpdate})
        this.props.updateSets(setUpdate)
        console.log(JSON.stringify(this.state.sets))
    }

    handleWeightUpdate = (setNbr, weight) => {
        let setUpdate = []
        this.props.workoutForm.sets.forEach(i => {
            if (i.setNbr == setNbr) {
                i.weight = weight
            }
            setUpdate.push(i)
        })
        // this.setState({sets : setUpdate})
        this.props.updateSets(setUpdate)
        console.log(JSON.stringify(this.state.sets))
    }

    AddSet = () => {
        // console.log(this.state.sets.slice(-1).pop().setNbr)
        const setNbr = this.props.workoutForm.sets.slice(-1).pop().setNbr
        const set = {
            'setNbr': setNbr + 1,
            'reps': '',
            // 'rpe': '',
            'weight': ''
        }

        const setsJoined  = this.props.workoutForm.sets.concat(set)
        this.props.updateSets(setsJoined)
        // this.setState({ sets: setsJoined })
    }

    async componentWillMount() {
        await this.props.updateSets(this.state.sets)
    }

    render() {
        return (
            <KeyboardAvoidingView
                style={styles.container}
                behavior="padding"
                keyboardVerticalOffset={this.state.keyboardType === 'numeric' ? 40 : 0}
                >
                <View style={styles.row}>
                    <Text style={styles.label}>
                        Workout Name:
                    </Text>
                    <TextInput
                        style={styles.inputBox}
                        value={this.props.workoutForm.name}
                        onChangeText={name => this.props.updateWorkoutName(name)}
                        placeholder='e.g. Bench Press'
                    />
                </View>
                <View style={styles.row}>
                    <Text style={[styles.label, {paddingRight: '36%'}]}>
                        Notes:
                    </Text>
                    <TextInput
                        style={styles.inputBox}
                        value={this.props.workoutForm.notes}
                        onChangeText={notes => this.props.updateWorkoutNotes(notes)}
                        placeholder='Notes'
                        // autoCapitalize='none'
                    />
                </View>

                <Table
                    // sets={this.state.sets}
                    sets={this.props.workoutForm.sets}
                    AddWorkoutCallback={this.AddWorkoutCallback}
                    removeWorkoutCallback={this.handleDelete}
                    handleRepCallback={this.handleRepUpdate}
                    handleWeightCallback={this.handleWeightUpdate}
                />
                <IconButton icon="pencil-plus" style={{left: 300}} onPress={() => this.AddSet()} />
                <Button title="add set" onPress={() => this.AddSet()} />
                <TouchableOpacity style={styles.button} onPress={this.handleSignUp}>
                    <Text style={styles.buttonText}>Add</Text>
                </TouchableOpacity>
                <DoneBar
                    keyboardType={this.state.keyboardType}
                    onDone={() => console.log('done!')}
                />
            </KeyboardAvoidingView>
        )
    }
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ updateWorkoutName, updateWorkoutNotes, updateSets }, dispatch)
}

const mapStateToProps = state => {
    return {
        workoutForm: state.workoutForm,
    }
}

const ConnectedForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(Form)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        // alignItems: 'center',
        // justifyContent: 'center'
    },
    inputBox: {
        width: '40%',
        // margin: 10,
        padding: 10,
        fontSize: 16,
        // borderColor: '#d3d3d3',
        // borderBottomWidth: 1,
        textAlign: 'center'
    },
    repsInputBox: {
        flex: 1,
        backgroundColor: 'white',
        borderColor: 'black', 
        borderWidth: .3
    },
    button: {
        marginTop: 30,
        marginBottom: 20,
        paddingVertical: 5,
        alignItems: 'center',
        backgroundColor: 'lightblue',
        borderColor: 'lightblue',
        borderWidth: 1,
        borderRadius: 5,
        width: 100
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff'
    },
    buttonSignup: {
        fontSize: 12
    },
    row: {
        flexDirection: 'row',
        borderColor: '#d3d3d3',
        borderBottomWidth: 1,
    },
    label: {
        padding: 10,
        paddingLeft: '5%',
        paddingRight: '20%',
        fontSize: 16
    },

})