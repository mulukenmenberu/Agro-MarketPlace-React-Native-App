import React, { useRef } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import Toast from 'react-native-easy-toast';

const MyComponent = () => {
  const toastRef = useRef(null);

  const showToast = () => {
    toastRef.current.show('Toast message here!');
  };

  return (
    <>
      <TouchableOpacity onPress={showToast}>
        <Text>Show Toast</Text>
      </TouchableOpacity>
      <Toast ref={toastRef} />
    </>
  );
};

export default MyComponent;
