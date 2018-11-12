import { Alert } from 'react-native'
import {Actions, ActionConst} from 'react-native-router-flux'
import {validateEmail, validatePhone} from 'common/GlobalFuntions'
import I18n from 'react-native-i18n'
import * as ActionsRedux from 'controller/Redux/Actions'
import API from 'controller/API'

// import {Platform} from 'react-native'
// import {height} from 'react-native-dimension'

/**
* @method : funcDefaultThis
* @param: THIS
* @description :  set default this of screen
* @author : Tuan Nguyen
* @Create_date: 2018/07/04
* @Update_date:
* @Update_by:
* @Update_description:
*/
let _this
export const funcDefaultThis = (THIS) => {
  return () => {
    _this = THIS
  }
}

/**
* @method : handleBackRoute
* @param:
* @description : back to previous screen
* @author : Tuan Nguyen
* @Create_date: 2018/07/04
* @Update_date:
* @Update_by:
* @Update_description:
*/
export const handleBackRoute = () => {
  return () => {
    Actions.pop()
  }
}

/**
* @method : onChangeTextEmail
* @param: text
* @description : change text of email input
* @author : Tuan Nguyen
* @Create_date: 2018/07/04
* @Update_date:
* @Update_by:
* @Update_description:
*/
export const onChangeTextEmail = (text) => {
  return () => {
    _this.setState({
      txtEmail: text
    })
  }
}

/**
* @method : onChangeTextPassword
* @param: text
* @description : change text of password input
* @author : Tuan Nguyen
* @Create_date: 2018/07/03
* @Update_date:
* @Update_by:
* @Update_description:
*/
export const onChangeTextPassword = (text) => {
  return () => {
    _this.setState({
      txtPassword: text
    })
  }
}

/**
* @method : onChangeTextPhone
* @param: text
* @description : change text of phone input
* @author : Tuan Nguyen
* @Create_date: 2018/07/04
* @Update_date:
* @Update_by:
* @Update_description:
*/
export const onChangeTextPhone = (text) => {
  return () => {
    _this.setState({
      txtPhone: text
    })
  }
}

/**
* @method : onChangeTextPasswordConfirm
* @param: text
* @description : change text of password confirm input
* @author : Tuan Nguyen
* @Create_date: 2018/07/04
* @Update_date:
* @Update_by:
* @Update_description:
*/
export const onChangeTextPasswordConfirm = (text) => {
  return () => {
    _this.setState({
      txtPasswordConfirm: text
    })
  }
}

const checkActiveButton = () => {
  const {
    isEmailError, isPasswordError, isPasswordConfirmError, isPhoneError,
    txtEmail, txtPassword, txtPasswordConfirm, txtPhone, isAgree
  } = _this.state

  if (!isEmailError && !isPasswordError && !isPasswordConfirmError && !isPhoneError && isAgree) {
    if (txtEmail.length > 0 && txtPassword.length > 0 && txtPasswordConfirm.length > 0 && txtPhone.length > 0) {
      _this.setState({ activeButton: true })
    } else {
      _this.setState({ activeButton: false })
    }
  } else {
    _this.setState({ activeButton: false })
  }
}

