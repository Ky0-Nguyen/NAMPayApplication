// -------------------------------------
// @name : API
// @description : build api for app
// @author : Tuan Nguyen
// @Create_date: 2018/07/03
//
// @function
// - handleLogin
// - handleRegister
// @Update_by:
// @Update_function:
// -------------------------------------
import { Alert } from 'react-native'
import API from 'controller/API'
import {Actions, ActionConst} from 'react-native-router-flux'
import * as ActionsRedux from 'controller/Redux/Actions'

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
export const handleCreate = () => {
  return () => {
    _this.setState({ isProcess: true })
    const {localeData} = _this.props
    setTimeout(async () => {
      let mnemonic = await API.PostGenerateMnemonic(localeData)
      if (mnemonic.code === 200) {
        _this.setState({ isProcess: false }, () => Actions.createWallet({Mnemonic: mnemonic.data.NewMnemonic}))
      } else if (mnemonic.code === 400) {
        _this.setState({ isProcess: false }, () => Alert.alert(
          '',
          JSON.stringify(mnemonic.warning),
          [
            {text: I18n.t('common_button_ok'), onPress: () => console.log('OK Pressed'), style: 'cancel'}
          ],
          { cancelable: false }
        ))
      } if (mnemonic.code === 500) {
        _this.setState({ isProcess: false }, () => Alert.alert(
          '',
          mnemonic.error,
          [
            {text: I18n.t('common_button_ok'), onPress: () => console.log('OK Pressed'), style: 'cancel'}
          ],
          { cancelable: false }
        ))
      }
    }, 500)
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
export const handleRestore = () => {
  return () => {
    Actions.walletRestoreWallet({parentView: 'restore'})
  }
}

/** -------------------------------------
* @method : handleSkipStep
* @param:
* @description : get authentication for app
* @author : Tuan Nguyen
* @Create_date: 2018/08/06
* @Update_date:
* @Update_by:
* @Update_description:
* ---------------------------------------
*/
export const handleSkipStep = () => {
  return (dispatch, getState) => {
    _this.setState({ isProcess: true, isShowModal: false })
    const {localeData, userInfoData} = getState()
    console.log('localeData, userInfoData +++ ', localeData, userInfoData)
    setTimeout(async () => {
      let registerData = await API.PostSignUp(localeData, userInfoData.email, userInfoData.phone, userInfoData.password, userInfoData.passwordConfirm, '')
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
          email: userInfoData.email,
          phone: userInfoData.phone,
          password: userInfoData.password,
          passwordConfirm: userInfoData.passwordConfirm,
          customerAvatar: registerData.data.CustomerDetail.customerAvatar
        }
        dispatch(ActionsRedux.setWallet(walletInfoTemp))
        dispatch(ActionsRedux.setLogin(userInfo))
        _this.setState({
          isProcess: false,
          isShowModal: true
        })
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
        //
      }
    }, 500)
  }
}

/** -------------------------------------
* @method : funcClose
* @param:
* @description :close modal
* @author : Tuan Nguyen
* @Create_date: 2018/08/06
* @Update_date:
* @Update_by:
* @Update_description:
* ---------------------------------------
*/
export const funcClose = () => {
  return () => {
    _this.setState({ isShowModal: false }, () => Actions.walletTopScreen({ type: ActionConst.RESET }))
  }
}

/** -------------------------------------
* @method : handleLogout
* @param:
* @description : logout and back to main user screen
* @author : Tuan Nguyen
* @Create_date: 2018/08/06
* @Update_date:
* @Update_by:
* @Update_description:
* ---------------------------------------
*/
export const handleLogout = () => {
  return (dispatch) => {
    Actions.pop()
    dispatch(ActionsRedux.setLogin({}))
  }
}
