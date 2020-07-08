import React from 'react'
import { View, TextInput, StyleSheet, TouchableOpacity, Text, Button, Alert } from 'react-native'
import Firebase from '../../config/Firebase'
import { storeToken, getToken } from '../Token'
import { bindActionCreators } from 'redux'
import { connect, getStore } from 'react-redux'
import { updateEmail, updatePassword, login } from '../redux/actions/user'
import { updateIsLoggedIn } from '../redux/actions/loginState'

class Login extends React.Component {

    handleLogin = () => {
        if (!this.props.user.email ) return Alert.alert('Error', "Please enter a valid email")
        if (this.props.user.password == null) return Alert.alert('Error', "Please enter a Password")
        this.props.login()
        // this.props.updateIsLoggedIn()
        // console.log('getStore().isLoggedIn', getStore().isLoggedIn)
        // this.props.navigation.navigate('Workouts', { screen: 'Workouts' })
        // this.props.navigation.navigate('Profile')
        // const { email, password } = this.state
        
        // Firebase.auth()
        //     .signInWithEmailAndPassword(email, password)
        //     .then((res) => {
        //         storeToken(JSON.stringify(res.user));
        //         console.log(res.user);
        //         this.props.navigation.navigate('Profile');
        //     })
        //     .catch(error => console.log(error))
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.inputBox}
                    value={this.props.user.email}
                    onChangeText={email => this.props.updateEmail(email)}
                    placeholder='Email'
                    autoCapitalize='none'
                />
                <TextInput
                    style={styles.inputBox}
                    value={this.props.user.password}
                    onChangeText={password => this.props.updatePassword(password)}
                    placeholder='Password'
                    secureTextEntry={true}
                />
                <TouchableOpacity style={styles.button} onPress={this.handleLogin}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <Button
                    title="Don't have an account yet? Sign up"
                    onPress={() => this.props.navigation.navigate('Signup')}
                />
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
    inputBox: {
        width: '85%',
        margin: 10,
        padding: 15,
        fontSize: 16,
        borderColor: '#d3d3d3',
        borderBottomWidth: 1,
        textAlign: 'center'
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

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ updateEmail, updatePassword, login, updateIsLoggedIn }, dispatch)
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
)(Login)

// export default Login