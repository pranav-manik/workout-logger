import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native';
import { DataTable, Checkbox, Divider, TextInput, IconButton } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../styles/styles'
import LiftCheckbox from './LiftCheckbox'
import { connect, useSelector } from 'react-redux'


function RemoveWorkoutButton(props) {
    
    function handleDelete() {
        props.removeWorkoutCallback()
    }

    return(
        <IconButton 
          {...props} 
          icon='minus-circle'
          color='red'
          size={20}
          style={{top: 9}}
          onPress={handleDelete} 
        />
    );
}

export function Table(props) {

    function handleDelete(setNbr) {
        props.removeWorkoutCallback(setNbr)
    }

    function handleRepUpdate(setNbr, rep) {
        props.handleRepCallback(setNbr, rep)
    }

    function handleWeightUpdate(setNbr, weight) {
        props.handleWeightCallback(setNbr, weight)
    }

    const setsList = [];
    const setsProp = useSelector(state => state.workoutForm.sets)

    useEffect(() => {
        setsProp.forEach( s => {
            setsList.push(
                <SetRow 
                    setNbr={s.setNbr}
                    reps={s.reps}
                    weight={s.weight}
                    removeWorkoutCallback={handleDelete}
                    handleRepCallback={handleRepUpdate}
                    handleWeightCallback={handleWeightUpdate}
                />); 
            }
        );
    }, [setsProp])

    
    setsProp.forEach( s => {
        setsList.push(
            <SetRow 
                setNbr={s.setNbr}
                reps={s.reps}
                weight={s.weight}
                removeWorkoutCallback={handleDelete}
                handleRepCallback={handleRepUpdate}
                handleWeightCallback={handleWeightUpdate}
            />); 
        }
    );

    // try {
    //     setsProp.forEach( s => {
    //         setsList.push(
    //             <SetRow 
    //                 setNbr={s.setNbr}
    //                 reps={s.reps}
    //                 weight={s.weight}
    //                 removeWorkoutCallback={handleDelete}
    //                 handleRepCallback={handleRepUpdate}
    //                 handleWeightCallback={handleWeightUpdate}
    //             />); 
    //         }
    //     );
    // }
    // catch(err) {
    //     const sets = [{
    //           "reps": "",
    //           "setNbr": 1,
    //           "weight": "",
    //         }]
    //     sets.forEach( s => {
    //         setsList.push(
    //             <SetRow 
    //                 setNbr={s.setNbr}
    //                 reps={s.reps}
    //                 weight={s.weight}
    //                 removeWorkoutCallback={handleDelete}
    //                 handleRepCallback={handleRepUpdate}
    //                 handleWeightCallback={handleWeightUpdate}
    //             />); 
    //         }
    //     );
    // }

    return(

        <DataTable>
            <DataTable.Header>
                <DataTable.Title>
                    <Text style={ {color: 'grey', fontWeight : 'bold'} }>
                        Set
                    </Text>
                </DataTable.Title>
                <DataTable.Title>Reps</DataTable.Title>
                <DataTable.Title>Weight</DataTable.Title>
                <Ionicons name="ios-remove-circle-outline" size={20} color="red" style={{left: -10, bottom: -13}}/>
            </DataTable.Header>
            { setsList }
        </DataTable>

    );
}


function SetRow(props) {
    
    function handleDelete() {
        props.removeWorkoutCallback(props.setNbr)
        // alert('')
    }

    function handleRepUpdate(rep) {
        props.handleRepCallback(props.setNbr, rep)
    }
    function handleWeightUpdate(weight) {
        props.handleWeightCallback(props.setNbr, weight)
    }

    if (props.setNbr == 1) {
        return (
            <DataTable.Row>
                <DataTable.Cell>{props.setNbr}</DataTable.Cell>
                {/* <DataTable.Cell>{props.reps}</DataTable.Cell> */}
                {/* <DataTable.Cell>{props.weight} lbs</DataTable.Cell> */}
                <View style={{padding: 20}}></View>
                <TextInput style={{flex: 1, backgroundColor: 'white', borderColor: 'grey', borderWidth: '.3'}}
                    keyboardType="numeric"
                    maxLength={3}
                    onChangeText={handleRepUpdate}
                    value={props.reps}
                >
                </TextInput>
                <View style={{padding: 30}}></View>
                <TextInput style={{flex: 1, backgroundColor: 'white', borderColor: 'grey', borderWidth: '.3'}}
                    keyboardType="numeric"
                    maxLength={3}
                    onChangeText={handleWeightUpdate}
                    value={props.weight}
                >
                </TextInput>
                <DataTable.Cell style={{paddingTop: 20}}>  lbs</DataTable.Cell>
                <View style={{padding: 21}}></View>
            </DataTable.Row>
        );
    }
    else {
        return (
            <DataTable.Row>
                <DataTable.Cell>{props.setNbr}</DataTable.Cell>
                {/* <DataTable.Cell>{prop222s.reps}</DataTable.Cell> */}
                {/* <DataTable.Cell>{props.weight} lbs</DataTable.Cell> */}
                <View style={{padding: 20}}></View>
                <TextInput style={{flex: 1, backgroundColor: 'white', borderColor: 'grey', borderWidth: '.3'}}
                    keyboardType="numeric"
                    maxLength={3}
                    onChangeText={handleRepUpdate}
                    value={props.reps}
                >
                </TextInput>
                <View style={{padding: 30}}></View>
                <TextInput style={{flex: 1, backgroundColor: 'white', borderColor: 'grey', borderWidth: '.3'}} 
                    keyboardType="numeric"
                    maxLength={3}
                    onChangeText={handleWeightUpdate}
                    value={props.weight}
                >
                </TextInput>
                <DataTable.Cell style={{paddingTop: 20}}>  lbs</DataTable.Cell>
                {/* <View style={{padding: 20}}></View> */}
                <RemoveWorkoutButton
                    removeWorkoutCallback={handleDelete}
                    setNbr={props.setNbr}
                />
            </DataTable.Row>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({  }, dispatch)
}

const mapStateToProps = state => {
    return {
        workoutForm: state.workoutForm
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Table)