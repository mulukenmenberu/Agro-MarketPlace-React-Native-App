import { StyleSheet, Text, View, StatusBar, Platform, SafeAreaView, Pressable } from 'react-native'
import React, { useState } from 'react'
import { horizontalScale, verticalScale, moderateScale } from '../config/Device'
import { Card } from 'react-native-paper'
import { COLOR } from '../config/Color'
const Messages = () => {
    const [activetab, setActiveTab] = useState(0)
    return (
        // <SafeAreaView>
        <>
            <View style={styles.container}>
                <Text style={{color:COLOR.heading1, fontSize: moderateScale(25),fontWeight:'bold' }}>Notifications</Text>
                <View style={{ paddingTop: verticalScale(50), flexDirection: 'row', justifyContent: 'space-evenly' }}>
                    <View>
                        <Pressable onPress = {()=>setActiveTab(0)}>
                    <Text style={{color:COLOR.labelColor, fontSize: moderateScale(15) }}>Messages</Text>
                    </Pressable>
                    {activetab==0?<View style={styles.underline}></View>:''}

                    </View>
                    <View>
                    <Pressable onPress = {()=>setActiveTab(1)}>
                    <Text style={{color:COLOR.labelColor, fontSize: moderateScale(15) }}>Notifications</Text>
                    </Pressable>
                    {activetab==1?<View style={styles.underline}></View>:''}
                    </View>
                </View>
                <View style={{marginTop:verticalScale(20)}}>
                  {activetab==0?
                                <Card style={{paddingLeft:horizontalScale(10),paddingRight:horizontalScale(10),paddingTop:verticalScale(10),paddingBottom:verticalScale(10), marginTop:verticalScale(15), backgroundColor:COLOR.lightBg, width:'96%', alignSelf:'center'}}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <View style={{flexDirection:'row', justifyContent:'flex-start'}}>
                                            <View style={{width:horizontalScale(80), height:verticalScale(80),borderRadius:moderateScale(20), backgroundColor:'#D8FFEF'}}>

                                            </View>
                                            <View style={{marginLeft:horizontalScale(10)}}>
                                            <Text style={{color:COLOR.heading1}}>{"message"}</Text>
                                            <Text  style={{color:COLOR.heading1}}>Online</Text>
                                            </View>
                                        </View>
                                        <Text style={{color:'#858597'}}>{"message"}</Text>
                                    </View>

                                    <View style={{marginTop:verticalScale(10)}}>
                                        <Text style={{color:'#858597'}}>{"message"}</Text>
                                    </View>
                                </Card>
                                : 
                                <Card style={{paddingLeft:horizontalScale(10),paddingRight:horizontalScale(10),paddingTop:verticalScale(10),paddingBottom:verticalScale(10), marginTop:verticalScale(15), backgroundColor:COLOR.lightBg, width:'96%', alignSelf:'center'}}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <View style={{flexDirection:'row', justifyContent:'flex-start'}}>
                                            <View style={{width:horizontalScale(80), height:verticalScale(80),borderRadius:moderateScale(20), backgroundColor:'#D8FFEF'}}>

                                            </View>
                                            <View style={{marginLeft:horizontalScale(10)}}>
                                            <Text style={{color:COLOR.heading1}}>{"Notification "}</Text>
                                            <Text  style={{color:COLOR.heading1}}>Notification content</Text>
                                            </View>
                                        </View>
                                        <Text style={{color:'#858597'}}>{"notification"}</Text>
                                    </View>

                                    <View style={{marginTop:verticalScale(10)}}>
                                        <Text style={{color:'#858597'}}>{"message"}</Text>
                                    </View>
                                </Card>
                  }
                    
                </View>
            </View>
            <StatusBar backgroundColor={COLOR.dashBoardMainColor} barStyle={COLOR.statusBarColor} />
            </>
      
    )
}

export default Messages

const styles = StyleSheet.create({
    container: {
        flex:1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        // paddingTop: verticalScale(25),
        // paddingLeft: horizontalScale(15),
        // paddingRight: horizontalScale(20),
        backgroundColor:COLOR.darkBg
    },
underline: {
    borderBottomWidth: 2,
    borderBottomColor: COLOR.dashBoardMainColor,
    width:30,
    justifyContent:'flex-end',
    alignSelf:'center'
  },
})