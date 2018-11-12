import React from 'react'
import {View, Text, TouchableOpacity, StyleSheet, Platform, Alert} from 'react-native'
import * as Animatable from 'react-native-animatable'
import { Actions } from 'react-native-router-flux'

import {CoreLayout} from 'frontend/Container'

// styles
import I18n from 'react-native-i18n'
import FingerprintScanner from 'react-native-fingerprint-scanner'
import FingerprintPopup from '../Component/FingerprintPopup'

import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'

import { width, height } from 'react-native-dimension'
import {COLOR} from 'common/GlobalConstants'
import {CustomModal} from 'frontend/Components'
const ISIOS = Platform.OS === 'ios'
// Language
// import I18n from 'react-native-i18n'

class PinCodeScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      txtTitleInput: 'Please input new PIN code', // title of input pincode
      value: '', // value of pincode when finish input pincode
      inputCorrectPINCount: 0, //
      temporaryNewPIN: '', // temp value when input pincode,

      isActiveButton: true, // active or disactive when inputed 4 character
      errorMessage: undefined,
      popupShowed: false,

      isShowModal: false,
      txtMessage: '',
      isError: false
    }
    props.funcDefaultThis(this)
  }

  // ================START=================
  //    Start region for lifeCycle function
  // ======================================

  componentDidMount () {
    const { types, isFingerprint } = this.props
    this.props.changeTitle()
    if (isFingerprint) {
      if (!['SetupPinCode', 'ChangePinCode', 'RemovePinCode'].includes(types)) {
        this.handleFingerprintShowed()
      }
    }
    FingerprintScanner
      .isSensorAvailable()
      .catch(error => this.setState({ errorMessage: error.message }))
  }

  // ================END===================
  //    End region for lifeCycle function
  // ======================================
  handleFingerprintShowed = () => {
    this.setState({ popupShowed: true })
  }
  handleFingerprintDismissed = () => {
    this.setState({ popupShowed: false })
  }

  /**
  * NAME: renderButton
  * PARAMS: num
  *
  */
  renderButton = (num) => {
    const { isActiveButton } = this.state
    return (
      <TouchableOpacity
        style={styles.btn}
        onPress={() => isActiveButton && this.props.handlePress(num)}>
        <Text style={styles.txtPinStyle}>{num}</Text>
      </TouchableOpacity>
    )
  }
  /**
  * NAME: renderButton
  * PARAMS: name, action
  *
  */
  renderAction = (name, action) => {
    const { types, isFingerprint } = this.props
    const { isActiveButton } = this.state
    let styleButton = [ styles.btn, {backgroundColor: 'transparent'} ]
    return (
      <TouchableOpacity style={styleButton} onPress={() => isActiveButton && action()}>
        {
          (types === 'ChangePinCode' || types === 'SetupPinCode' || types === 'RemovePinCode')
            ? (
              name === I18n.t('setting_screen_button_clear_title')
                ? <Text style={styles.txtClearStyle}>{}</Text>
                : <Feather name={'delete'} size={width(10)} color={'#111111'}/>)
            : (
              name === I18n.t('setting_screen_button_clear_title')
                ? (
                  isFingerprint
                    ? <Ionicons name={'ios-finger-print'} size={width(10)} color={COLOR.BUTTON}/>
                    : <Text style={styles.txtClearStyle}>{}</Text>
                )
                : <Feather name={'delete'} size={width(10)} color={'#111111'}/>
            )
        }
      </TouchableOpacity>
    )
  }
  funcShowAlert = (error) => Alert.alert(
    '',
    error,
    [
      {text: I18n.t('common_button_ok'), onPress: () => console.log('OK Pressed'), style: 'cancel'}
    ],
    { cancelable: false }
  )
  funcRouter = () => this.props.onActionRouter()
  // |------------------------------|
  // |--- RENDER MAIN VIEW START ---|
  // |------------------------------|
  render () {
    const { handleBackRoute, makeDots, handleClear, isFingerprint, handleRemove, types } = this.props
    const { txtTitleInput, value, popupShowed, isShowModal, txtMessage, isError } = this.state
    const MAX_LENGTH = 4
    const marks = value.replace(/./g, ' ● ')
    const dots = makeDots(MAX_LENGTH - value.length)
    let isActiveActionButton
    if (isFingerprint) {
      if (types === 'SetupPinCode') {
        isActiveActionButton = false
      } else if (types === 'ChangePinCode') {
        isActiveActionButton = false
      } else if (types === 'RemovePinCode') {
        isActiveActionButton = false
      } else {
        isActiveActionButton = true
      }
    } else {
      isActiveActionButton = false
    }
    return (
      <View>
        <CoreLayout title={I18n.t('setting_screen_button_setting_pin_title')} ref={'srcPinCodeScreen'} leftAction={handleBackRoute}>
          <View style={styles.pad}>
            {/* view of title */}
            <View style={styles.viewTitleInput}>
              <Animatable.Text
                ref={'txtTitleInput'}
                duration={1000}
                style={styles.txtTitleInput}>
                {txtTitleInput}
              </Animatable.Text>
            </View>
            {/* view of marks and dots */}
            <View style={styles.row} >
              <Text style={styles.pinMarks } >{marks}
                <Text style={styles.pin} >{dots}</Text>
              </Text>
            </View>
            {/* row 1,2,3 */}
            <View style={styles.viewRow} >
              {this.renderButton(1)}
              {this.renderButton(2)}
              {this.renderButton(3)}
            </View>
            {/* row 4,5,6 */}
            <View style={styles.viewRow} >
              {this.renderButton(4)}
              {this.renderButton(5)}
              {this.renderButton(6)}
            </View>
            {/* row 7, 8 ,9 */}
            <View style={styles.viewRow} >
              {this.renderButton(7)}
              {this.renderButton(8)}
              {this.renderButton(9)}
            </View>
            {/* row final */}
            <View style={styles.viewRow} >
              {
                this.renderAction(I18n.t('setting_screen_button_clear_title'), isActiveActionButton ? this.handleFingerprintShowed : () => handleClear())
              }
              {this.renderButton(0)}
              {this.renderAction(I18n.t('setting_screen_button_delete_title'), () => handleRemove())}
            </View>
          </View>
        </CoreLayout>
        {popupShowed && (
          <FingerprintPopup
            funcClosePopup ={this.handleFingerprintDismissed }
            funcShowAlert={this.funcShowAlert}
            actionRouter={this.funcRouter}
            style={styles.popup}
            handlePopupDismissed={this.handleFingerprintDismissed}
          />
        )}
        <CustomModal
          isError={isError}
          message={txtMessage}
          isShowModal={isShowModal}
          onPress={() => !isError
            ? Actions.pop()
            : this.setState({ isShowModal: false })}
        />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  viewRow: {
    width: width(85),
    height: height(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: width(5)
  },
  pin: {
    fontSize: width(5),
    fontWeight: ISIOS ? '400' : 'normal',
    color: '#111111'
  },
  pinMarks: {
    fontSize: width(8),
    fontWeight: ISIOS ? '400' : 'normal',
    color: '#111111'
  },
  txtPinStyle: {
    fontSize: width(12),
    color: '#111111'
  },
  pad: {
    flex: 1,
    margin: width(2.5)
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: height(25),
    height: height(10)
  },
  txtTitleInput: {
    color: '#111111',
    fontSize: width(5)
  },
  viewTitleInput: {
    height: height(7),
    justifyContent: 'center',
    alignItems: 'center'
  },
  txtClearStyle: {
    fontSize: width(6)
  },

  popup: {
    width: width(80)
  },
  btn: {
    width: width(24),
    height: height(8),
    borderRadius: height(6),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent'
  }
})
export default PinCodeScreen
