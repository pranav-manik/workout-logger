import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { DefaultTheme } from 'react-native-paper';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.05)',
      // alignItems: 'center',
      // justifyContent: 'center',
    },
    addButton: {
        // position: 'fixed',
        borderWidth:1,
        borderColor:'rgba(0,0,0,0.2)',
        backgroundColor:'#fff',
        width: 66,
        height: 66,
        borderRadius: 33,
        justifyContent: 'center',
        alignItems:'center',
        position: 'absolute',
        bottom: 50,
        right: 30,
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
      bottom: 50,
      right: 30,
      transform: [{ rotate: "45deg" }]
    },
    buttonTextStyle : {
        color:'red',
        fontSize: 40,
        fontFamily: 'Cochin',
        marginBottom: 10,
    },
    loading : {
      top: 150,
      alignItems: 'center',
      justifyContent: 'center',
    },
    deleteSwipeout: {
      flex: 1,
      backgroundColor: '#f70019',
      justifyContent: 'center',
      // paddingLeft: 20
    },
    deleteSwipeoutMsg: {
      color: '#fff',
      left: 18,
      fontWeight: 'bold',
    }



    
  });