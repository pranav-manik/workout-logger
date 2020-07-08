import React from 'react'
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { DataTable, Checkbox, Divider } from 'react-native-paper';
import { styles } from './styles/styles'
import LiftCheckbox from './Components/LiftCheckbox'

export function ViewWorkout({ route, navigation }) {
    const { itemId } = route.params;
    const { itemName } = route.params;
    const { itemSets } = route.params;
    const { itemNotes } = route.params;
    return (
        <View style={styles.container, { flex: 1, alignItems: 'center', backgroundColor: '#fff' }}>
            {/* <Text style={{fontSize : 22, fontWeight : 'bold', textDecorationLine : 'underline'}}>{itemName}</Text> */}
            <Text>Notes: {itemNotes}</Text>
            <SetTable
                sets={itemSets}
            />
            <Button title="Go back" onPress={() => navigation.goBack()} />
        </View>
    );
}


function SetTable(props) {

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
    <DataTable.Row>
        <DataTable.Cell>{props.setNbr}
        <TextInput
            value={props.setNbr}
            onChangeText={name => this.setState({name})}
        />
        </DataTable.Cell>
        <DataTable.Cell>{props.reps}</DataTable.Cell>
        <DataTable.Cell>{props.weight} lbs</DataTable.Cell>
        <LiftCheckbox />
    </DataTable.Row>);
}
