// import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image, StatusBar,
  Button, TouchableWithoutFeedback,
  TouchableOpacity,
  Dimensions, ScrollView, Alert, Keyboard,
  RefreshControl, PanResponder, FlatList
} from "react-native";
import { Slider } from '@miblanchard/react-native-slider';

import SvgUri from 'react-native-svg-uri';
import { Svg, Path, LinearGradient, Stop } from 'react-native-svg';
// import { AntDesign } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/AntDesign';
import CustomProgressBar from "./custom_tools/CustomProgressBar";
import { Card, TextInput } from "react-native-paper";
import { COLOR } from "../config/Color";
import { useSelector, useDispatch } from 'react-redux'
const dimention = Dimensions.get('screen')
import { horizontalScale, verticalScale, moderateScale } from '../config/Device'
const { width, height } = Dimensions.get('screen')
import Loading from "./messages/Loading";
import { readUser } from "../config/Realm";

import Loader from "./messages/Loader";
import { getItemsProgress } from '../redux/reducers/myItemSlice'
import RBSheet from "react-native-raw-bottom-sheet";

import vegetablesData from '../data/vigitables.json'; // Replace this with the correct path to your JSON file

export default function DashBoard({ navigation }) {
  const [isDataLoading, setDataLoading] = useState(false)
  const [student_id, setStudentId] = useState();
  const [refreshing, setRefreshing] = useState(false);

  const [full_name, setFullName] = useState('')

  const [isSheetOpened, setSheetOpened] = useState(false)
  const [slider, setslider] = useState(0.2)
  const [searchTerm, setSearchTerm] = useState('')
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  const dispatch = useDispatch()
  let { progressItemList, loading } = useSelector((state) => state.myItem)

  const refRBSheet = useRef();


  const onRefresh = () => {
    setRefreshing(true);
    const userData = readUser();
    setFullName(userData[0].full_name)
    setStudentId(userData[0].user_id)
    dispatch(getItemsProgress(userData[0].user_id))

    setRefreshing(false);

  };

  useEffect(() => {
    try {
      const userData = readUser();
      setFullName(userData[0].full_name)
      setStudentId(userData[0].user_id)
      dispatch(getItemsProgress(userData[0].user_id))

    } catch (e) { }
    // setItemList(ItemList)
  }, [full_name])

  const bottomShetOpened = () => {
    setSheetOpened(true)
  }
  const bottomSheetClosed = () => {
    setSheetOpened(false)

  }

  const searchFilter = () => {
    if (searchTerm.length > 0) {

      // dispatch(resetState())
      // dispatch(searchItem(searchTerm))
    } else {
      // dispatch(resetState())
      // dispatch(getAllItem(active))
    }

  }

  // Dummy data for progressItemList
  progressItemList = vegetablesData

  const windowWidth = Dimensions.get('window').width;
  const numColumns = 2;
  const cardWidth = (windowWidth - 20) / numColumns - 10; // Subtract margins and padding

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

  const renderItemCard = ({ item }) => {
    return (
      <Card onPress={() => navigation.navigate('ItemViews')} style={[styles.progressCard, { width: cardWidth }]} >
       <View style={{flexDirection:'row', justifyContent:'space-between'}}>
       <Text style={{fontWeight:'bold'}}>{item.name}</Text>
       <Text style={{color:'orange',fontWeight:'bold'}}>{item.price}</Text>
        </View> 
        <Image
          source={{ uri: item.thumbnail }}
          style={styles.ItemImage}
        />
        <Text style={{alignSelf:'center', }}>Supplier: {item.supplier}</Text>

      </Card>
    );
  };



  return (
    <View style={styles.container}>
      <View style={styles.topCard}>
        <View>
          <Icon onPress={() => refRBSheet.current.open()} name="shoppingcart" size={moderateScale(24)} color={COLOR.labelColor} />
        </View>
        <View>

        </View>
        <Icon onPress={() => refRBSheet.current.open()} name="menu-unfold" size={moderateScale(24)} color={COLOR.labelColor} />




      </View>



      <View style={styles.registerCard} >
        <View style={!isKeyboardVisible ? styles.infoCard : styles.infoCardK} >
          <View style={{ justifyContent: 'center', alignItems: 'center', paddingLeft: horizontalScale(10), paddingRight: horizontalScale(10), fontSize: moderateScale(17), height: verticalScale(48), width: "90%", alignSelf: 'center', borderWidth: 2, backgroundColor: COLOR.lightBg, borderRadius: moderateScale(20), borderColor: COLOR.lightBg, flexDirection: 'row' }}>
            <Icon name="search1" size={moderateScale(24)} color={COLOR.labelColor} />
            <TextInput
              style={{ flex: 3, height: verticalScale(47), backgroundColor: COLOR.lightBg, color: COLOR.labelColor }}
              placeholder="Search Vigitables & Products"
              color={COLOR.heading1}
              placeholderTextColor='#222'
              onChangeText={searchTerm => setSearchTerm(searchTerm)}
              onBlur={searchFilter}
            />


          </View>
        </View>
        {/* Scrollling items bellow the info card */}
        {isDataLoading ? <Loading /> :
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
              />
            }>

            <View style={{ alignItems: 'center' }}>

              <View style={{ borderRadius: 13, marginTop: verticalScale(30), alignSelf: 'center', backgroundColor: '#CEECFE', width: "97%", height: verticalScale(120) }}>
                <Text style={{ fontSize: moderateScale(15), padding: 10 }}>What do you want to learn today</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>


                </View>
              </View>

            </View>

            <View>
              {typeof progressItemList !== 'undefined' && progressItemList.length > 0 ? (
                <FlatList
                  data={progressItemList}
                  renderItem={renderItemCard}
                  keyExtractor={(item) => item.id.toString()}
                  numColumns={2}
                  columnWrapperStyle={styles.columnWrapper} // Added this style
                />
              ) : (
                <Text style={styles.noItemsText}>No inprogress Items available</Text>
              )}
            </View>
          </ScrollView>
        }
      </View>

      <RBSheet

        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        height={verticalScale(700)}
        onOpen={bottomShetOpened}
        onClose={bottomSheetClosed}
        containerStyle={styles.backdropStyle}
        customStyles={{
          wrapper: {
            backgroundColor: "transparent"
          },
          draggableIcon: {
            backgroundColor: "#000"
          }
        }}
      >
        <View>
          <Text style={{ fontWeight: 'bold', fontSize: moderateScale(20), alignSelf: 'center' }}>Proceed to Order</Text>
          <Text style={{ marginLeft: horizontalScale(10), marginTop: verticalScale(20), fontWeight: 'bold', fontSize: moderateScale(20) }}>Search Filter</Text>
          <View style={{ marginTop: verticalScale(10), flexDirection: 'row', justifyContent: 'space-evenly' }}>
            <TouchableWithoutFeedback>
              <Text style={{ borderRadius: moderateScale(20), backgroundColor: COLOR.dashBoardMainColor, fontSize: moderateScale(15), width: horizontalScale(80), height: verticalScale(30), alignSelf: 'center', justifyContent: 'center', textAlign: 'center', color: '#fff' }}>Design</Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback>
              <Text style={{ backgroundColor: COLOR.labelColor, borderRadius: moderateScale(20), fontSize: moderateScale(15), width: horizontalScale(80), height: verticalScale(30), alignSelf: 'center', justifyContent: 'center', textAlign: 'center', color: '#222' }}>Painting</Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback>
              <Text style={{ borderRadius: moderateScale(20), backgroundColor: COLOR.dashBoardMainColor, fontSize: moderateScale(15), width: horizontalScale(80), height: verticalScale(30), alignSelf: 'center', justifyContent: 'center', textAlign: 'center', color: '#fff' }}>Design</Text>
            </TouchableWithoutFeedback>
          </View>
          <View style={{ marginTop: verticalScale(10), flexDirection: 'row', justifyContent: 'space-evenly' }}>

            <TouchableWithoutFeedback>
              <Text style={{ backgroundColor: COLOR.labelColor, borderRadius: moderateScale(20), fontSize: moderateScale(15), width: horizontalScale(80), height: verticalScale(30), alignSelf: 'center', justifyContent: 'center', textAlign: 'center', color: '#222' }}>Maths</Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback>
              <Text style={{ backgroundColor: COLOR.labelColor, borderRadius: moderateScale(20), fontSize: moderateScale(15), width: horizontalScale(80), height: verticalScale(30), alignSelf: 'center', justifyContent: 'center', textAlign: 'center', color: '#222' }}>Basic Computer</Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback>
              <Text style={{ backgroundColor: COLOR.labelColor, borderRadius: moderateScale(20), fontSize: moderateScale(15), width: horizontalScale(80), height: verticalScale(30), alignSelf: 'center', justifyContent: 'center', textAlign: 'center', color: '#222' }}>Painting</Text>
            </TouchableWithoutFeedback>

          </View>

          <Text style={{ fontWeight: 'bold', fontSize: moderateScale(20), marginTop: verticalScale(30), marginLeft: horizontalScale(10) }}>Price</Text>
          <View style={{ paddingLeft: horizontalScale(10), paddingRight: horizontalScale(20) }}>
            <Slider
              style={{ backgrcoloroundColor: COLOR.dashBoardMainColor }}
              value={slider}
              onValueChange={value => setslider(value)}

            />
            <Text style={{ alignSelf: 'center' }}> 0 Birr  - {slider} Birr</Text>
          </View>

          <Text style={{ marginLeft: horizontalScale(10), fontWeight: 'bold', fontSize: moderateScale(20), }}>Duration</Text>
          <View style={{ marginTop: verticalScale(10), flexDirection: 'row', justifyContent: 'space-evenly' }}>
            <TouchableWithoutFeedback>
              <Text style={{ borderRadius: moderateScale(20), backgroundColor: COLOR.dashBoardMainColor, fontSize: moderateScale(15), width: horizontalScale(80), height: verticalScale(30), alignSelf: 'center', justifyContent: 'center', textAlign: 'center', color: '#fff' }}>3-8 hours</Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback>
              <Text style={{ backgroundColor: COLOR.labelColor, borderRadius: moderateScale(20), fontSize: moderateScale(15), width: horizontalScale(80), height: verticalScale(30), alignSelf: 'center', justifyContent: 'center', textAlign: 'center', color: '#222' }}>10-15 hours</Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback>
              <Text style={{ borderRadius: moderateScale(20), backgroundColor: COLOR.dashBoardMainColor, fontSize: moderateScale(15), width: horizontalScale(80), height: verticalScale(30), alignSelf: 'center', justifyContent: 'center', textAlign: 'center', color: '#fff' }}> 20 hour</Text>
            </TouchableWithoutFeedback>
          </View>

          <View style={{ marginTop: verticalScale(10), flexDirection: 'row', justifyContent: 'space-around' }}>
            <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', height: verticalScale(50), width: horizontalScale(150), borderRadius: moderateScale(20), borderWidth: 3, borderColor: COLOR.dashBoardMainColor }}>
              <Text style={{ fontSize: moderateScale(20), color: COLOR.dashBoardMainColor }}>Clear</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', height: verticalScale(50), width: horizontalScale(150), borderRadius: moderateScale(20), backgroundColor: COLOR.dashBoardMainColor }}>
              <Text style={{ fontSize: moderateScale(20), color: '#fff' }}>Apply Filter</Text>
            </TouchableOpacity>
          </View>
        </View>
      </RBSheet>


      {/* <StatusBar style="light" /> */}
      <StatusBar backgroundColor={COLOR.darkBg} barStyle={COLOR.statusBarColor2} />

    </View>

  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.lightWhite,
  },
  infoCard: {
    alignSelf: 'center',
    // backgroundColor: COLOR.lightBg,
    // width: "90%",
    width: dimention.width - 60,
    height: verticalScale(80),
    marginTop: verticalScale(-179),
    // shadowColor: '#171717',
    // shadowOffset: {width: -2, height: 4},
    // shadowOpacity: 1,
    shadowRadius: 3,
  },
  infoCardK: {
    alignSelf: 'center',
    // backgroundColor: COLOR.lightBg,
    // width: "90%",
    width: dimention.width - 60,
    height: verticalScale(80),
    marginTop: verticalScale(-10),
    // shadowColor: '#171717',
    // shadowOffset: {width: -2, height: 4},
    // shadowOpacity: 1,
    shadowRadius: 3,
  },
  progressCard: {
    padding: 10,
    // marginLeft: 20,
    // marginRight: 20,
    margin: 'auto',
    marginTop: verticalScale(1),
    backgroundColor: COLOR.darkWhite,
    borderRadius: 15,
    shadowColor: '#ffffffff',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
    height: verticalScale(150),
    // justifyContent: 'center'
  },
  registerCard: {
    backgroundColor: COLOR.lightWhite,
    width: '100%',
    // height: "100%",
    flex: 3,
    alignSelf: 'center',
    marginTop: "-50%"

  },

  topCard: {
    flex: 2,
    backgroundColor: COLOR.dashBoardMainColor,
    width: "100%",
    height: "50%",
    paddingTop: 30,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between'

  },
  button: {
    backgroundColor: COLOR.sliderActive,
    margin: 15,
    height: 50,
    width: 300,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 45
  },
  textBox: {
    marginTop: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: '#fff'
  },
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  columnWrapper: {
    justifyContent: 'space-evenly', // Added this style to evenly distribute columns
  },
  ItemImage: {
    width: "100%",
    height: "70%",
    borderRadius: 20
  }
})