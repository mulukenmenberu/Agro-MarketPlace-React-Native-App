import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CustomProgressBar = ({ progress, barWidth, barHeight, barColor, textColor }) => {
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      height: barHeight,
      width: barWidth,
      backgroundColor: '#ddd',
      borderRadius: 10,
      overflow: 'hidden'
    },
    bar: {
      height: '100%',
      width: `${progress}%`,
      backgroundColor: barColor,
      alignItems: 'center',
      justifyContent: 'center'
    },
    text: {
      color: textColor,
      fontSize: 16,
      fontWeight: 'bold'
    }
  });

  return (
    <View style={styles.container}>
      <View style={styles.bar}>
        <Text style={styles.text}></Text>
      </View>
    </View>
  );
};

export default CustomProgressBar;
