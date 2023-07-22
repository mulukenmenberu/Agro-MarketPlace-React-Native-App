import messaging from '@react-native-firebase/messaging';
import { SaveGCMToken, readToken } from '../config/Realm';
import PushNotification from 'react-native-push-notification';

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    getToken()
  }
}

async function getToken(){
    // const token = readToken()
//    const token_value =  token[0].access_token

//    if(!token_value){
let tk = await messaging().getToken()
// SaveGCMToken(tk)
console.log('ppppp ', tk)

//    }
}

export function send(){
    messaging().onNotificationOpenedApp(remoteMessage => {
        console.log(
          'Notification caused app to open from background state:',
          remoteMessage.notification,
        );
      });
      messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
        //   setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
        }
        // setLoading(false);
      });
      messaging().onMessage(async remoteMessage=>{
        displayNotification(remoteMessage.notification);

      })
}

// Create a method to build and display the notification
// Create a method to build and display the notification
const displayNotification = (notification) => {
  const localNotification = new firebase.notifications.Notification()
    .setNotificationId(notification.notificationId)
    .setTitle(notification.title)
    .setBody(notification.body)
    .setData(notification.data);

  // Display the notification
  firebase.notifications().displayNotification(localNotification);
};