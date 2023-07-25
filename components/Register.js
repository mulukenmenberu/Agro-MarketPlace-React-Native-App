
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,ImageBackground,
  Image,
  Button, StatusBar,
  TouchableOpacity, Dimensions, Alert, Keyboard, TouchableWithoutFeedback, Pressable
} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { ActivityIndicator, Colors } from 'react-native-paper';
import NetInfo from '@react-native-community/netinfo';

import { Card, TextInput } from "react-native-paper";
import { COLOR } from "../config/Color";
import { horizontalScale, verticalScale, moderateScale } from '../config/Device'


import { useSelector, useDispatch } from 'react-redux'
import { signUp, resetState } from '../redux/reducers/authReducer'
import { CreateUser } from "../config/Realm";


const { width, height } = Dimensions.get('screen')
export default function Register({ chnagePage, navigation }) {
  const [fullname, setFullName] = useState('')
  const [email, setEmil] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [isCreating, setIsCreating] = useState(false)
  const [error, setError] = useState({ field: '', error: '' })
  const [isConnected, setIsConnected] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [setRegistrMessage, setRegisterError] = useState('');
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);



  const dispatch = useDispatch()
  const { userInfo, loading, success, errorMessage } = useSelector((state) => state.user)
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };



  const chnagePages = (value) => {
    chnagePage(value)
  }

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };


  const doRegister = () => {
    if (!isConnected) {
      Alert.alert("Network error. please check your data or connect to wifi")
      return;
    }
    setError({ field: '', error: '' })

    if (fullname == '') {
      const e = { error: '', message: '' }
      e.field = 'fullname'
      e.message = 'please enter a valid full anme'
      setError(e)

    } else if (password == '') {
      const e = { error: '', message: '' }
      e.field = 'password'
      e.message = 'password is required'
      setError(e)

    }

    else {
      setIsCreating(true)
      const data = {
        "full_name": fullname,
        "email": email,
        "mobile": phone,
        "password": password,
        "status": 1
      }
      dispatch(signUp(data))
      setRegisterError('')

      dispatch(resetState())



    }

  }

  useEffect(() => {
    try {
      if (userInfo.status == 'success') {
        setIsCreating(false)
        CreateUser('visited', userInfo.students.id, userInfo.students.full_name)
        // navigation.navigate('VerifyPhone')
        navigation.navigate('DashboardTabs')

      } else if (userInfo.msg) {
        setIsCreating(false)
        setRegisterError(userInfo.msg)
      } else if (!success) {
        setIsCreating(false)
        setRegisterError(errorMessage)


      }
    } catch (e) { }



    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    }, []);

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
    source={require('../assets/4.png')} // Replace with the actual path to your image
    style={styles.container}>

{/*  
      <Pressable style={isKeyboardVisible ? styles.topCardKeyBoard : styles.topCard} onPress={dismissKeyboard}>
        <Text style={{ color: COLOR.heading1, fontSize: moderateScale(25), flex: 1, margin: 15, marginTop: verticalScale(20), fontWeight: 'bold' }}>Log In</Text>
      </Pressable> */}

      <Card style={isKeyboardVisible ? styles.registerCardKeyBoard : styles.registerCard} onPress={dismissKeyboard} >

        <View style={{ marginLeft: horizontalScale(30), marginRight: horizontalScale(30), marginTop: verticalScale(50) }}>

          <TextInput
            label="Full Name"
            value={fullname}
            style={styles.textBox}
            right={<TextInput.Icon size={moderateScale(20)} icon="account" />}
            underlineColorAndroid="transparent"
            onChangeText={text => setFullName(text)}
          />
          {error.field == 'fullname' && (
            <Text style={{ fontSize: moderateScale(15), color: 'red' }}>{error.message}</Text>
          )}
          <TextInput
            label="Email (optional)"
            value={email}
            keyboardType="email-address"
            style={styles.textBox}
            right={<TextInput.Icon size={moderateScale(20)} icon="email" />}
            underlineColorAndroid="transparent"
            onChangeText={text => setEmil(text)}
          />
          <TextInput
            label="Phone"
            value={phone}
            keyboardType="phone-pad"
            style={styles.textBox}
            right={<TextInput.Icon size={moderateScale(20)} icon="phone" />}
            underlineColorAndroid="transparent"
            onChangeText={text => setPhone(text)}
          />

          <TextInput
            label="Password"
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


          <Pressable style={styles.button} onPress={() => doRegister()}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
              {
                isCreating ? <ActivityIndicator animating={true} color={COLOR.darkWhite} /> : ''
              }
              <Text style={{ color: COLOR.textonButton, fontSize: moderateScale(15) }}>  Create Account</Text>
            </View>
          </Pressable>

          <Text style={{ color: 'red', alignSelf: 'center' }}>{setRegistrMessage}</Text>

        </View>
      </Card>


      <StatusBar backgroundColor={COLOR.darkBg} barStyle={COLOR.statusBarColor2} />

</ImageBackground>
    

  );
}
const styles = StyleSheet.create({
  textBoxContainer: {
    position: 'relative',
    width: '100%',
    height: 50,
    marginBottom: 20,
  },
  textBoxHidden: {
    width: '100%',
    height: '100%',
    padding: 10,
    paddingRight: 40,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },
  container: {
    height: height,
    backgroundColor: COLOR.lightWhite,
  },

  registerCard: {
    backgroundColor: COLOR.darkWhite,
    width: width,
    height: "50%",
    alignSelf: 'center',
    marginTop: verticalScale(270)

  },
  registerCardKeyBoard: {
    backgroundColor: COLOR.darkWhite,
    width: width,
    height: "50%",
    alignSelf: 'center',
    marginTop: verticalScale(320)

  },
  topCardKeyBoard: {
    backgroundColor: COLOR.darkBg,
    width: "100%",
    height: "50%",
    paddingTop: verticalScale(10),

  },
  topCard: {
    backgroundColor: COLOR.darkBg,
    width: "100%",
    height: "50%",
    paddingTop: verticalScale(90),

  },
  button: {
    backgroundColor: COLOR.sliderActive,
    marginTop: verticalScale(15),
    marginBottom: verticalScale(15),
    marginLeft: horizontalScale(15),
    marginRight: horizontalScale(15),

    height: horizontalScale(50),
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
    fontSize: moderateScale(15),
    backgroundColor: '#fff'
  }
})