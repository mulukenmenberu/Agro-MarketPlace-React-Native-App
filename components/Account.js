import { StyleSheet, Text, View, Platform, SafeAreaView, StatusBar, Pressable, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { horizontalScale, verticalScale, moderateScale } from '../config/Device'
import SvgUri from 'react-native-svg-uri';
import Icon from 'react-native-vector-icons/Entypo'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { Switch } from 'react-native-paper';
 
import { COLOR, Color } from '../config/Color';
import RNRestart from 'react-native-restart'; 
import SyncStorage from 'sync-storage';

import { saveTheme, readThemne, destroyUserData } from '../config/Realm';
const Account = ({ navigation }) => {
    const [isDarkTheme, setTheme] = useState(true); 


const getThemeColor =  () => {
  const themeDetails = readThemne();
  let Theme_code = 1

  if (themeDetails[0].theme_code  == 2) {
    setTheme(false);
    Theme_code = 2
  } else {
    setTheme(true);
  }
  return Theme_code;
};

useEffect(() => {
  const initializeTheme = async () => {
    const themeCode =  getThemeColor();
    // Do any additional initialization or operations based on the theme code
  };

  initializeTheme();
}, []);

    const toggleTheme = () => {
        const theme_id = isDarkTheme ? 2 : 1;
            // SyncStorage.set('theme_color', theme_id);
            saveTheme(theme_id)
            setTheme(!isDarkTheme)
            RNRestart.Restart();
       
       

    }
   const destroySession = ()=>{
    destroyUserData()
    RNRestart.Restart();
    // navigation.navigate('Login')
   }
    return (
        <SafeAreaView>
            <View style={styles.container}>
                <Text style={{ fontWeight: 'bold', fontSize: moderateScale(25), color: COLOR.labelColor }}>Account</Text>
                {/* <Image
                    style={{ alignSelf: 'center',
                    width:horizontalScale(100),
                    height:verticalScale(100)}}
                    source={require('../assets/svg/default-avatar.png')}
                /> */}
                <View>
                    <View style={{ paddingTop: verticalScale(25), flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: moderateScale(20), color: COLOR.labelColor }}>Favorite</Text>
                        <Icon name='eye-with-line' size={20} color={COLOR.labelColor} />
                    </View>
                    <View style={{ paddingTop: verticalScale(25), flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: moderateScale(20), color: COLOR.labelColor }}>Dark Mode</Text>
                        {/* <Icon name='eye-with-line' size={20} color={COLOR.labelColor}  /> */}
                        <Switch value={isDarkTheme} size={20} onValueChange={toggleTheme} />

                    </View>
                    <View style={{ paddingTop: verticalScale(25), flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: moderateScale(20), color: COLOR.labelColor }}>Edit Account</Text>
                        <Icon name='eye-with-line' size={20} color={COLOR.labelColor} />

                    </View>
                    <View style={{ paddingTop: verticalScale(25), flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: moderateScale(20), color: COLOR.labelColor }}>Settings and Privacy</Text>
                        <Icon name='eye-with-line' size={20} color={COLOR.labelColor} />

                    </View>
                    <View style={{ paddingTop: verticalScale(25), flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: moderateScale(20), color: COLOR.labelColor }}>Help</Text>
                        <Icon name='help-with-circle' size={20} color={COLOR.labelColor} />

                    </View>
                    <Pressable onPress={() => destroySession()} style={{ paddingTop: verticalScale(25), flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: moderateScale(20), color: COLOR.labelColor }}>Logout</Text>
                        <AntDesign name='logout' size={20} color={COLOR.labelColor} />

                    </Pressable>
                </View>
            </View>
            <StatusBar backgroundColor={COLOR.dashBoardMainColor} barStyle={COLOR.statusBarColor} />


        </SafeAreaView>
    )
}

export default Account

const styles = StyleSheet.create({
    container: {
        // flex:1,
        height: '100%',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        paddingTop: verticalScale(25),
        paddingLeft: horizontalScale(15),
        paddingRight: horizontalScale(20),
        backgroundColor: COLOR.darkBg
    }
})