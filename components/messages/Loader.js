import React from 'react';
import { StyleSheet, View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { COLOR } from "../../config/Color";
const Loader = () => {
  return (
    <SkeletonPlaceholder backgroundColor={COLOR.lightBg} highlightColor="#7E7A79">
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.avatar} />
          <View style={styles.info}>
            <View style={styles.title} />
            <View style={styles.title} />
            <View style={styles.subtitle} />
          </View>
        </View>
        <View style={styles.header}>
          <View style={styles.avatar} />
          <View style={styles.info}>
            <View style={styles.title} />
            <View style={styles.title} />
            <View style={styles.subtitle} />
          </View>
        </View>
        <View style={styles.header}>
          <View style={styles.avatar} />
          <View style={styles.info}>
            <View style={styles.title} />
            <View style={styles.title} />
            <View style={styles.subtitle} />
          </View>
        </View>
        <View style={styles.header}>
          <View style={styles.avatar} />
          <View style={styles.info}>
            <View style={styles.title} />
            <View style={styles.title} />
            <View style={styles.subtitle} />
          </View>
        </View>
        <View style={styles.header}>
          <View style={styles.avatar} />
          <View style={styles.info}>
            <View style={styles.title} />
            <View style={styles.title} />
            <View style={styles.subtitle} />
          </View>
        </View>
        <View style={styles.body}>
          <View style={styles.progress} />
          <View style={styles.separator} />
          <View style={styles.lesson} />
          <View style={styles.separator} />
          <View style={styles.lesson} />
          <View style={styles.separator} />
          <View style={styles.lesson} />
          <View style={styles.separator} />
          <View style={styles.lesson} />
        </View>
      </View>
    </SkeletonPlaceholder>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 16,
  },
  info: {
    flex: 1,
  },
  title: {
    width: '80%',
    height: 16,
    marginBottom: 8,
  },
  subtitle: {
    width: '60%',
    height: 16,
  },
  body: {
    marginBottom: 16,
  },
  progress: {
    width: '100%',
    height: 16,
    marginBottom: 8,
  },
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: '#E5E5E5',
    marginBottom: 8,
  },
  lesson: {
    width: '100%',
    height: 16,
    marginBottom: 8,
  },
});

export default Loader;
