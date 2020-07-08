import React from 'react'
import { View, StyleSheet, Text } from 'react-native'

class SplashScreen extends React.Component {
    

    render() {
        return (
            <View style={styles.container}>
                <Text>
                    SplashScreen
                </Text>
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
    }
})

export default SplashScreen