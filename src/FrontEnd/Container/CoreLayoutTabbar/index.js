import React, { Component } from 'react'
import {View, Text, TouchableOpacity, StatusBar, StyleSheet, Platform, Dimensions} from 'react-native'
import PropTypes from 'prop-types'

import {width} from 'react-native-dimension'

import LinearGradient from 'react-native-linear-gradient'
import Entypo from 'react-native-vector-icons/Entypo'

const MyStatusBar = ({showStatusBar, backgroundColor, ...props}) => (
  showStatusBar
    ? <LinearGradient start={{x: 0.2, y: 0}} end={{x: 1, y: 0}} colors={['#299DFE', '#45C3FC']} style={[styles.statusBar, { backgroundColor }]}>
      <StatusBar hidden={!showStatusBar} translucent backgroundColor={backgroundColor} {...props} />
    </LinearGradient>
    : <View/>
)

const ISIOS = Platform.OS === 'ios'
const deviceHeight = Dimensions.get('window').height
const deviceWidth = Dimensions.get('window').width
const isIphoneX = ISIOS && (deviceHeight === 812 || deviceWidth === 812)

// isIphoneX ? 30 : ISIOS ? 20 : 0
const STATUSBAR_HEIGHT = isIphoneX ? 30 : ISIOS ? 20 : StatusBar.currentHeight

class CoreLayout extends Component {
  render () {
    const {title, children, CustomHeader, showStatusBar = true, leftIcon, rightIcon, leftAction, rightAction, headerStyle, titleColor} = this.props
    return (
      <View style={styles.container}>
        { <MyStatusBar showStatusBar={showStatusBar} barStyle="light-content" />}
        {
          CustomHeader ||
          <View style={[styles.containerHeader, headerStyle]}>
            <LinearGradient start={{x: 0.2, y: 0}} end={{x: 1, y: 0}} colors={['#299DFE', '#45C3FC']} style={styles.linearGradient}>
              <View style={styles.containerLeft}>
                {
                  leftAction &&
              <TouchableOpacity hitSlop= {{top: 20, bottom: 20, right: 20, left: 20}} onPress={leftAction} style={styles.containerLeft}>
                {leftIcon || <Entypo name={'chevron-thin-left'} size={width(7)} color={titleColor || '#FFFFFF'}/>}
              </TouchableOpacity>
                }
              </View>

              <View style={[styles.containerTitle]}>
                <Text style={[styles.txtTitle]}>{title}</Text>
              </View>

              <View style={styles.containerRight}>
                {
                  rightAction &&
                <TouchableOpacity hitSlop= {{top: 20, bottom: 20, right: 20, left: 20}} onPress={rightAction} style={styles.containerRight}>
                  { rightIcon || <Entypo name={'chevron-thin-right'} size={width(7)} color={titleColor || '#FFFFFF'}/>}
                </TouchableOpacity>}
              </View>
            </LinearGradient>
          </View>
        }
        <View style={styles.containerContent}>
          {children}
        </View>
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
  containerHeader: {
    flex: 1,
    alignSelf: 'center',
    shadowColor: '#fff',
    backgroundColor: 'transparent'
  },
  containerContent: {
    flex: 9,
    flexDirection: 'column',
    zIndex: 1
  },
  txtTitle: {
    color: '#FFFFFF',
    fontSize: width(5.5),
    fontWeight: 'bold'
  },
  containerTitle: {
    flex: 8,
    width: width(70),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center'
  },
  containerLeft: {
    flex: 1,
    width: width(15),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center'
  },
  containerRight: {
    flex: 1,
    width: width(15),
    alignItems: 'flex-start',
    justifyContent: 'center',
    alignSelf: 'center'
  },
  statusBar: {
    height: STATUSBAR_HEIGHT
  },
  linearGradient: {
    flex: 1,
    width: width(100),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
})
export default CoreLayout
