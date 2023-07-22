import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';

const MessageModal = ({ visible, message }) => {
  const [modalVisible, setModalVisible] = useState(visible);

  const onClose = () => {
    setModalVisible(false);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
    >
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>{message}</Text>
          <TouchableOpacity style={{ backgroundColor: '#2196F3', padding: 10, borderRadius: 5 }} onPress={onClose}>
            <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default MessageModal;
