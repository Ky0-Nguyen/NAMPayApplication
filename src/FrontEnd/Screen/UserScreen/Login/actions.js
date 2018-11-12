import {Actions, ActionConst} from 'react-native-router-flux'
import {validateEmail} from 'common/GlobalFuntions'
import I18n from 'react-native-i18n'
import API from 'controller/API'
import * as ActionsRedux from 'controller/Redux/Actions'

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
let _this
export const funcDefaultThis = (THIS) => {
  return () => {
    _this = THIS
  }
}

/** -------------------------------------
* @method : handleRestoreWallet
* @param:
* @description :
* @author : Tuan Nguyen
* @Create_date: 2018/07/03
* @Update_date:
* @Update_by:
* @Update_description:
* ---------------------------------------
*/
export const handleRestoreWallet = () => {
  return () => {
    Actions.walletRestoreWallet()
  }
}

/** -------------------------------------
* @method : onChangeTextEmail
* @param:  text
* @description :
* @author : Tuan Nguyen
* @Create_date: 2018/07/03
* @Update_date:
* @Update_by:
* @Update_description:
* ---------------------------------------
*/
export const onChangeTextEmail = (text) => {
  return () => {
    let emailError = text.length === 0
      ? I18n.t('common_param_required').toString().replace('$0', I18n.t('common_text_email'))
      : I18n.t('common_param_format').toString().replace('$0', I18n.t('common_text_email'))
    _this.setState({
      txtEmail: text,
      isEmailError: !validateEmail(text),
      txtErrorEmail: emailError
    }, () => handleCheckActive())
  }
}

/** -------------------------------------
* @method : onChangeTextPassword
* @param: text
* @description :
* @author : Tuan Nguyen
* @Create_date: 2018/07/03
* @Update_date:
* @Update_by:
* @Update_description:
* ---------------------------------------
*/
export const onChangeTextPassword = (text) => {
  return () => {
    let txtErrorPassword
    if (text.length === 0) {
      txtErrorPassword = I18n.t('common_param_required').replace('$0', I18n.t('common_text_password'))
    } else {
      if (text.length < 6) {
        txtErrorPassword = (I18n.t('common_param_min').replace('$0', I18n.t('common_text_password'))).replace('$1', '6')
      } else {
        if (text.length > 25) {
          txtErrorPassword = I18n.t('common_param_min').replace('$0', I18n.t('common_text_password')).replace('$1', '25')
        }
      }
    }
    _this.setState({
      txtPassword: text,
      txtErrorPassword,
      isPasswordError: text.length === 0 || text.length < 6 || text.length > 25
    }, () => handleCheckActive())
  }
}

/** -------------------------------------
* @method : handleCheckActive
* @param:
* @description : check active button
* @author : Tuan Nguyen
* @Create_date: 2018/07/03
* @Update_date:
* @Update_by:
* @Update_description:
* ---------------------------------------
*/
const handleCheckActive = () => {
  const {
    isEmailError, isPasswordError,
    txtEmail, txtPassword
  } = _this.state
  _this.setState({ activeButton: !isEmailError && !isPasswordError && txtEmail.length !== 0 && txtPassword.length !== 0 })
}

/** -------------------------------------
* @method : handleLogin
* @param:
* @description :
* @author : Tuan Nguyen
* @Create_date: 2018/07/03
* @Update_date:
* @Update_by:
* @Update_description:
* ---------------------------------------
*/
export const handleLogin = () => {
  return (dispatch, getState) => {
    _this.setState({ isProcess: true })
    const {txtEmail, txtPassword} = _this.state
    const {internetData, localeData, userInfoData} = getState()
    if (internetData) {
      setTimeout(async () => {
        let dataLogin = await API.PostLogin(localeData, txtEmail, txtPassword)
        console.log('dataLogin ++', dataLogin)
        if (dataLogin.code === 200) {
          let userLogin = {
            email: txtEmail,
            phone: userInfoData.phone,
            password: txtPassword,
            passwordConfirm: txtPassword,
            customerAvatar: dataLogin.data.customerAvatar
          }
          dispatch(ActionsRedux.setLogin(userLogin))
          _this.setState({ isProcess: false }, () => Actions.walletTopScreen({ type: ActionConst.RESET }))
        } else if (dataLogin.code === 400) {
          _this.setState({
            txtErrorServer: dataLogin.warning.message,
            isErrorServer: true,
            isProcess: false
          })
        } if (dataLogin.code === 500) {
          _this.setState({
            txtErrorServer: dataLogin.error,
            isErrorServer: true,
            isProcess: false
          })
        }
      }, 500)
    } else {
      _this.setState({ isProcess: false })
    }
  }
}
/** -------------------------------------
* @method : handleRegister
* @param:
* @description : go to screen register
* @author : Tuan Nguyen
* @Create_date: 2018/08/01
* @Update_date:
* @Update_by:
* @Update_description:
* ---------------------------------------
*/
export const handleRegister = () => {
  return () => {
    Actions.register()
  }
}

/** -------------------------------------
* @method : handleCloseModal
* @param:
* @description : close modal error
* @author : Tuan Nguyen
* @Create_date: 2018/08/06
* @Update_date:
* @Update_by:
* @Update_description:
* ---------------------------------------
*/
export const handleCloseModal = () => {
  return () => {
    _this.setState({ isErrorServer: false })
  }
}
