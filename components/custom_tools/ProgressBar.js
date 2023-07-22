import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SvgUri from 'react-native-svg-uri';
import { Svg, Path, LinearGradient, Stop } from 'react-native-svg';
import { horizontalScale, verticalScale, moderateScale } from '../../config/Device';
const ProgressBar = ({width, height, progress}) => {
  return (
    <View style={{}}>
      <Svg width={horizontalScale(width)} height={verticalScale(6)} viewBox="0 0 303 6" fill="none">
                <Path
                  d="M300 0H3C1.34315 0 0 1.34315 0 3C0 4.65685 1.34315 6 3 6H300C301.657 6 303 4.65685 303 3C303 1.34315 301.657 0 300 0Z"
                  fill="#F4F3FD"
                />
                <Path
                  d={progress}//"M210  0V6H3C2.20435 6 1.44129 5.68393 0.87868 5.12132C0.31607 4.55871 0 3.79565 0 3H0C0 2.20435 0.31607 1.44129 0.87868 0.87868C1.44129 0.31607 2.20435 0 3 0L210 0Z"
                  fill="url(#paint0_linear_0_1)"
                />
                <LinearGradient
                  id="paint0_linear_0_1"
                  x1={0}
                  y1={0}
                  x2={212.52}
                  y2={0}
                  gradientUnits="userSpaceOnUse"
                >
                  <Stop stopColor="white" stopOpacity={0} />
                  <Stop stopColor="#FF5106" />
                </LinearGradient>
              </Svg>
    </View>
  )
}

export default ProgressBar

const styles = StyleSheet.create({})