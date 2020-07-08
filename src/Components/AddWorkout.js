import React from 'react'
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity } from 'react-native';
import { DataTable, Checkbox, Divider } from 'react-native-paper';
import { Table } from './Table'
// import { styles } from '../styles/styles'

export function AddWorkout({ route, navigation }) {
    return (
        <Form />
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
            name: "",
            notes: "",
            sets: [
                {
                    'setNbr': 1,
                    'reps': '',
                    'rpe': '',
                    'weight': ''
                }
            ]
            
        }
    }

    AddWorkoutCallback = () => {
        console.log('addworkoutcallback')
    }

    AddSet = () => {
        // console.log(this.state.sets.slice(-1).pop().setNbr)
        const setNbr = this.state.sets.slice(-1).pop().setNbr
        const set = {
            'setNbr': setNbr + 1,
            'reps': '',
            'rpe': '',
            'weight': ''
        }

        const setsJoined  = this.state.sets.concat(set)
        // console.log(this.state.sets)
        this.setState({ sets: setsJoined })
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.row}>
                    <Text style={styles.label}>
                        Workout Name:
                    </Text>
                    <TextInput
                        style={styles.inputBox}
                        value={this.state.name}
                        onChangeText={name => this.setState({name})}
                        placeholder='e.g. Bench Press'
                    />
                </View>
                <View style={styles.row}>
                    <Text style={[styles.label, {paddingRight: '36%'}]}>
                        Notes:
                    </Text>
                    <TextInput
                        style={styles.inputBox}
                        value={this.state.notes}
                        onChangeText={notes => this.setState({notes})}
                        placeholder='Notes'
                        // autoCapitalize='none'
                    />
                </View>

                <Table
                    sets={this.state.sets}
                    AddWorkoutCallback={this.AddWorkoutCallback}
                />
                <Button title="add set" onPress={() => this.AddSet()} />
                <TouchableOpacity style={styles.button} onPress={this.handleSignUp}>
                    <Text style={styles.buttonText}>Add</Text>
                </TouchableOpacity>
            </View>
        )
    }
};

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