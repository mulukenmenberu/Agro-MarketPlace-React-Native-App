
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View
} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OnBoarding from "./OnBoarding";
import Login from "./components/Login";
import Register from "./components/Register";
import DashBoard from "./components/DashBoard";
import  DashboardTabs  from "./components/DashboardTabs";
import ItemViews from "./components/ItemViews";
import Items from "./components/Items";
import ItemDetail from "./components/ItemDetail";
import { getData, setData } from './storage/Storage';
import CheckoutPage from "./components/CheckoutPage";
export default function Navigation() {
  const [introViewed, setIntroViewed] = useState(false);
  const stack = createNativeStackNavigator();

  useEffect(() => {
    getData('introViewed')
      .then((value)=>{
        setIntroViewed(value)
        // if(value=='visited'){
        //   navigation.navigate('Login', { page: 'login' })
        // }
      });

  }, [introViewed]);

  // useEffect(() => {
  //   getData('introViewed')
  //     .then(value => setIntroViewed(value || false));
  // }, []);


  return (
    <stack.Navigator screenOptions={{ headerShown: false }}>
       
      <stack.Screen name={!introViewed?'OnBoarding':'OnBoarding'} component={introViewed?OnBoarding:OnBoarding} />
      <stack.Screen name="DashBoard" component={DashBoard} />
      <stack.Screen name="Login" component={Login} />
      <stack.Screen name="Register" component={Register} />
      <stack.Screen name="DashboardTabs" component={DashboardTabs} />
      <stack.Screen name="ItemViews" component={ItemViews} />
      <stack.Screen name="Items" component={Items} />
      <stack.Screen name="ItemDetail" component={ItemDetail} />
      <stack.Screen name="CheckoutPage" component={CheckoutPage} />
      
    </stack.Navigator>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
});