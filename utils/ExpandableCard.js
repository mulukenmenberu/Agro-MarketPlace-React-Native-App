import React, { useState, useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, Pressable } from 'react-native';
import Collapsible from 'react-native-collapsible';
import { COLOR } from '../config/Color'
import { Card } from "react-native-paper";
import { horizontalScale, verticalScale, moderateScale } from '../config/Device'
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo'
import AntDesign from 'react-native-vector-icons/AntDesign'
import RBSheet from "react-native-raw-bottom-sheet";
// import { ScrollView } from 'react-native-gesture-handler';

const ExpandableCard = ({ navigation, title, content, course_id, completion }) => {
    const [expanded, setExpanded] = useState(false);
    const [isSheetOpened, setSheetOpened] = useState(false)
    const [sheetTitle, setSheetTitle] = useState('')
    const [sheetDescription, setSheetDescription] = useState('')
    const [sheetDetail, setSheetDetail] = useState('')

    const toggleExpansion = () => {
        setExpanded(!expanded);
    };
    const bottomShetOpened = () => {
        setSheetOpened(true)
    }
    const bottomSheetClosed = () => {
        setSheetOpened(false)
    }
    const refRBSheet = useRef();

    const manageCardClick = (has_video, title, description,detail)=>{
        has_video = true
        if(has_video){
            navigation.navigate('ContinueLesson',{course_id:course_id, title:title, description:description})
        }else{
            refRBSheet.current.open()
            setSheetTitle(title)
            setSheetDescription(description)
            setSheetDetail(detail)
        }
    }
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.header} onPress={toggleExpansion}>
                <Text style={styles.title}>{title}</Text>
                {completion == 100 ? <Ionicons name="checkmark-done" color='green' size={20} /> : <MaterialCommunityIcons name="progress-clock" color={COLOR.labelColor} size={20} />}
            </TouchableOpacity>
            <Collapsible collapsed={!expanded}>
                <View style={styles.content}>
                    {content[0].content.map((item, index) => (
                        <Card style={styles.headerCard} key={index} >
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={{
                                    width: horizontalScale(130), height: verticalScale(110), borderRadius: moderateScale(5),
                                    backgroundColor: '#C4C4C4', justifyContent: 'flex-start'
                                }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: verticalScale(30) }} >
                                        {item.resource_link? <AntDesign onPress={() => navigation.navigate('ContinueLesson',{course_id:course_id})} name='play' style={{ alignSelf: 'center', color:COLOR.sliderActive }} size={40} /> : ''}
                                        <Entypo onPress={() => manageCardClick(false,item.content_title, item.content_description, item.content_detail)} name='text-document' size={40} style={{ alignSelf: 'center', marginBottom: 0, color:COLOR.textBoxColor }} />
                                    </View>
                                </View>
                                <Pressable style={{ paddingLeft: horizontalScale(1), marginTop: verticalScale(30) }} onPress={() => manageCardClick(item.resource_link,item.content_title, item.content_description, item.content_detail)}>
                                    <Text style={{ color: COLOR.labelColor }}>{item.content_title}</Text>
                                    {/* <Text style={{ color: COLOR.labelColor }}>{item.content_description}</Text> */}
                                    {/* <Text style={{ color: COLOR.labelColor }}>{item.content_detail}</Text> */}
                                </Pressable>
                                <View></View>
                            </View>
                        </Card>
                    ))}
                </View>
            </Collapsible>
        
            <RBSheet

                ref={refRBSheet}
                closeOnDragDown={true}
                closeOnPressMask={false}
                height={verticalScale(700)}
                onOpen={bottomShetOpened}
                onClose={bottomSheetClosed}
                gestureEnabled={true} // Enable gesture recognition for scrolling

                containerStyle={styles.backdropStyle}
                customStyles={{
                    wrapper: {
                        backgroundColor: "transparent"
                    },
                    draggableIcon: {
                        backgroundColor: "#000"
                    },
                    container: {
                        backgroundColor: COLOR.lightBg// Set the background color of the content container
                      },
                }}
            >
<View style={{ height: verticalScale(600) }}> 
                    <ScrollView
                    >
                    <Text style={{ fontWeight: 'bold', fontSize: moderateScale(20), paddingLeft: 10,color:COLOR.labelColor, }}>{sheetTitle}</Text>
                    <Text style={{color:COLOR.labelColor, padding: moderateScale(10), marginTop: verticalScale(20), fontWeight: 'bold', fontSize: moderateScale(20), textAlign: 'justify' }}>
                        {sheetDescription}
                    </Text>
                    <Text style={{color:COLOR.labelColor, padding: moderateScale(10), marginTop: verticalScale(20), fontWeight: 'bold', fontSize: moderateScale(20), textAlign: 'justify' }}>
                        {sheetDetail}
                    </Text>
                   
                    <View style={{ marginTop: verticalScale(10), flexDirection: 'row', justifyContent: 'space-around' }}>
                        <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', height: verticalScale(50), width: horizontalScale(190), borderRadius: moderateScale(20), backgroundColor: COLOR.dashBoardMainColor }}>
                            <Text style={{ fontSize: moderateScale(20), color: '#fff' }}>Mark as completed</Text>
                        </TouchableOpacity>
                    </View>
                    </ScrollView>
                </View>
            </RBSheet>
            </View>
      
    );
};
export default ExpandableCard;
const styles = StyleSheet.create({
    backdropStyle: {
        backgroundColor: 'red', // Change the background color here
    },
    headerCard: {
        flex: 1,
        padding: 1,
        backgroundColor: COLOR.lightBg,
        height: verticalScale(110),
        width: "100%",//verticalScale(310),
        shadowColor: COLOR.labelColor,
        marginTop: verticalScale(10)
    },
    container: {
        backgroundColor: COLOR.lightBg,
        borderRadius: 2,
        // marginBottom: 10,
        elevation: 2,
    },
    header: {
        padding: 16,
        borderBottomColor: COLOR.lightBg,
        borderBottomWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLOR.heading1
    },
    content: {
        padding: 16,
        color: COLOR.heading1,
        // flexDirection: 'row',
        // justifyContent: 'space-evenly'

    },
});
