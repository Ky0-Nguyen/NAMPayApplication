import React from 'react'
import { View, TouchableOpacity, Text, Switch, StyleSheet } from 'react-native'
import { width, height } from 'react-native-dimension'
import {CoreLayout} from 'frontend/Container'
import I18n from 'react-native-i18n'
import FingerprintScanner from 'react-native-fingerprint-scanner'
// styles
import FontAwesome from 'react-native-vector-icons/FontAwesome'
const icRight = <FontAwesome name={'angle-right'} size ={width(10)} color={'#D5D5D5'}/>
/**
* NAME: renderButton
* PARAMS: buttonTitle, onClick
*/
const renderButton = (buttonTitle, onClick) => {
  return (
    <TouchableOpacity onPress={onClick}>
      <View style={styles.btnView}>
        <Text style={styles.txtButtonTitle}>{buttonTitle}</Text>
        {icRight}
      </View>
    </TouchableOpacity>
  )
}
let ErrorMessage
FingerprintScanner
  .isSensorAvailable()
  .catch(error => (ErrorMessage = error.message))
// |------------------------------|
// |--- RENDER MAIN VIEW START ---|
// |------------------------------|
const SecurityScreen = ({ handleBackRoute, onChangeSwitchValue, isFingerprint, onSettingPinCode }) => {
  return (
    <CoreLayout title={I18n.t('setting_screen_button_security')} leftAction={handleBackRoute}>
      {renderButton(I18n.t('setting_screen_button_setting_pin'), onSettingPinCode)}
      {
        !ErrorMessage &&
        <View style={styles.FingerPrintContainer}>
          <View style={styles.viewTop}>
            <Text style={styles.txtTitle}>{I18n.t('setting_screen_button_setting_fingerprint')}</Text>
            <Switch tintColor={'#F0F0F0'} value={isFingerprint} onValueChange={value => onChangeSwitchValue(value, ErrorMessage)}/>
          </View>
        </View>
      }
    </CoreLayout>
  )
}

const styles = StyleSheet.create({
  btnView: {
    width: width(100),
    height: height(8),
    justifyContent: 'space-between',
    paddingHorizontal: width(5),
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center'
  },
  txtButtonTitle: {
    fontSize: width(5),
    color: '#111111'
  },
  FingerPrintContainer: {
    width: width(100),
    height: height(8),
    justifyContent: 'space-between',
    paddingHorizontal: width(5),
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center'
  },
  viewTop: {
    flexDirection: 'row',
    height: height(7),
    width: width(90),
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  txtTitle: {
    color: '#111111',
    fontSize: width(5)
  }
})
export default SecurityScreen
