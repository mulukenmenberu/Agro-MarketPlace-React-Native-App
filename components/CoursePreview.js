import { View, Text, Image, Platform, StatusBar, StyleSheet, Dimensions, Pressable, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLOR } from "../config/Color";
import { ActivityIndicator, Colors } from 'react-native-paper';
import { horizontalScale, verticalScale, moderateScale } from '../config/Device'
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/AntDesign';
import SvgUri from 'react-native-svg-uri';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
const { width, height } = Dimensions.get('window');
import { enrollCourse, getSingleCourseDetail, resetState } from '../redux/reducers/myCourseSlice'
import { useSelector, useDispatch } from 'react-redux'
import Loader from "./messages/Loader";
import { readUser } from "../config/Realm";
import { generatePreview } from '../utils/generateCoursePreview';
const CoursePreview = ({ navigation, route }) => {


const courseList = [{}]
    
    return (
        // <SafeAreaView>
        <>
            <View style={[styles.videoCard, { backgroundColor: COLOR.darkBg, }]}>
                {/* <Icon onPress={() => navigation.navigate('DashboardTabs')} name='chevron-back' size={moderateScale(25)} color={COLOR.labelColor} /> */}

                <Image
                    source={{ uri: courseList[0]?.thumb_image ?? 'https://example.com/fallback-image.jpg' }}
                    style={{ width: "100%", height: '100%' }}
                />
                   
                <Icon onPress={() => navigation.navigate('DashboardTabs')}
                    name='chevron-back'
                    size={moderateScale(25)}
                    color={COLOR.labelColor}
                    style={styles.overlayIcon} />

            </View>
        
                    <View style={styles.descriptionBg}>
                        <View style={styles.videoDescriptionCard}>
                            <ScrollView>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <View>
                                        <Text style={{ fontWeight: 'bold', fontSize: moderateScale(20), color: COLOR.heading1 }}>{courseList[0]?.course_title ?? "No course title"}</Text>
                                        <Text style={{ color: COLOR.labelColor }}>{courseList[0]?.duration ?? 'Duration unknown'} · {courseList[0]?.contents?.length ?? 0} Lessons</Text>
                                    </View>
                                    <Text style={{ fontWeight: 'bold', color: COLOR.dashBoardMainColor, fontSize: moderateScale(20) }}>{courseList[0]?.price ?? "0.00"} Birr</Text>
                                </View>
                                <View style={{ marginTop: verticalScale(25) }}>
                                    <Text style={{ fontWeight: 'bold', fontSize: moderateScale(20), color: COLOR.labelColor }}>About this course</Text>
                                    <Text style={{ color: COLOR.labelColor }}>{courseList[0]?.overview ?? "No course description"}</Text>
                                </View>

            
   

                                    <View style={{ paddingTop: verticalScale(20), flexDirection: 'row', justifyContent: 'space-around' }}>
                                        <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', height: verticalScale(50), width: horizontalScale(110), borderRadius: moderateScale(20), backgroundColor: COLOR.starRatingBgColor }}>
                                            <Icon2 name='staro' size={moderateScale(25)} color={COLOR.starRatingColor} />

                                        </TouchableOpacity>
                                        <Pressable  style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: verticalScale(50), width: horizontalScale(190), borderRadius: moderateScale(20), backgroundColor: COLOR.dashBoardMainColor }}>
                                            {
                                             <ActivityIndicator animating={true} color={COLOR.darkWhite} /> 
                                            }
                                            <Text style={{ fontSize: moderateScale(17), color: '#fff' }}> Order </Text>
                                        </Pressable>
                                    </View>
                                
                            </ScrollView>
                        </View>
                    </View>
         
            <StatusBar backgroundColor={COLOR.darkBg} barStyle={COLOR.statusBarColor2} />
        </>

    )
}

export default CoursePreview

const styles = StyleSheet.create({
    videoCard: {
        height: verticalScale(250),

        // marginTop:Platform.OS==='android'?StatusBar.currentHeight:0,
    },
    videoCardFull: {
        flex: 1,
        backgroundColor: COLOR.darkBg,
        width: width,
        height: height,
        // marginTop:Platform.OS==='android'?StatusBar.currentHeight:0,
    },
    descriptionBg: {
        backgroundColor: COLOR.darkBg,
        height: "70%",
    },
    videoDescriptionCard: {
        height: "100%",
        backgroundColor: COLOR.darkWhite,
        borderTopLeftRadius: moderateScale(20),
        borderTopRightRadius: moderateScale(20),
        paddingTop: verticalScale(20),
        paddingLeft: horizontalScale(10),
        paddingRight: horizontalScale(10)
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    fullScreen: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    overlayIcon: {
        position: 'absolute',
        top: 10,
        left: 10,
    }
})