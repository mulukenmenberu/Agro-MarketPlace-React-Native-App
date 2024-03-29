import { View, Text, Image, Platform, StatusBar, StyleSheet, Dimensions, Pressable, Alert } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import { COLOR } from "../config/Color";
import { ActivityIndicator, Colors } from 'react-native-paper';
import { horizontalScale, verticalScale, moderateScale } from '../config/Device'
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/AntDesign';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Card } from 'react-native-paper'
import RBSheet from "react-native-raw-bottom-sheet";
import { Slider } from '@miblanchard/react-native-slider';
import { Input, Button } from 'react-native-elements';

import SvgUri from 'react-native-svg-uri';
import { ScrollView, TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
const { width, height } = Dimensions.get('window');
import { enrollItem, getSingleItemDetail, resetState } from '../redux/reducers/myItemSlice'
import { useSelector, useDispatch } from 'react-redux'
import Loader from "./messages/Loader";
import { readUser } from "../config/Realm";
import { generatePreview } from '../utils/generateItemPreview';

const ItemViews = ({ navigation, route }) => {
    const refRBSheet = useRef();
    const [slider, setslider] = useState(0.2)
    const [isSheetOpened, setSheetOpened] = useState(false)

    const bottomShetOpened = () => {
        setSheetOpened(true)
      }
      const bottomSheetClosed = () => {
        setSheetOpened(false)
    
      }
       // State to store selected payment method
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

  // Function to handle payment method selection
  const handlePaymentMethodSelect = (method) => {
    setSelectedPaymentMethod(method);
  };

  // Function to proceed to payment
  const handleProceedToPayment = () => {
    // You can implement your payment processing logic here
    // For this example, we'll just navigate to a confirmation screen
    navigation.navigate('OrderConfirmation', {
      paymentMethod: selectedPaymentMethod,
    });
  };

    const ItemList = [{}]

    return (
        // <SafeAreaView>
        <>
            <View style={[styles.videoCard, { backgroundColor: COLOR.darkBg, }]}>
                {/* <Icon onPress={() => navigation.navigate('DashboardTabs')} name='chevron-back' size={moderateScale(25)} color={COLOR.labelColor} /> */}
                <View style={{ paddingTop: verticalScale(40), paddingLeft: horizontalScale(10) }}>
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                <Text style={{ color: 'orange', fontSize: moderateScale(25) }}>John Smith</Text>

                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: verticalScale(50), width: horizontalScale(140), borderRadius: moderateScale(20) }}>
                            <AntDesign name='staro' size={moderateScale(20)} color={COLOR.starRatingColor} />
                            <Icon2 name='staro' size={moderateScale(20)} color={COLOR.starRatingColor} />
                            <Icon2 name='staro' size={moderateScale(20)} color={COLOR.starRatingColor} />
                            <Icon2 name='staro' size={moderateScale(20)} color={COLOR.starRatingColor} />
                            <Icon2 name='staro' size={moderateScale(20)} color={COLOR.starRatingColor} />
                        </TouchableOpacity>
                        </View>

                    <Text style={{ color: '#fff', fontSize: moderateScale(17) }}>Farmer (provides delivery service, vigitables and fruites)</Text>
                    <Text style={{ paddingTop: verticalScale(10), fontSize: moderateScale(23), color: COLOR.labelColor }}>About Supplier</Text>
                    <Text style={{ color: COLOR.labelColor }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam finterdum urna</Text>
           
                        <Text >3.5 rating, (134 orders, 97% satisfaction rate)</Text>
                </View>

                <Icon onPress={() => navigation.navigate('DashboardTabs')}
                    name='chevron-back'
                    size={moderateScale(25)}
                    color={COLOR.labelColor}
                    style={styles.overlayIcon} />

            </View>

            <View style={styles.descriptionBg}>
                <View style={styles.videoDescriptionCard}>
                    {/* <ScrollView> */}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View>
                            <Text style={{ fontWeight: 'bold', fontSize: moderateScale(20), color: COLOR.heading1 }}>{ItemList[0]?.Item_title ?? "No Items title"}</Text>
                            <Text style={{ fontSize: moderateScale(23), color: COLOR.labelColor }}>Product Description</Text>
                        </View>

                        <Image
                            style={{
                                zIndex: 999,
                                // position:'absolute',
                                alignSelf: 'center',
                                width: horizontalScale(200),
                                height: verticalScale(170),
                                marginTop: verticalScale(-100)
                            }}
                            source={require('../assets/onion.png')}
                        />
                    </View>
                    <View style={{ marginTop: verticalScale(25) }}>
                        <Text style={{ color: COLOR.labelColor }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam facilisis odio eget tincidunt convallis. Quisque vulputate nunc elit, in varius metus tincidunt vel. Nam nec nisi tincidunt, aliquam felis at, euismod elit. Nullam scelerisque eros in neque euismod tempus. Fusce interdum urna</Text>
                    
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', paddingTop: verticalScale(10) }}>

                        <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', height: verticalScale(50), width: horizontalScale(100), borderRadius: moderateScale(20), backgroundColor: COLOR.starRatingBgColor }}>
                            <MaterialCommunityIcons name='truck-delivery' size={moderateScale(20)} color={COLOR.starRatingColor} />
                            <Text>Delivery</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', height: verticalScale(50), width: horizontalScale(100), borderRadius: moderateScale(20), backgroundColor: COLOR.starRatingBgColor }}>
                            <AntDesign name='shoppingcart' size={moderateScale(20)} color={COLOR.starRatingColor} />
                            <Text>Wholesale</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', height: verticalScale(50), width: horizontalScale(100), borderRadius: moderateScale(20), backgroundColor: COLOR.starRatingBgColor }}>
                            <Entypo name='shopping-basket' size={moderateScale(20)} color={COLOR.starRatingColor} />
                            <Text>retail</Text>

                        </TouchableOpacity>
                    </View>

                    <View>
                        <ScrollView horizontal={true}>
                        <Card style={{ paddingLeft: horizontalScale(10), paddingRight: horizontalScale(10), paddingTop: verticalScale(10), paddingBottom: verticalScale(10), marginTop: verticalScale(15), backgroundColor: COLOR.lightBg, width: '96%', alignSelf: 'center' }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                                    <View style={{ width: horizontalScale(80), height: verticalScale(80), borderRadius: moderateScale(20), backgroundColor: '#D8FFEF' }}>

                                    </View>
                                    <View style={{ marginLeft: horizontalScale(10) }}>
                                        <Text style={{ color: COLOR.heading1 }}>{"Notification "}</Text>
                                        <Text style={{ color: COLOR.heading1 }}>Notification content</Text>
                                    </View>
                                </View>
                                <Text style={{ color: '#858597' }}>{"notification"}</Text>
                            </View>

                            <View style={{ marginTop: verticalScale(10) }}>
                                <Text style={{ color: '#858597' }}>{"message"}</Text>
                            </View>
                        </Card> 
                        <Card style={{ paddingLeft: horizontalScale(10), paddingRight: horizontalScale(10), paddingTop: verticalScale(10), paddingBottom: verticalScale(10), marginTop: verticalScale(15), backgroundColor: COLOR.lightBg, width: '96%', alignSelf: 'center' }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                                    <View style={{ width: horizontalScale(80), height: verticalScale(80), borderRadius: moderateScale(20), backgroundColor: '#D8FFEF' }}>

                                    </View>
                                    <View style={{ marginLeft: horizontalScale(10) }}>
                                        <Text style={{ color: COLOR.heading1 }}>{"Notification "}</Text>
                                        <Text style={{ color: COLOR.heading1 }}>Notification content</Text>
                                    </View>
                                </View>
                                <Text style={{ color: '#858597' }}>{"notification"}</Text>
                            </View>

                            <View style={{ marginTop: verticalScale(10) }}>
                                <Text style={{ color: '#858597' }}>{"message"}</Text>
                            </View>
                        </Card> 
                        
                        </ScrollView>
                    </View>

                    <View style={{ paddingTop: verticalScale(40), flexDirection: 'row', justifyContent: 'space-around' }}>
                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: verticalScale(50), width: horizontalScale(140), borderRadius: moderateScale(20), backgroundColor: COLOR.starRatingBgColor }}>
                            <AntDesign name='heart' size={moderateScale(20)} color={COLOR.starRatingColor} />


                        </TouchableOpacity>
                        <Pressable onPress={() => refRBSheet.current.open()} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: verticalScale(50), width: horizontalScale(190), borderRadius: moderateScale(20), backgroundColor: COLOR.dashBoardMainColor }}>
                       
                            <Text style={{ fontSize: moderateScale(17), color: '#fff' }}> Order </Text>
                        </Pressable>
                    </View>

                    {/* </ScrollView> */}
                </View>
            </View>

            <RBSheet

ref={refRBSheet}
closeOnDragDown={true}
closeOnPressMask={false}
height={verticalScale(300)}
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
<View style={styles.container}>
      <Text style={styles.title}>Checkout</Text>

      <View style={styles.paymentMethodsContainer}>
        <TouchableOpacity
          style={[
            styles.paymentMethod,
            selectedPaymentMethod === 'credit_card'
              ? styles.selectedPaymentMethod
              : null,
          ]}
          onPress={() => handlePaymentMethodSelect('credit_card')}
        >
          <Text style={styles.paymentMethodText}>Credit Card</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.paymentMethod,
            selectedPaymentMethod === 'paypal' ? styles.selectedPaymentMethod : null,
          ]}
          onPress={() => handlePaymentMethodSelect('paypal')}
        >
          <Text style={styles.paymentMethodText}>PayPal</Text>
        </TouchableOpacity>

        {/* Add more payment methods here */}
      </View>

      <Input
        placeholder="Card Number"
        leftIcon={{ type: 'font-awesome', name: 'credit-card' }}
        containerStyle={styles.inputContainer}
      />
      {/* Add more input fields for card expiry, CVV, etc. */}

      <Button
        title="Proceed to Payment"
        onPress={handleProceedToPayment}
        disabled={!selectedPaymentMethod}
        buttonStyle={styles.proceedButton}
      />
    </View>
</RBSheet>


            <StatusBar backgroundColor={COLOR.darkBg} barStyle={COLOR.statusBarColor2} />
        </>

    )
}

export default ItemViews

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
        height: "80%",
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
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
      },
      paymentMethodsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
      },
      paymentMethod: {
        borderWidth: 1,
        borderColor: '#ccc',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
      },
      selectedPaymentMethod: {
        borderColor: '#007BFF',
        backgroundColor: '#E1F5FE',
      },
      paymentMethodText: {
        fontSize: 16,
        color: '#333',
      },
      inputContainer: {
        marginBottom: 20,
      },
      proceedButton: {
        backgroundColor: '#007BFF',
      },
    overlayIcon: {
        position: 'absolute',
        top: 10,
        left: 10,
    }
})