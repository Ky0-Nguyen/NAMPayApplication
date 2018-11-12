import React from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import {CoreLayout} from 'frontend/Container'
import { width, height } from 'react-native-dimension'
// styles
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import I18n from 'react-native-i18n'
// Language
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
// |------------------------------|
// |--- RENDER MAIN VIEW START ---|
// |------------------------------|
const SettingPinCodeScreen = ({ onChangePINCode, onSetupPINCode, onRemovePINCode, handleBackRoute, pinCodeData }) => (
  <CoreLayout title={I18n.t('setting_screen_button_setting_pin_title')} leftAction={handleBackRoute}>
    {
      pinCodeData === ''
        ? renderButton(I18n.t('setting_screen_button_setup_pin'), onSetupPINCode)
        : <View>
          {renderButton(I18n.t('setting_screen_button_change_pin'), onChangePINCode)}
          {renderButton(I18n.t('setting_screen_button_remove_pin'), onRemovePINCode)}
        </View>
    }
  </CoreLayout>

)

const styles = StyleSheet.create({
  btnView: {
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    width: width(100),
    height: height(8),
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    paddingHorizontal: width(5),
    flexDirection: 'row'
  },
  txtButtonTitle: {
    fontSize: width(5),
    color: '#111111'
  }
})
export default SettingPinCodeScreen
