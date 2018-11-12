import { Actions, ActionConst } from 'react-native-router-flux'
// setPINcode
import { setPINcode } from 'controller/Redux/Actions'
import I18n from 'react-native-i18n'

let _this
export const funcDefaultThis = (THIS) => {
  return () => {
    _this = THIS
  }
}

/**
* @name : handleBackRoute
* @param :
* @description : back to previous screen
*/
export const handleBackRoute = () => {
  return () => {
    Actions.pop()
    _this.props.closeModal && _this.props.closeModal()
  }
}
/**
* NAME: changeTitle
* PARAMS: _this -  this is "this" of view file
* change title of screen with types of screen when route from  settingpincode
*
*/
export const changeTitle = () => {
  return () => {
    const { types } = _this.props
    if (types === 'SetupPinCode') {
      _this.setState({
        txtTitleInput: I18n.t('setting_screen_button_setting_new_pin_title')
      })
    } else if (types === 'ChangePinCode') {
      _this.setState({
        inputCorrectPINCount: -1,
        txtTitleInput: I18n.t('setting_screen_button_setting_current_pin_title')
      })
    } else if (types === 'RemovePinCode') {
      _this.setState({
        txtTitleInput: I18n.t('setting_screen_button_setting_current_pin_title')
      })
    } else {
      _this.setState({
        txtTitleInput: I18n.t('setting_screen_button_setting_current_pin_title')
      })
    }
  }
}
/**
* NAME: handlePress
* PARAMS: num,_this -  this is "this" of view file
* onPress of button on keyboard of pincode screen,
* check when input text length = 4
*/
export const handlePress = (num) => {
  return (dispatch, getState) => {
    const MAX_LENGTH = 4
    let { value, inputCorrectPINCount, temporaryNewPIN } = _this.state
    const { types } = _this.props
    const { pinCodeData } = getState()
    // const pinCode = '1234'
    value += String(num)
    _this.setState({ value })
    if (value.length === MAX_LENGTH) {
      setTimeout(() => {
        _this.setState({ value: '' })
        if (types === 'SetupPinCode') {
          if (inputCorrectPINCount === 0) {
            _this.setState({
              inputCorrectPINCount: 1,
              temporaryNewPIN: value,
              txtTitleInput: I18n.t('setting_screen_button_setting_confirm_pin_title')
            })
          } else {
            _this.setState({ isActiveButton: false })
            if (temporaryNewPIN.toString() === value) {
              dispatch(setPINcode(value))
              _this.setState({
                isShowModal: true,
                txtMessage: I18n.t('setting_screen_button_setting_pin_success'),
                isError: false
              })
            } else {
              _this.setState({
                isShowModal: true,
                txtTitleInput: I18n.t('setting_screen_button_setting_new_pin_title'),
                txtMessage: I18n.t('setting_screen_button_setting_pin_not_matched'),
                isError: true,
                inputCorrectPINCount: 0
              }, () => {
                setTimeout(() => {
                  _this.setState({ isActiveButton: true })
                }, 500)
              })
            }
          }
        // END : ---------------------------------------------------
        } else if (types === 'ChangePinCode') {
          if (inputCorrectPINCount === -1) {
          // Compare pinCode with the currenPIN
            if (value.toString() === pinCodeData.toString()) {
              _this.setState({
                txtTitleInput: I18n.t('setting_screen_button_setting_new_pin_title'),
                inputCorrectPINCount: 0
              })
            } else {
              _this.setState({
                isShowModal: true,
                txtMessage: I18n.t('setting_screen_button_setting_pin_not_matched'),
                isError: true,
                isActiveButton: false,
                inputCorrectPINCount: -1
              })
              setTimeout(() => {
                _this.setState({ isActiveButton: true })
              }, 500)
            }
          // ---------_END_------------
          } else if (inputCorrectPINCount === 0) {
          // Done input new 4 digits the first time or after reseting by input wrong PIN
            _this.setState({
              inputCorrectPINCount: 1,
              temporaryNewPIN: value,
              txtTitleInput: I18n.t('setting_screen_button_setting_confirm_pin_title')
            })
          } else {
            _this.setState({ isActiveButton: false })
            if (temporaryNewPIN.toString() === value) {
            // set value of  PkeyAsync.PINCode = newCode
              dispatch(setPINcode(value))
              _this.setState({
                isShowModal: true,
                txtMessage: I18n.t('setting_screen_button_setting_pin_success'),
                isError: false
              })
            } else {
              _this.setState({
                isShowModal: true,
                txtTitleInput: I18n.t('setting_screen_button_setting_new_pin_title'),
                txtMessage: I18n.t('setting_screen_button_setting_pin_not_matched'),
                isError: true,
                inputCorrectPINCount: 0
              }, () => {
                setTimeout(() => {
                  _this.setState({ isActiveButton: true })
                }, 500)
              })
            }
          }
        } else if (types === 'RemovePinCode') {
          _this.setState({ isActiveButton: false })
          if (value.toString() === pinCodeData.toString()) {
          // set value of  PkeyAsync.PINCode = newCode
            dispatch(setPINcode(''))
            _this.setState({
              isShowModal: true,
              txtMessage: I18n.t('setting_screen_button_setting_pin_success'),
              isError: false
            })
          } else {
            _this.setState({
              isShowModal: true,
              txtMessage: I18n.t('setting_screen_button_setting_pin_not_matched'),
              isError: true
            }, () => {
              setTimeout(() => {
                _this.setState({ isActiveButton: true })
              }, 500)
            })
          }
        } else {
          _this.setState({ isActiveButton: false })
          if (value.toString() === pinCodeData.toString()) {
            if (types === 'send') {
              Actions.pop()
            } else if (types === 'passphrase') {
              if (_this.props.roleBackupData) {
                Actions.createWallet({ type: ActionConst.REPLACE })
              } else {
                Actions.showPassphrase({ type: ActionConst.REPLACE })
              }
            }
          } else {
            _this.setState({
              isShowModal: true,
              txtMessage: I18n.t('setting_screen_button_setting_pin_not_matched'),
              isError: true
            }, () => {
              setTimeout(() => {
                _this.setState({ isActiveButton: true })
              }, 500)
            })
          }
        }
      }, 100)
    }
  }
}
/**
* NAME: makeDots
* PARAMS: num
* create dot for screen pincode
*/
export function makeDots (num) {
  return (dispatch, getState) => {
    let ret = ''
    while (num > 0) {
      ret += ' ○ '
      num--
    }
    return ret
  }
}
/**
* NAME: handleRemove
* PARAMS: _this - this is "this" of view file
* remove 1 chacracter in text input
*/
export const handleRemove = () => {
  return (dispatch, getState) => {
    const { value } = _this.state
    _this.setState({ value: value.substr(0, value.length - 1) })
  }
}

/**
* @name : handleClear
* @param : _this - this is "this" of view file
* @description : remove all chacracter in text input
*/
export const handleClear = () => {
  return () => {
    _this.setState({ value: '' })
  }
}
/**
* @name : handleFingerprintShowed
* @param :_this - this is "this" of view file
* @description : show finger popup
*/
export const handleFingerprintShowed = () => {
  return () => {
    _this.setState({ popupShowed: true })
  }
}

/**
* @name : handleFingerprintDismissed
* @param : _this - this is "this" of view file
* @description : hide finger popup
*/
export const handleFingerprintDismissed = () => {
  return () => {
    _this.setState({ popupShowed: false })
  }
}
export const onActionRouter = () => {
  return () => {
    const {types} = _this.props
    if (types === 'send') {
      Actions.pop()
    } else if (types === 'passphrase') {
      if (_this.props.roleBackupData) {
        Actions.createWallet({ type: ActionConst.REPLACE })
      } else {
        Actions.showPassphrase({ type: ActionConst.REPLACE })
      }
    }
  }
}
