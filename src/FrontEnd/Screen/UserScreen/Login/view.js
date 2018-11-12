import React from 'react'
import {View, ScrollView, TextInput, Platform, TouchableWithoutFeedback,
  TouchableOpacity, Image, Text, StyleSheet} from 'react-native'

import {logoNoText} from 'assets/Images'
import { CoreLayoutNoHeader } from 'frontend/Container'
import {STYLE, COLOR} from 'common/GlobalConstants'

import * as Animatable from 'react-native-animatable'
import I18n from 'react-native-i18n'
import LinearGradient from 'react-native-linear-gradient'
import {width, height} from 'react-native-dimension'
import {CustomModal, CustomLoading} from 'frontend/Components'

Animatable.initializeRegistryWithDefinitions({
  AnimError: {
    from: {
      opacity: 0
    },
    to: {
      opacity: 1
    }
  }
})

export default class view extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      txtEmail: '',
      txtPassword: '',

      txtErrorEmail: '',
      txtErrorPassword: '',

      isEmailError: false,
      isPasswordError: false,
      isProcess: false,

      activeButton: false,

      isErrorServer: false,
      txtErrorServer: 'Error login !!'
    }
    props.funcDefaultThis(this)
  }

  render () {
    const {
      handleRegister, handleLogin,
      onChangeTextEmail, onChangeTextPassword, handleCloseModal
    } = this.props
    const {
      isEmailError, isPasswordError, isProcess, activeButton,
      txtEmail, txtPassword, txtErrorEmail, txtErrorPassword, txtErrorServer, isErrorServer
    } = this.state
    let styleEmailError = {
      borderBottomColor: isEmailError ? 'red' : '#F0F0F0'
    }
    let stylePassError = {
      borderBottomColor: isPasswordError ? 'red' : '#F0F0F0'
    }

    return (
      <CoreLayoutNoHeader>
        <ScrollView keyboardShouldPersistTaps={'handled'} scrollEnabled={false} ref={'scrRegister'} >
          <View pointerEvents={isProcess ? 'none' : 'box-none'} style={styles.container}>
            {/* background top view */}
            <LinearGradient start={{x: 0.2, y: 0}} end={{x: 1, y: 0}} colors={['#299DFE', '#45C3FC']} style={styles.contTopBackground} />

            {/* Interface  */}
            <View style={styles.contTop} >
              <Image source={logoNoText} style={styles.img} resizeMode={'contain'}/>
              <Text style={styles.txtSignUp}>{I18n.t('common_button_login')}</Text>
            </View>

            <View style={styles.contBottom}>
              <View style={styles.contInput}>
                {/* Text input Email */}
                <Animatable.View style={[styles.contInputText, styleEmailError]}>
                  <TextInput
                    value={txtEmail}
                    maxLength={150}
                    numberOfLines={1}
                    onChangeText={onChangeTextEmail}
                    placeholder={I18n.t('login_screen_txt_email')}
                    style={styles.inp}
                    underlineColorAndroid={'transparent'}/>
                </Animatable.View>
                {isEmailError && <Animatable.Text animation="AnimError" style={styles.txtError}>{txtErrorEmail}</Animatable.Text>}

                {/* Text INput password */}
                <Animatable.View style={[styles.contInputText, stylePassError]}>
                  <TextInput
                    value={txtPassword}
                    secureTextEntry={true}
                    maxLength={25}
                    textContentType={'password'}
                    onChangeText={onChangeTextPassword}
                    placeholder={I18n.t('login_screen_txt_password')}
                    style={styles.inp}
                    underlineColorAndroid={'transparent'}/>
                </Animatable.View>
                {isPasswordError && <Animatable.Text animation="AnimError" style={styles.txtError}>{txtErrorPassword}</Animatable.Text>}
              </View>
              <View style={styles.contRegister}>
                <Text style={styles.txtRegister}>{I18n.t('login_screen_label_ask_account')}</Text>
                <TouchableOpacity onPress={handleRegister} style={styles.btnRegister}>
                  <Text style={styles.txtSubRegister}>{I18n.t('common_button_register')}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.btn} pointerEvents={activeButton ? isProcess ? 'none' : 'box-none' : 'none'}>
            <TouchableWithoutFeedback onPress={handleLogin}>
              {
                activeButton
                  ? <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0.5}} colors={['#299DFE', '#45C3FC']} style={styles.btnLinearGradient} >
                    <Text style={styles.txtSignUp}>{I18n.t('common_button_login')}</Text>
                  </LinearGradient>
                  : <View style={[styles.btnLinearGradient, STYLE.BUTTON_DISABLE]}>
                    <Text style={styles.txtSignUp}>{I18n.t('common_button_login')}</Text>
                  </View>
              }
            </TouchableWithoutFeedback>
          </View>
        </ScrollView>
        <CustomModal message ={txtErrorServer} onPress={handleCloseModal} isShowModal={isErrorServer}/>
        <CustomLoading style={styles.modalLoading} isProcess={isProcess}/>
      </CoreLayoutNoHeader>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 9,
    height: height(Platform.OS === 'ios' ? 96 : 90),
    width: width(100)
  },
  contTopBackground: {
    backgroundColor: COLOR.BUTTON,
    position: 'absolute',
    zIndex: -1000,
    height: height(50),
    width: width(100)
  },
  contTop: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  contBottom: {
    flex: 6
  },
  contInput: {
    width: width(80),
    height: height(30),
    borderRadius: 8,
    justifyContent: 'flex-start',
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 2
  },
  contInputText: {
    borderBottomWidth: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginHorizontal: width(10),
    marginTop: height(2.5),
    borderColor: '#F0F0F0'
  },
  img: {
    width: width(30),
    height: height(25)
  },
  txtSignUp: {
    color: '#FFFFFF',
    fontSize: width(6)
  },
  inp: {
    width: width(60),
    height: height(6),
    fontSize: width(3.5),
    lineHeight: width(3.7)
  },
  btn: {
    marginTop: height(Platform.OS === 'ios' ? 64 : 62),
    width: width(70),
    height: height(8),
    borderRadius: height(4),
    alignSelf: 'center',
    position: 'absolute',
    zIndex: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 3
  },
  contRegister: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: height(8)
  },
  btnRegister: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  txtRegister: {
    color: '#C1C1C1',
    fontSize: width(3.5),
    alignSelf: 'center'
  },
  txtSubRegister: {
    color: '#ACACAC',
    fontWeight: 'bold'
  },
  btnLinearGradient: {
    width: width(70),
    height: height(8),
    borderRadius: height(4),
    justifyContent: 'center',
    alignItems: 'center'
  },
  txtError: {
    color: 'red',
    top: height(1),
    fontSize: width(Platform.OS === 'ios' ? 2.5 : 2),
    marginHorizontal: width(10)
  },
  modalLoading: {
    top: height(40),
    backgroundColor: 'transparent'
  }
})
