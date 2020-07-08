import React from 'react'
import { AsyncStorage} from "react-native";

export async function storeToken(user) {
    try {
       await AsyncStorage.setItem("userData", JSON.stringify(user));
       await AsyncStorage.setItem("IsSignedIn", 'true');
    } catch (error) {
      console.log("Something went wrong", error);
    }
  }

export async function getToken(user) {
    try {
      let userData = await AsyncStorage.getItem("userData");
      let data = JSON.parse(userData);
    //   console.log(data);
      return userData;
    } catch (error) {
      console.log("Something went wrong", error);
    }
  }

export async function removeToken(user) {
    try {
        await AsyncStorage.removeItem("userData");
        await AsyncStorage.setItem("IsSignedIn", 'false');
      } catch (error) {
        console.log("Something went wrong", error);
      }
}

export async function getIsLoggedIn() {
    try {
      let IsSignedIn = await AsyncStorage.getItem("IsSignedIn");
      console.log(IsSignedIn)
    //   let data = JSON.parse(IsSignedIn);
      
      return IsSignedIn;
    } catch (error) {
      console.log("Something went wrong", error);
    }
  }