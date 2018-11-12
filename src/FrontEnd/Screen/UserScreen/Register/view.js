import React from 'react'
import {View, ScrollView, TextInput, Platform, Keyboard, TouchableWithoutFeedback,
  TouchableOpacity, Image, Text, StyleSheet} from 'react-native'

import {logoNoText} from 'assets/Images'
import {CoreLayoutNoHeader} from 'frontend/Container'
import {COLOR} from 'common/GlobalConstants'

import * as Animatable from 'react-native-animatable'
import I18n from 'react-native-i18n'
import LinearGradient from 'react-native-linear-gradient'
import {width, height} from 'react-native-dimension'
import Ionicons from 'react-native-vector-icons/Ionicons'
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

// icon checkbox
// eslint-disable-next-line react-native/no-inline-styles
const icCheck = <Ionicons name={'md-checkmark'} size={width(5.5)} style={{position: 'absolute'}}/>
const icUnCheck = <Ionicons name={'ios-square-outline'} size={width(6)} />

export default class view extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      txtEmail: '',
      txtPhone: '',
      txtPassword: '',
      txtPasswordConfirm: '',

      txtErrorEmail: '',
      txtErrorPhone: '',
      txtErrorPassword: '',
      txtErrorPasswordConfirm: '',

      isEmailError: false,
      isPhoneError: false,
      isPasswordError: false,
      isPasswordConfirmError: false,

      isProcess: false,
      activeButton: false,
      arrError: [],
      isAgree: false,
      isErrorServer: false,
      txtErrorServer: '',

      isShowKeyboard: false
    }
    props.funcDefaultThis(this)
    console.log('', I18n.locale)
  }
  componentDidMount () {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow)
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide)
  }
  _keyboardDidShow = () => {
    this.setState({ isShowKeyboard: true })
  }

  _keyboardDidHide= () => {
    this.setState({ isShowKeyboard: false })
  }

  get renderHeader () {
    return (
      <View/>
    )
  }

  render () {
    const {
      onChangeTextEmail, onChangeTextPassword, onConfirmRegister,
      onChangeTextPhone, onChangeTextPasswordConfirm,
      handleLogin, handlePrivacy, handleTerm, handleCheck,
      handleCloseModal,
      onEndEditEmail
    } = this.props
    const {
      isEmailError, isPasswordError, isPasswordConfirmError, isPhoneError,
      txtEmail, txtPassword, txtPasswordConfirm, txtPhone, isShowKeyboard,
      txtErrorEmail, txtErrorPassword, txtErrorPasswordConfirm, txtErrorPhone,
      isProcess, isAgree, isErrorServer, txtErrorServer
    } = this.state
    let styleEmailError = {
      borderBottomColor: isEmailError ? 'red' : '#F0F0F0'
    }
    let stylePassError = {
      borderBottomColor: isPasswordError ? 'red' : '#F0F0F0'
    }
    let stylePhoneError = {
      borderBottomColor: isPhoneError ? 'red' : '#F0F0F0'
    }
    let stylePassConfirmError = {
      borderBottomColor: isPasswordConfirmError ? 'red' : '#F0F0F0'
    }
    let styleContInput = [styles.contInput, {
      bottom: isShowKeyboard ? height(20) : 0
    }]

    let styleButton = [styles.btn, {
      marginTop:
      I18n.locale === 'ja' ? height(Platform.OS === 'ios' ? 70 : 71) : height(Platform.OS === 'ios' ? 69 : 71)}]
    return (
      <CoreLayoutNoHeader>
        <ScrollView keyboardShouldPersistTaps={'handled'} scrollEnabled={false} ref={'scrRegister'} >
          <View pointerEvents={isProcess ? 'none' : 'box-none'} style={styles.container}>
            {/* background top view */}

            <LinearGradient start={{x: 0.2, y: 0}} end={{x: 1, y: 0}} colors={['#299DFE', '#45C3FC']} style={styles.contTopBackground} />
            {/* Interface  */}
            <View style={styles.contTop}>
              <Image source={logoNoText} style={styles.img} resizeMode={'contain'}/>
              <Text style={styles.txtSignUp}>{I18n.t('common_button_register')}</Text>
            </View>

            <Animatable.View style={styles.contBottom}>
              <Animatable.View transition="bottom" View style={styleContInput}>
                {/* Text input Email */}
                <Animatable.View style={styles.contInputText}>
                  <TextInput
                    value={txtEmail}
                    maxLength={150}
                    onEndEditing={onEndEditEmail}
                    onChangeText={onChangeTextEmail}
                    placeholder={I18n.t('login_screen_txt_email')}
                    style={[styles.inp, styleEmailError]}
                    underlineColorAndroid={'transparent'}/>
                  <Animatable.Text animation="AnimError" style={styles.txtError}>{isEmailError && txtErrorEmail}</Animatable.Text>
                </Animatable.View>

                {/* Phone number  */}
                <Animatable.View style={styles.contInputText}>
                  <TextInput
                    value={txtPhone}
                    maxLength={20}
                    keyboardType={'phone-pad'}

                    selectTextOnFocus={false}

                    onChangeText={onChangeTextPhone}
                    placeholder={I18n.t('login_screen_txt_phone')}
                    style={[styles.inp, stylePhoneError]}
                    underlineColorAndroid={'transparent'}/>
                  <Animatable.Text animation="AnimError" style={styles.txtError}>{isPhoneError && txtErrorPhone}</Animatable.Text>
                </Animatable.View>

                {/* Text INput password */}
                <Animatable.View style={[styles.contInputText]}>
                  <TextInput
                    value={txtPassword}
                    secureTextEntry={true}
                    textContentType={'password'}
                    onChangeText={onChangeTextPassword}
                    placeholder={I18n.t('login_screen_txt_password')}
                    style={[styles.inp, stylePassError]}
                    underlineColorAndroid={'transparent'}/>
                  <Animatable.Text animation="AnimError" style={styles.txtError}>{isPasswordError && txtErrorPassword}</Animatable.Text>
                </Animatable.View>

                {/* confirm password */}
                <Animatable.View style={styles.contInputText}>
                  <TextInput
                    maxLength={25}
                    value={txtPasswordConfirm}
                    secureTextEntry={true}
                    textContentType={'password'}
                    onChangeText={onChangeTextPasswordConfirm}
                    placeholder={I18n.t('login_screen_txt_confirmation_password')}
                    style={[styles.inp, stylePassConfirmError]}
                    underlineColorAndroid={'transparent'}/>
                  <Animatable.Text animation="AnimError" style={styles.txtError}>{isPasswordConfirmError && txtErrorPasswordConfirm}</Animatable.Text>
                </Animatable.View>
                {/* container tip */}
                <View style={styles.contTip}>
                  <TouchableWithoutFeedback onPress={handleCheck}>
                    <View style={styles.contIcon}>
                      {icUnCheck}
                      {isAgree && icCheck}
                    </View>
                  </TouchableWithoutFeedback>
                  {
                    I18n.locale === 'ja'
                      ? <Text style={styles.txtTip}>
                        <Text onPress={handlePrivacy} style={styles.txtButton}>{I18n.t('common_privacy_policy')}</Text>
                        <Text style={styles.txtTip}>{' & '}</Text>
                        <Text onPress={handleTerm} style={styles.txtButton}>{I18n.t('common_label_terms_of_services')}</Text>
                        {I18n.t('login_screen_label_agree')}
                      </Text>
                      : <Text style={styles.txtTip}>{I18n.t('login_screen_label_agree')}
                        <Text onPress={handlePrivacy} style={styles.txtButton}>{I18n.t('common_privacy_policy')}</Text>
                        <Text style={styles.txtTip}>{' & '}</Text>
                        <Text onPress={handleTerm} style={styles.txtButton}>{I18n.t('common_label_terms_of_services')}</Text>
                      </Text>
                  }

                </View>
              </Animatable.View>
            </Animatable.View>

            <View style={styles.contRegister}>
              <Text style={styles.txtRegister}>{I18n.t('register_screen_label_ask_account')}</Text>
              <TouchableOpacity onPress={handleLogin} style={styles.btnRegister}>
                <Text style={styles.txtSubRegister}>{I18n.t('common_button_login')}</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Animatable.View style={styleButton}>
            <TouchableOpacity onPress={onConfirmRegister}>
              <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0.5}} colors={['#299DFE', '#45C3FC']} style={styles.btnLinearGradient} >
                <Text style={styles.txtSignUp}>{I18n.t('common_button_register')}</Text>
              </LinearGradient>
            </TouchableOpacity>
          </Animatable.View>
        </ScrollView>
        <CustomModal message ={txtErrorServer} onPress={handleCloseModal} isShowModal={isErrorServer}/>
        <CustomLoading style={styles.modalLoading} isProcess={isProcess}/>
      </CoreLayoutNoHeader>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 4
    // paddingTop: height(Platform.OS === 'ios' ? 4 : 10),
  },
  contTopBackground: {
    backgroundColor: COLOR.BUTTON,
    position: 'absolute',
    zIndex: -1,
    height: height(50),
    width: width(100)
  },
  contIcon: {
    height: width(8),
    width: width(8),
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  img: {
    width: width(30),
    height: height(25)
  },
  txtSignUp: {
    color: '#FFFFFF',
    fontSize: width(6)
  },
  // Top
  contTop: {
    flex: 4,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  // Bottom
  contBottom: {
    flex: 6,
    justifyContent: 'center',
    alignItems: 'center'
  },
  contInput: {
    width: width(80),
    height: height(44),
    borderRadius: 8,
    justifyContent: 'flex-start',
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    paddingTop: height(1.5),
    elevation: 2
  },
  contInputText: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginHorizontal: width(10),
    borderColor: '#F0F0F0'
  },
  inp: {
    width: width(60),
    height: height(Platform.OS === 'ios' ? 5 : 6),
    fontSize: width(Platform.OS === 'ios' ? 3.5 : 2.5),
    borderBottomWidth: 1
  },
  btn: {
    width: width(70),
    height: height(8),
    borderRadius: height(4),
    alignSelf: 'center',
    position: 'absolute',
    zIndex: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5
  },
  contTip: {
    flex: 1.5,
    width: width(60),
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'center'
  },
  contRegister: {
    flex: 1,
    marginTop: height(7),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
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
    fontSize: width(Platform.OS === 'ios' ? 2.5 : 2)
  },
  txtButton: {
    fontSize: width(3),
    color: COLOR.BUTTON
  },
  txtTip: {
    fontSize: width(2.5),
    width: width(52)
  },
  modalLoading: {
    top: height(40),
    backgroundColor: 'transparent'
  }
})
