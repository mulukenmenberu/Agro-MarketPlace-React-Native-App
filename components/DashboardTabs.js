import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
// import Icon from 'react-native-vector-icons/Foundation';

import { COLOR } from '../config/Color';
import Messages from './Messages';
import Account from './Account';
const Tab = createBottomTabNavigator();
import DashBoard from './DashBoard';
import Courses from './Courses';
import { TouchableOpacity,StyleSheet, Image,View, Text } from 'react-native';
import { horizontalScale, verticalScale } from '../config/Device';

const CustomSearch = ({ onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.customSearchButton}>
    <View style={styles.customSearchIcon} />
  </TouchableOpacity>
);
export default function DashboardTabs({ navigation }) {

  return (
    <SafeAreaProvider style={{ backgroundColor: 'blue'}}>
      <Tab.Navigator
  
        screenOptions={{
          tabBarActiveTintColor: 'red',
          headerShown: false,
          tabBarStyle: {
            backgroundColor: COLOR.darkBg,
        },
        }}
      >
        <Tab.Screen
          name="Home"
          component={DashBoard}
          options={{

            tabBarIcon: ({ color, size }) => (
              <AntDesign name="home" color={color} size={size} />
            ),
          }}
        />


        <Tab.Screen
          name="My Orders"
          component={Courses}
          options={{
            tabBarLabel: 'My Orders',
            tabBarIcon: ({ color, size }) => (
              <Entypo name="open-book" color={color} size={size} />

            ),
          }}
        />

<Tab.Screen
          name="SearchTab"
          component={() => null}
          options={{
            tabBarIcon: ({ color, size }) => (
              <CustomSearch onPress={() => console.log('Search tab pressed!')} />
            ),
          }}
        />
        <Tab.Screen
          name="Message"
          component={Messages}
          options={{
            tabBarLabel: 'Message',
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="message1" color={color} size={size} />

            ),
          }}
        />
          
        <Tab.Screen
          name="Account"
          component={Account}
          options={{
            tabBarLabel: 'Account',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="account" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
      {/* <StatusBar style="light" /> */}

    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  customSearchButton: {
    position: 'absolute',
    top: -25,
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLOR.dashBoardMainColor,
    zIndex: 1,
    elevation: 5,
  },
  customSearchIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'white', // You can customize the search icon as needed.
  },
});