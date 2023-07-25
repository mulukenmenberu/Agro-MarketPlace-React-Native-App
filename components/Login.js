
import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,ImageBackground,
  Button, StatusBar,
  TouchableOpacity, Dimensions, Keyboard, Pressable, Alert
} from "react-native";
import { ActivityIndicator, Colors } from 'react-native-paper';
import NetInfo from '@react-native-community/netinfo';

import { useSelector, useDispatch } from 'react-redux'
import { Card, TextInput } from "react-native-paper";
import { COLOR } from "../config/Color";
import { signIn, resetState } from '../redux/reducers/authReducer'
import { horizontalScale, verticalScale, moderateScale } from '../config/Device'
const { width, height } = Dimensions.get('screen')
import { CreateUser } from "../config/Realm";
export default function Login({ chnagePage, navigation }) {

  const [email, setEmil] = useState('')
  const [password, setPassword] = useState('')
  const [loginProcess, setLogginProcess] = useState(false)
  const [error, setError] = useState({ field: '', error: '' })
  const [showPassword, setShowPassword] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [loginErrormessage, setLoginError] = useState('');
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);


  const dispatch = useDispatch()
  const { userInfo, loading, success, errorMessage } = useSelector((state) => state.user)

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const chnagePages = (value) => {
    chnagePage(value)
  }
  const doLogin = () => {
    if (!isConnected) {
      Alert.alert("Network error. please check your data or connect to wifi")
      return;
    }
    setError({ field: '', error: '' })

    if (email == '') {
      const e = { error: '', message: '' }
      e.field = 'email'
      e.message = 'please enter a valid email'
      setError(e)

    } else if (password == '') {
      const e = { error: '', message: '' }
      e.field = 'password'
      e.message = 'password is required'
      setError(e)

    }

    else {
      setLogginProcess(true)
      const data = {
        "username": email,
        "password": password
      }
      dispatch(signIn(data))

      setLoginError('')
      dispatch(resetState())

    }

  }
  useEffect(() => {

    try {
      if (userInfo.access_token) {
        setLogginProcess(false)
        const user_log = { 'access_token': "visited", "user_id": userInfo.students.id, 'full_name': userInfo.students.full_name }

        CreateUser('visited', userInfo.students.id, userInfo.students.full_name)

        navigation.navigate('DashboardTabs')

      } else if (!success) {
        setLogginProcess(false)
        setLoginError(errorMessage)


      }
    } catch (e) { }

    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };

  }, [success, userInfo]);


  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });

    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    // Clean up the event listeners when component unmounts
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <ImageBackground
    source={require('../assets/6.png')} // Replace with the actual path to your image
    style={styles.container}>

{/*  
      <Pressable style={isKeyboardVisible ? styles.topCardKeyBoard : styles.topCard} onPress={dismissKeyboard}>
        <Text style={{ color: COLOR.heading1, fontSize: moderateScale(25), flex: 1, margin: 15, marginTop: verticalScale(20), fontWeight: 'bold' }}>Log In</Text>
      </Pressable> */}

      <Card style={isKeyboardVisible ? styles.registerCardKeyBoard : styles.registerCard} onPress={dismissKeyboard}>

        <View style={{ marginLeft: horizontalScale(30), marginRight: horizontalScale(30), marginTop: verticalScale(50) }}>

          <TextInput
            label="Email"
            value={email}
            style={styles.textBox}
            right={<TextInput.Icon size={moderateScale(20)} icon="email" />}
            underlineColorAndroid="transparent"
            onChangeText={text => setEmil(text)}
          />
          {error.field == 'email' && (
            <Text style={{ fontSize: moderateScale(15), color: 'red' }}>{error.message}</Text>
          )}
          <TextInput
            placeholder="Password"
            value={password}
            style={styles.textBox}
            secureTextEntry={!showPassword}
            right={<TextInput.Icon onPress={() => toggleShowPassword(!showPassword)} size={moderateScale(20)} icon={!showPassword ? "eye" : "eye-off"} />}
            underlineColorAndroid="transparent"
            onChangeText={text => setPassword(text)}
          />
          {error.field == 'password' && (
            <Text style={{ fontSize: moderateScale(15), color: 'red' }}>{error.message}</Text>
          )}


          <Pressable style={styles.button} onPress={() => doLogin()}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
              {
                loginProcess ? <ActivityIndicator animating={true} color={COLOR.darkWhite} /> : ''
              }
              <Text style={{ color: COLOR.textonButton, fontSize: moderateScale(15) }}>   Log In</Text>
            </View>
          </Pressable>
          <Text style={{ color: 'red', alignSelf: 'center' }}>{loginErrormessage}</Text>
          <Text style={{ fontSize: moderateScale(15), color: COLOR.textColor, alignSelf: 'center' }}>Don't have an account? <Text onPress={() => chnagePages('register')} style={{ color: COLOR.sliderActive }}>Sign Up</Text></Text>
          <View style={{ flexDirection: 'row', paddingVertical: verticalScale(20), alignSelf: 'center' }}>

          </View>

        </View>
      </Card>


      <StatusBar backgroundColor={COLOR.darkBg} barStyle={COLOR.statusBarColor2} />

   
    </ImageBackground>

  );
}
const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: COLOR.darkBg,
  },

  registerCard: {
    backgroundColor: COLOR.darkWhite,
    width: width,
    height: "50%",
    alignSelf: 'center',
    marginTop: verticalScale(320)

  },

  topCard: {
    backgroundColor: COLOR.darkBg,
    width: width,
    height: height / 2,
    paddingTop: verticalScale(90),

  },
  registerCardKeyBoard: {
    backgroundColor: COLOR.darkWhite,
    width: width,
    height: "50%",
    alignSelf: 'center',
    marginTop: verticalScale(250)


  },
  topCardKeyBoard: {
    backgroundColor: COLOR.darkBg,
    width: width,
    height: height / 2,
    paddingTop: verticalScale(40),

  },
  button: {
    backgroundColor: COLOR.sliderActive,
    margin: 15,
    height: verticalScale(50),
    width: horizontalScale(300),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: moderateScale(45)
  },
  textBox: {
    marginTop: verticalScale(10),
    borderTopLeftRadius: moderateScale(10),
    borderTopRightRadius: moderateScale(10),
    borderBottomLeftRadius: moderateScale(10),
    borderBottomRightRadius: moderateScale(10),
    backgroundColor: '#fff',
    fontSize: moderateScale(15),
  }
})