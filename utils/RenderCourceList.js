import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  Image
} from 'react-native';
import { Card } from "react-native-paper";
import { COLOR } from "../config/Color";
import { getData } from '../storage/Storage';
import { horizontalScale, verticalScale, moderateScale } from '../config/Device'

import { readUser } from '../config/Realm';
const Item = ({ name, instructor, price, navigation, course_slug, course_id, is_enrolled, student_id,duration,thumb_image }) => (
  <Card style={styles.progressCard} onPress={() => 
                                               student_id==0?navigation.navigate('GuestView'):
                                                navigation.navigate('CoursePreview', { course_id, is_enrolled, student_id })}>
    <View style={{ flexDirection: 'row' }}>
      {/* <View style={{
        width: horizontalScale(70), height: verticalScale(80), borderRadius: moderateScale(15),
        backgroundColor: '#C4C4C4', justifyContent: 'flex-start'
      }}> */}
         <Image
                    source={{ uri: thumb_image }}
                    style={{ width: horizontalScale(70), height: verticalScale(80), borderRadius: moderateScale(15),
                      backgroundColor: '#C4C4C4', justifyContent: 'flex-start' }}
                />

      {/* </View> */}
      <View style={{ paddingLeft: horizontalScale(10) }}>
        <Text style={{ fontSize: moderateScale(15), color: COLOR.labelColor }}>{name} - {!duration?'0 Hr':duration +' hr'} </Text>
        <Text style={{ fontSize: moderateScale(15), color: COLOR.labelColor }}>{!instructor? 'Unknown Teacher' : instructor.first_name + ' '+instructor.last_name} </Text>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ fontSize: moderateScale(15), fontWeight: 'bold', color: COLOR.dashBoardMainColor }}>{course_slug? course_slug:'Unknown SLug'} </Text>
          <Text style={{ marginLeft: horizontalScale(5), fontSize: moderateScale(15), fontWeight: 'bold', color: '#FF6905' }}>{price ? price+' Birr' : '0.00 Birr'} </Text>

        </View>

      </View>
    </View>
  </Card>
);

const RenderCourceList = ({ navigation, data }) => {

  const [student_id, setStudentId] = useState(0)
  useEffect(() => {
    const userData = readUser();

    setStudentId(userData[0].user_id)
  }, [])
  return (

    <FlatList
      data={data}
      renderItem={({ item }) => <Item navigation={navigation} name={item.course_title} instructor={item.instructor[0]} price={item.price} course_slug={item.course_slug} course_id={item.id} is_enrolled={item.is_enrolled} student_id={student_id} duration={item.duration} thumb_image={item.thumb_image} />}
      keyExtractor={item => item.id}
    />

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },

  progressCard: {
    padding: 5,
    marginLeft: 20,
    marginRight: 20,
    marginTop: verticalScale(10),
    backgroundColor: COLOR.darkWhite,
    borderRadius: 15,
    shadowColor: '#ffffffff',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
    height: verticalScale(120),
    justifyContent: 'center'
  },

  title: {
    fontSize: 32,
  },
});

export default RenderCourceList;