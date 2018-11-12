// import liraries
import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import {width, height} from 'react-native-dimension'
import {CoreLayout} from 'frontend/Container'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import LinearGradient from 'react-native-linear-gradient'

import I18n from 'react-native-i18n'

import {APPFONT, COLOR} from 'common/GlobalConstants'

const icWarning = <EvilIcons name={'exclamation'} color={'red'} size={width(35)}/>
const icDown = <Ionicons name={'ios-arrow-round-down'} size={width(25)} color={COLOR.BUTTON} />

// create a component
class MyClass extends Component {
  // constructor (props) {
  //   super(props)
  //   // props.funcDefaultThis(this)
  // }
  render () {
    const {handleBackRoute, handleNext, localeData} = this.props
    return (
      <CoreLayout headerStyle={styles.headerStyle} title={I18n.t('common_button_create_wallet')} leftAction={handleBackRoute}>
        <View style={styles.container}>
          <View style={styles.contTop}>
            {icWarning}
            <Text style={styles.txtWarning}>{I18n.t('create_wallet_screen_tip_1')}</Text>
            <Text style={styles.txtTip}>{I18n.t('create_wallet_screen_tip_2')}</Text>
            {/* </View>
          <View style={styles.contBottom}> */}
            {icDown}
            <Text style={styles.txtTip}>{I18n.t('create_wallet_screen_tip_3')}</Text>

            {localeData === 'ja' && <Text style={styles.txtTip2}>{I18n.t('create_wallet_screen_tip_7_1')}</Text>}
            {localeData === 'ja' && <Text style={styles.txtTip2}>{I18n.t('create_wallet_screen_tip_7_2')}</Text>}
            {localeData === 'ja' && <Text style={styles.txtTip2}>{I18n.t('create_wallet_screen_tip_7_3')}</Text>}
            {localeData === 'ja' && <Text style={styles.txtTip2}>{I18n.t('create_wallet_screen_tip_7_4')}</Text>}
          </View>
          <View style={styles.contButton}>
            <TouchableOpacity style={styles.btn} onPress={handleNext}>
              <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0.5}} colors={['#299DFE', '#45C3FC']} style={styles.linearGradient}>
                <Text style={styles.txtButton}>{I18n.t('setting_screen_button_show_mnemonic')}</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </CoreLayout>
    )
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF'
  },
  contTop: {
    flex: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  // contBottom: {
  //   flex: 4,
  //   justifyContent: 'center',
  //   alignItems: 'center'
  // },
  contButton: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  txtWarning: {
    fontSize: width(6),
    fontFamily: APPFONT.BOLD,
    fontWeight: 'bold',
    color: 'red'
  },
  txtTip: {
    width: width(90),
    fontSize: width(3.5),
    textAlign: 'center',
    marginBottom: height(1)
  },
  txtTip2: {
    width: width(90),
    fontSize: width(3.5),
    textAlign: 'center'
  },
  headerStyle: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    marginBottom: 5
  },
  btn: {
    height: height(7),
    width: width(70),
    borderRadius: height(3.5)
  },
  linearGradient: {
    flex: 1,
    borderRadius: height(3.5),
    justifyContent: 'center',
    alignItems: 'center'
  },
  txtButton: {
    color: '#FFFFFF',
    fontSize: width(5),
    fontWeight: 'bold',
    fontFamily: APPFONT.BOLD
  }
})

// make this component available to the app
export default MyClass
