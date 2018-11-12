import React from 'react'
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native'
import I18n from 'react-native-i18n'
// style
import {height, width} from 'react-native-dimension'

// global
import {COLOR} from 'common/GlobalConstants'
// style
// _closeModal
const AlertCustom = ({_closeModal, handleLogout}) => {
  return (
    <View style={styles.container}>
      <View style={styles.contMess}>
        <Text style={styles.txtMess}>{I18n.t('common_dialog_confirm_restore_title')}</Text>
      </View>
      <View style={styles.contButton}>
        <TouchableOpacity onPress={_closeModal}>
          <View style={styles.btnLeft}>
            <Text style={styles.txtButton}>{I18n.t('common_button_cancel')}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogout}>
          <View style={styles.btnRight}>
            <Text style={styles.txtButton}>{I18n.t('common_button_ok')}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    height: height(20),
    width: width(80),
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
    alignSelf: 'center'
  },
  contMess: {
    paddingVertical: height(2),
    justifyContent: 'center',
    alignItems: 'center'
  },
  txtMess: {
    fontSize: width(4.5),
    textAlign: 'center'
  },
  contButton: {
    height: height(7),
    width: width(80),
    flexDirection: 'row',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5
  },
  // btn: {
  //   height: height(6),
  //   width: width(40),
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   backgroundColor: COLOR.BUTTON
  // },
  btnLeft: {
    borderBottomLeftRadius: 5,
    borderRightColor: '#c3c3c3',
    borderRightWidth: 1,
    height: height(6),
    width: width(40),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOR.BUTTON
  },
  btnRight: {
    borderBottomRightRadius: 5,
    height: height(6),
    width: width(40),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOR.BUTTON
  },
  txtButton: {
    color: '#FFFFFF',
    fontSize: width(5)
  }
})
export default AlertCustom
