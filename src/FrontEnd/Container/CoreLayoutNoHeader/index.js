import React, { Component } from 'react'
import {View, StatusBar, StyleSheet, Platform, Dimensions} from 'react-native'
import PropTypes from 'prop-types'

import {width, height} from 'react-native-dimension'

import { InternetAlert } from 'frontend/Components/CustomAlert'
import LinearGradient from 'react-native-linear-gradient'

const MyStatusBar = ({showStatusBar = true, backgroundColor, ...props}) => {
  return (
    <LinearGradient start={{x: 0.2, y: 0}} end={{x: 1, y: 0}} colors={['#299DFE', '#45C3FC']} style={[styles.statusBar, { backgroundColor }]} >
      <StatusBar hidden={!showStatusBar} translucent backgroundColor={backgroundColor} {...props} />
    </LinearGradient>
  )
}
const ISIOS = Platform.OS === 'ios'
const deviceHeight = Dimensions.get('window').height
const deviceWidth = Dimensions.get('window').width
const isIphoneX = ISIOS && (deviceHeight === 812 || deviceWidth === 812)

// isIphoneX ? 30 : ISIOS ? 20 : 0
const STATUSBAR_HEIGHT = isIphoneX ? 30 : ISIOS ? 20 : StatusBar.currentHeight

class CoreLayout extends Component {
  render () {
    const {children, showStatusBar = true, isDisableInternetAlert = false} = this.props
    return (
      <View style={styles.container}>
        <MyStatusBar showStatusBar={showStatusBar} barStyle="light-content" />
        <View style={styles.contContent}>
          {children}
        </View>
        {!isDisableInternetAlert && <InternetAlert/>}
      </View>
    )
  }
}
CoreLayout.propTypes = {
  title: PropTypes.string,
  leftAction: PropTypes.func,
  rightAction: PropTypes.func
}
CoreLayout.defaultProps = {
  title: '',
  leftAction: undefined,
  rightAction: undefined
}

const styles = StyleSheet.create({
  container: {
    width: deviceWidth,
    height: deviceHeight,
    backgroundColor: '#FFFFFF'
  },
  contContent: {
    height: height(100),
    width: width(100),
    zIndex: 1
  },
  statusBar: {
    height: STATUSBAR_HEIGHT,
    backgroundColor: 'transparent'
  }
})
export default CoreLayout
