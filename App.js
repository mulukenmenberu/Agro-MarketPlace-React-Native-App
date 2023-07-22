
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, useNavigation, useRoute } from '@react-navigation/native';
import Navigation from './Navigation';
import { Provider } from 'react-redux';
import store from './redux/store';
export default function App({navigation}) {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Navigation/>       
      </NavigationContainer>
      </Provider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
