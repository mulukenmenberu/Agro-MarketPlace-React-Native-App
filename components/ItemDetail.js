import { View, Image, Text, FlatList, Platform, StatusBar, StyleSheet, Dimensions, Pressable, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLOR } from "../config/Color";
import { horizontalScale, verticalScale, moderateScale } from '../config/Device'
import Icon from 'react-native-vector-icons/Ionicons';
import SvgUri from 'react-native-svg-uri';
const { width, height } = Dimensions.get('window');
import ExpandableCard from '../utils/ExpandableCard'
import Loader from './messages/Loader';
import { readUser } from '../config/Realm';
import { getSingleCourseDetail } from '../redux/reducers/myCourseSlice'
import { useSelector, useDispatch } from 'react-redux'

const ItemDetail = ({ navigation, route }) => {
    const videoUri = 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
    const [isFullscreen, setIsFullscreen] = useState(false);

    const [course_id, setCourseId] = useState(route.params.course_id);
    const [student_id, setStudentId] = useState(route.params.student_id);
    const [progress, setprogress] = useState(false)

    const dispatch = useDispatch()
    const { has_enrolled, loading, courseList } = useSelector((state) => state.mycourse)



    useEffect(() => {
        const userData = readUser();

        setStudentId(userData[0].user_id)

        dispatch(getSingleCourseDetail({ student_id: userData[0].user_id, course_id: course_id }))
        if (loading) {
            setprogress(true)

        }
    }, [])
    const data2 = [];
    try {
        const courses = courseList[0];

        // courses.forEach(course => {
        courses.contents.forEach((contentObj, index) => {

            const key = Object.keys(contentObj)[0]; // Assuming there's only one key in each object

            const title = `Chapter ${index + 1} - No Chapter Title`;
            const content = contentObj[key].chapter_details;

            let content_count = 0;
            let completion = 0;
            content.forEach((contentData, index) => {

                content_count += 1
                completion += parseInt(contentData.progress)
            })
            completion = completion / content_count
            const newItem = [{ id: key, title: title, content: content, completion: completion }];
            data2.push(newItem);
        });
        // });

    } catch (e) {
        console.log(e)
        // Alert.alert("skjnk")
    }
    const EmptyCourseContent = () => {
        return (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingTop:verticalScale(150)}}>
            <Text style={{fontSize:moderateScale(20),  color:COLOR.heading1 }}>No data available.</Text>
          </View>
        );
      };
      
    return (
        // <SafeAreaView>
        <>
            <View style={!isFullscreen ? [styles.videoCard, { backgroundColor: COLOR.coursePreviewColor, }] : { width: "100%", height: "100%" }}>
                <Image
                    source={{ uri: 'https://codewithmosh.com/_next/image?url=https%3A%2F%2Fcdn.filestackcontent.com%2FbLy3JtIoQ8y8PDs4tFem&w=3840&q=75' }}
                    style={{ width: "100%", height: '100%' }}
                />
                {!isFullscreen ?
                    <Icon onPress={() => navigation.navigate('DashboardTabs')}
                        name='chevron-back'
                        size={moderateScale(25)}
                        color={COLOR.labelColor}
                        style={styles.overlayIcon} />

                    : ''}

            </View>
            {loading ? <Loader /> :
                <View style={{ flex: 1, backgroundColor: COLOR.lightBg }}>
                    <FlatList
                        data={data2}
                        keyExtractor={(item) => item[0].id}
                        renderItem={({ item }) => (
                            <ExpandableCard
                                navigation={navigation}
                                title={item[0].title}
                                content={item}
                                course_id={course_id}
                                completion={item[0].completion}
                            />
                        )}
                        ListEmptyComponent={<EmptyCourseContent />} // Rendered when data2 is empty

                    />

                </View>}
                {/* {!has_content? <Text>nifvhiurhgiurthjg</Text>:''} */}

            <StatusBar backgroundColor={COLOR.darkBg} barStyle={COLOR.statusBarColor} />
        </>

    )
}

export default ItemDetail

const styles = StyleSheet.create({
    videoCard: {
        height: verticalScale(300),

        // marginTop:Platform.OS==='android'?StatusBar.currentHeight:0,
    },
    videoCardFull: {
        flex: 1,
        backgroundColor: '#FFE7EE',
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
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
    overlayContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        height: verticalScale(50),
        width: horizontalScale(330),
        borderRadius: moderateScale(20),
        backgroundColor: COLOR.dashBoardMainColor,
        marginTop: verticalScale(50),
    },
    buttonText: {
        fontSize: moderateScale(20),
        color: '#fff',
    },
    overlayIcon: {
        position: 'absolute',
        top: 10,
        left: 10,
    }
})