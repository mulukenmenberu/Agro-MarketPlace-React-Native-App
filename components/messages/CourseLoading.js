import React from 'react';
import {
    SafeAreaView,
    View,
    FlatList,
    StyleSheet,
    Text,
    StatusBar,
} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { Card } from "react-native-paper";
import { COLOR } from "../../config/Color";

import { horizontalScale, verticalScale, moderateScale } from '../../config/Device'

const CourseLoading = () => {
    return (
        <View style={styles.container}>
            <SkeletonPlaceholder>
               

                <Card style={styles.progressCard} onPress={() => navigation.navigate('CoursePreview')}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{
                            width: horizontalScale(70), height: verticalScale(80), borderRadius: moderateScale(15),
                            backgroundColor: '#C4C4C4', justifyContent: 'flex-start'
                        }}>
                            <View style={styles.header}>
                                <View style={styles.avatar} />
                                <View style={styles.name} />
                            </View>
                            <View style={styles.body}>
                                <View style={styles.title} />
                                <View style={styles.description} />
                            </View>
                        </View>
                        <View style={{ paddingLeft: horizontalScale(10) }}>
                            <View style={styles.body}>
                                <View style={styles.title} />
                                <View style={styles.description} />
                            </View>

                        </View>
                    </View>
                </Card>

                <Card style={styles.progressCard} onPress={() => navigation.navigate('CoursePreview')}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{
                            width: horizontalScale(70), height: verticalScale(80), borderRadius: moderateScale(15),
                            backgroundColor: '#C4C4C4', justifyContent: 'flex-start'
                        }}>
                            <View style={styles.header}>
                                <View style={styles.avatar} />
                                <View style={styles.name} />
                            </View>
                            <View style={styles.body}>
                                <View style={styles.title} />
                                <View style={styles.description} />
                            </View>
                        </View>
                        <View style={{ paddingLeft: horizontalScale(10) }}>
                            <View style={styles.body}>
                                <View style={styles.title} />
                                <View style={styles.description} />
                            </View>

                        </View>
                    </View>
                </Card>

                <Card style={styles.progressCard} onPress={() => navigation.navigate('CoursePreview')}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{
                            width: horizontalScale(70), height: verticalScale(80), borderRadius: moderateScale(15),
                            backgroundColor: '#C4C4C4', justifyContent: 'flex-start'
                        }}>
                            <View style={styles.header}>
                                <View style={styles.avatar} />
                                <View style={styles.name} />
                            </View>
                            <View style={styles.body}>
                                <View style={styles.title} />
                                <View style={styles.description} />
                            </View>
                        </View>
                        <View style={{ paddingLeft: horizontalScale(10) }}>
                            <View style={styles.body}>
                                <View style={styles.title} />
                                <View style={styles.description} />
                            </View>

                        </View>
                    </View>
                </Card>


            </SkeletonPlaceholder>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F7F9FA',
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

    progressCard: {
        padding: 5,
        marginLeft: 20,
        marginRight: 20,
        marginTop: verticalScale(10),
        backgroundColor: '#fff',
        borderRadius: 15,
        shadowColor: '#ffffffff',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 5,
        height: verticalScale(120),
        justifyContent: 'center'
    },

});

export default CourseLoading;
