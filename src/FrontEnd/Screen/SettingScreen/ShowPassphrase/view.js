// import liraries
import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import {width, height} from 'react-native-dimension'
import {COLOR} from 'common/GlobalConstants'
import { Actions, ActionConst } from 'react-native-router-flux'
import I18n from 'react-native-i18n'

import {CoreLayout} from 'frontend/Container'
import LinearGradient from 'react-native-linear-gradient'
// create a component
const MyClass = ({walletData, handleBackRoute, handleConfirm, roleBackupData}) => (
  <CoreLayout title={I18n.t('setting_screen_button_show_mnemonic_title')} leftAction={handleBackRoute} headerStyle={styles.headerStyle} titleColor={'#ffffff'}>
    <View style={styles.container}>
      <View style={styles.contTop}>
        <LinearGradient start={{x: 0, y: 0}} end={{x: 0.75, y: 0}} colors={['#299DFE', '#45C3FC']} style={styles.contDisplay} >
          <Text style={styles.txtPassphrase}>{walletData && walletData.mnemonic}</Text>
        </LinearGradient>
      </View>
      {
        roleBackupData
          ? <View style={styles.contBottom}>

            <Text style={{ alignSelf: 'center' }}>{I18n.t('showpassphrase_screen_title_button')}</Text>

            <TouchableOpacity onPress={handleConfirm}>
              <LinearGradient start={{x: 0, y: 0}} end={{x: 0.75, y: 0}} colors={['#299DFE', '#45C3FC']} style={styles.button} >
                <Text style={styles.txtButton}>{I18n.t('showpassphrase_screen_button_title')}</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnBackToTop} onPress={() => Actions.walletTopScreen({ type: ActionConst.RESET })}>
              <Text style={{ color: 'blue' }}>{I18n.t('showpassphrase_screen_button_backtotop_title')}</Text>
            </TouchableOpacity>
          </View>
          : <View style={styles.contBottom}></View>
      }

    </View>
  </CoreLayout>
)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  headerStyle: {
    backgroundColor: COLOR.BUTTON
  },
  contTop: {
    flex: 3,
    padding: width(5),
    justifyContent: 'center',
    alignItems: 'center'
  },
  contBottom: {
    flex: 7,
    paddingHorizontal: width(5),
    paddingVertical: height(5),
    justifyContent: 'flex-end'
  },
  contDisplay: {
    backgroundColor: COLOR.BUTTON,
    padding: width(5),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 5
  },
  txtPassphrase: {
    color: '#FFFFFF',
    fontSize: width(5),
    textAlign: 'center',
    fontWeight: 'bold'
  },
  txtButton: {
    color: '#FFFFFF',
    fontSize: width(6),
    textAlign: 'center',
    fontWeight: 'bold'
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: height(2),
    paddingHorizontal: width(2),
    borderRadius: height(4),
    marginBottom: height(2)
  },
  btnBackToTop: {
    alignSelf: 'center'
  }

})
// make this component available to the app
export default MyClass
