
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
import CoursePreview from "./components/CoursePreview";
import Courses from "./components/Courses";
import LoginRegister from "./components/LoginRegister";
import CourseContent from "./components/CourseContent";
import { getData, setData } from './storage/Storage';
export default function Navigation() {
  const [introViewed, setIntroViewed] = useState(false);
  const stack = createNativeStackNavigator();

  useEffect(() => {
    getData('introViewed')
      .then((value)=>{
        setIntroViewed(value)
        // if(value=='visited'){
        //   navigation.navigate('LoginRegister', { page: 'login' })
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
      <stack.Screen name="CoursePreview" component={CoursePreview} />
      <stack.Screen name="LoginRegister" component={LoginRegister} />
      <stack.Screen name="Courses" component={Courses} />
      <stack.Screen name="CourseContent" component={CourseContent} />

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