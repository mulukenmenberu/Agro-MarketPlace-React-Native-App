import React from 'react';
import { View, StyleSheet } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const Loading = () => {
  return (
    <View style={styles.container}>
      <SkeletonPlaceholder>
        {/* <View style={styles.header}>
          <View style={styles.avatar} />
          <View style={styles.name} />
        </View> */}
        <View style={styles.body}>
          <View style={styles.title} />
          <View style={styles.description} />
        </View>
        <View style={styles.body}>
          <View style={styles.title} />
          <View style={styles.description} />
        </View>
        <View style={styles.body}>
          <View style={styles.title} />
          <View style={styles.description} />
        </View>
        {/* <View style={styles.footer}>
          <View style={styles.button} />
          <View style={styles.button} />
          <View style={styles.button} />
        </View> */}
        <View style={styles.body}>
          <View style={styles.title} />
          <View style={styles.description} />
        </View>
        {/* <View style={styles.footer}>
          <View style={styles.button} />
          <View style={styles.button} />
          <View style={styles.button} />
        </View> */}
        <View style={styles.body}>
          <View style={styles.title} />
          <View style={styles.description} />
        </View>
        <View style={styles.body}>
          <View style={styles.title} />
          <View style={styles.description} />
        </View>
        <View style={styles.body}>
          <View style={styles.title} />
          <View style={styles.description} />
        </View>
        <View style={styles.body}>
          <View style={styles.title} />
          <View style={styles.description} />
        </View>
        <View style={styles.body}>
          <View style={styles.title} />
          <View style={styles.description} />
        </View>
        <View style={styles.body}>
          <View style={styles.title} />
          <View style={styles.description} />
        </View>
        <View style={styles.body}>
          <View style={styles.title} />
          <View style={styles.description} />
        </View>
        <View style={styles.body}>
          <View style={styles.title} />
          <View style={styles.description} />
        </View>
        {/* <View style={styles.footer}>
          <View style={styles.button} />
          <View style={styles.button} />
          <View style={styles.button} />
        </View> */}
      </SkeletonPlaceholder>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#F7F9FA',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: 16,
  },
  name: {
    width: 120,
    height: 16,
    borderRadius: 4,
  },
  body: {
    marginBottom: 16,
  },
  title: {
    width: '80%',
    height: 20,
    borderRadius: 4,
    marginBottom: 8,
  },
  description: {
    width: '100%',
    height: 12,
    borderRadius: 4,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    width: 80,
    height: 24,
    borderRadius: 4,
  },
});

export default Loading;
