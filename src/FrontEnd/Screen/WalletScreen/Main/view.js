import React, { Component } from 'react'
import { Image, View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native'

import CoreLayout from 'frontend/Container/CoreLayout'
import { logoNoText } from 'assets/Images'

import {COLOR, APPFONT} from 'common/GlobalConstants'

import {CustomModal, CustomLoading} from 'frontend/Components'
import ViewModal from './viewModal'

import I18n from 'react-native-i18n'
import LinearGradient from 'react-native-linear-gradient'
import { height, width } from 'react-native-dimension'

class MainUser extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isProcess: false,
      isShowModal: false
    }
    props.funcDefaultThis(this)
  }
  get renderHeader () {
    return (
      <View/>
    )
  }

  render () {
    const {handleRestore, appConfigData, handleSkipStep, handleCreate, handleLogout} = this.props
    const {isProcess, isShowModal} = this.state
    return (
      <CoreLayout showStatusBar={false} CustomHeader={this.renderHeader}>
        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0.5}} colors={['#299DFE', '#45C3FC']} style={styles.container}>
          <View style={styles.contImg}>
            <Image source={logoNoText} style={styles.img} resizeMode={'contain'}/>
            <Text style={styles.txtContent}>{I18n.t('create_wallet_screen_label_description')}</Text>
          </View>
          <View style={styles.contButton}>
            <TouchableOpacity style={styles.btn} onPress={handleCreate}>
              <Text style={styles.txtSignUp}>{I18n.t('common_button_create_wallet')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnRegister} onPress={handleRestore}>
              <Text style={styles.txtRegister}>{I18n.t('common_button_restore_wallet')}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSkipStep}>
              <Text style={styles.txtRegister}>{I18n.t('common_button_skip')}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleLogout}>
              <Text style={styles.txtLogout}>{I18n.t('common_button_back')}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.contFoot}>
            <Text style={styles.txtCopyright}>{appConfigData.app_copyright}</Text>
          </View>
        </LinearGradient>
        <CustomModal isShowModal={isShowModal} style={styles.modal}>
          <ViewModal funcClose={this.props.funcClose}/>
        </CustomModal>
        <CustomLoading style={styles.modalLoading} isProcess={isProcess}/>
      </CoreLayout>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  txtContent: {
    fontWeight: 'bold',
    width: width(80),
    fontSize: width(5.5),
    color: '#FFFFFF',
    textAlign: 'center',
    top: height(8)
  },
  contImg: {
    flex: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  img: {
    width: width(30),
    height: width(30),
    backgroundColor: 'transparent'
  },
  contButton: {
    flex: 4,
    alignItems: 'center',
    justifyContent: 'center'
  },
  btn: {
    height: height(8),
    width: width(70),
    borderRadius: height(4),
    borderColor: COLOR.BUTTON,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: height(3),
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 2
  },
  btnRegister: {
    height: height(8),
    width: width(70),
    borderRadius: height(4),
    borderColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: height(3),
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    borderWidth: Platform.OS === 'ios' ? 1 : 0,
    backgroundColor: 'transparent'
  },
  txtSignUp: {
    fontSize: width(5),
    color: COLOR.BUTTON,
    fontFamily: APPFONT.BOLD
  },
  txtRegister: {
    fontWeight: 'bold',
    fontSize: width(5),
    color: '#FFFFFF'
  },
  contFoot: {
    flex: 1,
    justifyContent: Platform.OS === 'ios' ? 'flex-end' : 'flex-start'
  },
  txtCopyright: {
    color: '#111111',
    alignSelf: 'center',
    fontSize: width(3)
  },
  modal: {
    height: height(50),
    width: width(80),
    top: height(25),
    backgroundColor: 'transparent'
  },
  txtLogout: {
    marginTop: height(2),
    color: '#111111',
    textDecorationLine: 'underline'
  },
  modalLoading: {
    top: height(40),
    backgroundColor: 'transparent'
  }
})
export default MainUser
