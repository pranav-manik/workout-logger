import React, { useState } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native';
import { DataTable, Checkbox, Divider, TextInput } from 'react-native-paper';
import { styles } from '../styles/styles'
import LiftCheckbox from './LiftCheckbox'


export function Table(props) {


    const setsList = [];
    
    props.sets.forEach( s => {
        setsList.push(
            <SetRow 
                setNbr={s.setNbr}
                reps={s.reps}
                weight={s.weight}
            />); 
        }
    );

    // const [setCount, addSet] = useState(1);

    // AddSet = () => {
    //     this.props.addTaskCallback()
    // }

    return(

        <DataTable>
            <DataTable.Header>
                <DataTable.Title>
                    <Text style={ {color: 'black', fontWeight : 'bold'} }>
                        Set
                    </Text>
                </DataTable.Title>
                <DataTable.Title>Reps</DataTable.Title>
                <DataTable.Title>Weight</DataTable.Title>
                <Checkbox.IOS status='checked' />
            </DataTable.Header>
            { setsList }
        </DataTable>

    );
}


function SetRow(props) {
    return (
        //         <Swipeout right={[
        //     {
        //       text: 'Button'
        //     }
        //   ]}>
    <DataTable.Row>
        <DataTable.Cell>{props.setNbr}</DataTable.Cell>
        {/* <DataTable.Cell>{props.reps}</DataTable.Cell> */}
        {/* <DataTable.Cell>{props.weight} lbs</DataTable.Cell> */}
        <View style={{padding: 20}}></View>
        <TextInput style={{flex: 1}}></TextInput>
        <View style={{padding: 30}}></View>
        <TextInput style={{flex: 1}}></TextInput>
        <DataTable.Cell style={{paddingTop: 20}}>  lbs</DataTable.Cell>
        {/* <View style={{padding: 20}}></View> */}
        <LiftCheckbox />
    </DataTable.Row>
    // </Swipeout>
    );
}