// import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { COLOR, Color } from './config/Color'
import {
  StyleSheet,
  Text, StatusBar,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  Alert, ImageBackground
} from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import SvgUri from 'react-native-svg-uri';
import { horizontalScale, verticalScale, moderateScale } from './config/Device'
import { getData, setData } from './storage/Storage';
import { requestUserPermission, send } from "./utils/Notifications";
const { width, height } = Dimensions.get('screen')
import { CreateUser, readUser, reasdCache, saveCache } from "./config/Realm";

export default function OnBoarding({ navigation }) {
  const [isViwed, setViewd] = useState('')

  useEffect(() => {
    requestUserPermission()
    send()

    // getData('introViewed')
    const userData = readUser();
    const appCache = reasdCache();

    let loggedInUser = 0;
    let appHasVisitted = 0;
    if (userData.length) {
      loggedInUser = userData[0]['user_id']

    }
    if (appCache.length) {
      appHasVisitted = appCache[0]['intro_viewed']
    }

    try {
      if (loggedInUser > 0 && appHasVisitted == 1) {
        // navigation.navigate('DashboardTabs')
      } else if (appHasVisitted == 1) {
        // navigation.navigate('LoginRegister')
      } else {
        saveCache(1)
      }
    } catch (e) {
      saveCache(1)

    }


  }, []);



  return (
  
    <ImageBackground
      source={require('./assets/bg.png')} // Replace with the actual path to your image
      style={styles.container}>
           <Text style={styles.centeredText}>
        Signup and explore various agricultural products
      </Text>
      <TouchableOpacity onPress={()=>navigation.navigate('LoginRegister')} style={{ marginTop:verticalScale(50),width: "80%", height: verticalScale(60), backgroundColor: 'green', borderRadius: moderateScale(10), alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ color: COLOR.heading1, fontSize: moderateScale(20) }}>Get Started</Text>
      </TouchableOpacity>
      <StatusBar backgroundColor={COLOR.loginBgColor} barStyle={COLOR.statusBarColor} />
    </ImageBackground>

  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.darkBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button2: {
    borderWidth: 1,
    borderColor: COLOR.dashBoardMainColor,
    marginLeft: horizontalScale(10),
    marginRight: horizontalScale(10),
    marginTop: verticalScale(10),
    marginBottom: verticalScale(10),
    height: verticalScale(50),
    width: horizontalScale(130),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25
  },
  button1: {
    backgroundColor: COLOR.sliderActive,
    margin: 10,
    height: verticalScale(50),
    width: horizontalScale(130),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25
  },
  centeredText: {
    alignSelf: 'center', // Center the text horizontally
    fontSize: moderateScale(30),
    textAlign: 'center', // Center the text horizontally
    color: '#fff',
    // Add any other text styles you want here
    marginTop:verticalScale(250),
  },
});