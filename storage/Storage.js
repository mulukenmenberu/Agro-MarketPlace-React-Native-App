import AsyncStorage from '@react-native-async-storage/async-storage';

const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value !== null ? JSON.parse(value) : null;
  } catch (error) {
   
    return null;
  }
};

const setData = async (key, value) => {
  
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
  
    return false;
  }
};

export { getData, setData };
