import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();

class Confirmation extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text> Account has been created,{"\n"}please check your email to verify </Text>
                <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Sign in')}>
                    <Text style={styles.buttonText}> Login </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        marginTop: 30,
        marginBottom: 20,
        paddingVertical: 5,
        alignItems: 'center',
        backgroundColor: '#F6820D',
        borderColor: '#F6820D',
        borderWidth: 1,
        borderRadius: 5,
        width: 200
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff'
    },
    buttonSignup: {
        fontSize: 12
    }
})

export default Confirmation