import React from 'react'
import { IconButton } from 'react-native-paper';
// import { styles } from '../styles/styles'

import Animated, { Easing } from 'react-native-reanimated';
import { StyleSheet, Text } from 'react-native';

const { Value, timing, event, cond, eq } = Animated;

export default class AddWorkoutButton extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            toggle: false,
            deg: 0
        }

        this._rotate = new Value(0);
        this._config = {
        duration: 500,
        toValue: 45,
        easing: Easing.inOut(Easing.ease),
        };

        this._config2 = {
            duration: 10,
            toValue: 0,
            easing: Easing.inOut(Easing.ease),
            };

        // this._anim = timing(this._rotate, this._config);

        this.handleToggle = () => {
            console.log(this.state.toggle)
            this.setState({ toggle: !this.state.toggle })
            timing(this._rotate, this._config).start()
            // this.state.toggle ? 
            // this._anim = timing(this._rotate, this._config).start() :
            // this._anim = timing(this._rotate, this._config2).start()
        }

    }

    // handleToggle() {
        
    // }
    
    render() {
        const toggle = this.state.toggle;
        return (
            <>
            <Animated.View style={ [styles.buttonBox, { transform: [{ rotate: this._rotate }] }] } >
                <IconButton 
                // {...props} 
                icon='plus'
                // style={toggle ? (styles.addButton, styles.addButtonClicked) : styles.addButton }
                // onPress={() => { this.setState({ toggle: !toggle }); }}
                style={styles.addButton}
                onPress={() => this.handleToggle()}
                />
            </Animated.View>
            </>
        );
    }
  }

  const styles = StyleSheet.create({
    buttonBox:  {
        // borderWidth:1,
        // borderColor:'rgba(0,0,0,0.2)',
        backgroundColor:'#fff',
        width: 66,
        height: 66,
        borderRadius: 33,
        // justifyContent: 'center',
        // alignItems:'center',
        position: 'absolute',
        backgroundColor: "red",
        bottom: 50,
        right: 30,
    },
    addButton: {
        borderWidth:1,
        borderColor:'rgba(0,0,0,0.2)',
        backgroundColor:'#fff',
        width: 66,
        height: 66,
        borderRadius: 33,
        justifyContent: 'center',
        alignItems:'center',
        position: 'absolute',
        // bottom: 50,
        // right: 30,
    },
    addButtonClicked: {
        borderWidth:1,
        borderColor:'rgba(0,0,0,0.2)',
        backgroundColor:'#fff',
        width: 66,
        height: 66,
        borderRadius: 33,
        justifyContent: 'center',
        alignItems:'center',
        position: 'absolute',
        // bottom: 50,
        // right: 200,
        transform: [{ rotate: "45deg" }]
      },
  });