/** -------------------------------------
* @method : onConfirmRegister
* @param:
* @description :
* @author : Tuan Nguyen
* @Create_date: 2018/08/03
* @Update_date:
* @Update_by:
* @Update_description:
* ---------------------------------------
*/
export const onConfirmRegister = () => {
  return (dispatch, getState) => {
    const {txtEmail, txtPhone, txtPassword, txtPasswordConfirm, activeButton} = _this.state
    const {localeData} = getState()
    let txtErrorPassword =
    txtPassword.length === 0
      ? I18n.t('common_param_required').replace('$0', I18n.t('common_text_password'))
      : txtPassword.length < 6
        ? (I18n.t('common_param_min').replace('$0', I18n.t('common_text_password'))).replace('$1', '6')
        : txtPassword.length > 25 &&
          I18n.t('common_param_min').replace('$0', I18n.t('common_text_password')).replace('$1', '25')
    _this.setState({
      txtErrorPassword,
      isPasswordError: txtPassword.length === 0 || txtPassword.length < 6 || txtPassword.length > 25
    })

    let emailError = txtEmail.length === 0
      ? I18n.t('common_param_required').toString().replace('$0', I18n.t('common_text_email'))
      : I18n.t('common_param_format').toString().replace('$0', I18n.t('common_text_email'))
    _this.setState({
      isEmailError: !validateEmail(txtEmail),
      txtErrorEmail: emailError
    })

    let txtErrorPasswordConfirm = I18n.t('common_error_password_not_match')
    _this.setState({
      txtErrorPasswordConfirm,
      isPasswordConfirmError: txtPasswordConfirm !== txtPassword
    })

    let txtErrorPhone = txtPhone.length === 0
      ? I18n.t('common_param_required').toString().replace('$0', I18n.t('common_text_phone'))
      : I18n.t('common_param_format').toString().replace('$0', I18n.t('common_text_phone'))
    _this.setState({
      isPhoneError: !validatePhone(txtPhone) && !(txtPhone.length >= 8 && txtPhone.length <= 20),
      txtErrorPhone: txtErrorPhone
    })
    checkActiveButton()

    if (activeButton) {
      _this.setState({ isProcess: true })
      //  delay 0.5s  after click button
      setTimeout(async () => {
        let registerData = await API.PostSignUp(localeData, txtEmail, txtPhone, txtPassword, txtPasswordConfirm, '')
        if (registerData.code === 200) {
          let btcInfo = {}
          let ethInfo = {}
          registerData.data.AddressList.map(item => {
            if (item.address_type === 1) {
              btcInfo = {
                address: item.address_code,
                priKey: item.private_key
              }
            } else if (item.address_type === 2) {
              ethInfo = {
                address: item.address_code,
                priKey: item.private_key
              }
            }
          })
          let walletInfoTemp = {
            mnemonic: registerData.data.Wallet.wallet_mnemonic,
            btcInfo,
            ethInfo
          }
          let userInfo = {
            email: txtEmail,
            phone: txtPhone,
            password: txtPassword,
            passwordConfirm: txtPasswordConfirm,
            customerAvatar: registerData.data.CustomerDetail.customerAvatar
          }
          dispatch(ActionsRedux.setWallet(walletInfoTemp))
          dispatch(ActionsRedux.setLogin(userInfo))
          _this.setState({
            isProcess: false,
            isShowModal: true
          }, () => Actions.walletTopScreen({ type: ActionConst.RESET }))
        } else if (registerData.code === 400) {
          _this.setState({ isProcess: false }, () => {
            if (typeof (registerData.warning) === 'string') {
              Alert.alert(
                '',
                registerData.warning,
                [
                  {text: I18n.t('common_button_ok'), onPress: () => console.log('OK Pressed'), style: 'cancel'}
                ],
                { cancelable: false }
              )
            } else {
              Alert.alert(
                '',
                JSON.stringify(registerData.warning),
                [
                  {text: I18n.t('common_button_ok'), onPress: () => console.log('OK Pressed'), style: 'cancel'}
                ],
                { cancelable: false }
              )
            }
          })
          //
        } if (registerData.code === 500) {
          _this.setState({ isProcess: false }, () => {
            if (typeof (registerData.error) === 'string') {
              Alert.alert(
                '',
                registerData.error,
                [
                  {text: I18n.t('common_button_ok'), onPress: () => console.log('OK Pressed'), style: 'cancel'}
                ],
                { cancelable: false }
              )
            } else {
              Alert.alert(
                '',
                JSON.stringify(registerData.error),
                [
                  {text: I18n.t('common_button_ok'), onPress: () => console.log('OK Pressed'), style: 'cancel'}
                ],
                { cancelable: false }
              )
            }
          })
        }
      }, 500)
    }
  }
}

/** -------------------------------------
* @method : handleLogin
* @param:
* @description : go to screen login
* @author : Tuan Nguyen
* @Create_date: 2018/08/01
* @Update_date:
* @Update_by:
* @Update_description:
* ---------------------------------------
*/
export const handleLogin = () => {
  return () => {
    Actions.login()
  }
}

/** -------------------------------------
* @method : handlePrivacy
* @param:
* @description : go to Privacy Policy screen
* @author : Tuan Nguyen
* @Create_date: 2018/08/03
* @Update_date:
* @Update_by:
* @Update_description:
* ---------------------------------------
*/
export const handlePrivacy = () => {
  return () => {
    Actions.walletPrivacyPolicy()
  }
}
/** -------------------------------------
* @method : handleTerm
* @param:
* @description : go to Term of service screen
* @author : Tuan Nguyen
* @Create_date: 2018/08/03
* @Update_date:
* @Update_by:
* @Update_description:
* ---------------------------------------
*/
export const handleTerm = () => {
  return () => {
    Actions.walletTermOfService()
  }
}

/** -------------------------------------
* @method : GetTokenAuth
* @param: ip
* @description : get authentication for app
* @author : Tuan Nguyen
* @Create_date: 2018/07/03
* @Update_date:
* @Update_by:
* @Update_description:
* ---------------------------------------
*/
export const handleCheck = () => {
  return () => {
    _this.setState({ isAgree: !_this.state.isAgree }, () => checkActiveButton())
  }
}

export const handleCloseModal = () => {
  return () => {
    _this.setState({ isErrorServer: false })
  }
}
