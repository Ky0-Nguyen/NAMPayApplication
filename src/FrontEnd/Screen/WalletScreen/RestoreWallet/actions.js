import {Actions, ActionConst} from 'react-native-router-flux'
import { Alert } from 'react-native'
import API from 'controller/API'
import * as ActionsRedux from 'controller/Redux/Actions'
import bip39 from 'react-native-bip39'

let _this
export const funcDefaultThis = (THIS) => {
  return () => {
    _this = THIS
  }
}

export const handleBackRoute = () => {
  return () => {
    Actions.pop()
    Actions.refresh()
  }
}
export const handleTermOfService = () => {
  return () => {
    Actions.walletTermOfService()
  }
}

export const onChangeTextMnemonic = (mnemonic) => {
  return () => {
    if (_this.props.Mnemonic) {
      let newMnemonic = mnemonic.toLowerCase()
      if (validateSpace(newMnemonic)) {
        let strValidateSpace = newMnemonic.replace(/ +/g, ' ')
        _this.setState({
          strMnemonic: strValidateSpace.replace(/(\r\n|\n|\r)/gm, '')
        })
        if (!bip39.validateMnemonic(newMnemonic)) {
          _this.setState({
            isMnemonicError: true,
            txtErrorPassword: 'This is not Mnemonic. Please input 12 your words'
          })
        } else {
          if (newMnemonic.split(' ').length === 12) {
            if (newMnemonic === _this.props.Mnemonic) {
              _this.setState({
                isMnemonicError: false,
                txtErrorPassword: ''
              })
            } else {
              _this.setState({
                isMnemonicError: true,
                txtErrorPassword: 'Mnemonic not match'
              })
            }
          }
        }
      } else {
        _this.setState({
          strMnemonic: '',
          isMnemonicError: true
        })
      }
    } else {
      let newMnemonic = mnemonic.toLowerCase()

      if (validateSpace(newMnemonic)) {
        let strValidateSpace = newMnemonic.replace(/ +/g, ' ')
        _this.setState({
          txtErrorPassword: 'This is not Mnemonic. Please input 12 your words',
          isMnemonicError: !bip39.validateMnemonic(newMnemonic),
          strMnemonic: strValidateSpace.replace(/(\r\n|\n|\r)/gm, '')
        })
      } else {
        _this.setState({strMnemonic: ''})
      }
    }
  }
}

/** -------------------------------------
* @method : handleSubmit
* @param:
* @description :
* @author : Tuan Nguyen
* @Create_date: 2018/08/21
* @Update_date:
* @Update_by:
* @Update_description:
* ---------------------------------------
*/
export const handleSubmit = () => {
  return (dispatch) => {
    _this.setState({ isProcess: true })
    const { localeData, userInfoData, parentView } = _this.props
    const { strMnemonic } = _this.state
    if (parentView === 'login') {
      setTimeout(async () => {
        let restoreData = await API.PostRestoreWallet(localeData, userInfoData.email, strMnemonic)
        console.log('restoreData', restoreData)

        if (restoreData.code === 200) {
          let btcInfo = {}
          let ethInfo = {}
          restoreData.data.AddressList.map(item => {
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
            mnemonic: restoreData.data.Wallet.wallet_mnemonic,
            btcInfo,
            ethInfo
          }
          dispatch(ActionsRedux.setWallet(walletInfoTemp))
          Actions.walletTopScreen({ type: ActionConst.RESET })
        } else if (restoreData.code === 400) {
          _this.setState({ isProcess: false }, () =>
            Alert.alert(
              '',
              JSON.stringify(restoreData.warning),
              { cancelable: false }
            ))
        } if (restoreData.code === 500) {
          _this.setState({ isProcess: false }, () => Alert.alert(
            '',
            restoreData.error,
            [
              {text: I18n.t('common_button_ok'), onPress: () => console.log('OK Pressed'), style: 'cancel'}
            ],
            { cancelable: false }))
        }
      }, 500)
    } else {
      setTimeout(async () => {
        let registerData = await API.PostSignUp(localeData, userInfoData.email, userInfoData.phone, userInfoData.password, userInfoData.passwordConfirm, strMnemonic)

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
          dispatch(ActionsRedux.setLogin(userInfo))
          dispatch(ActionsRedux.setWallet(walletInfoTemp))
          Actions.walletTopScreen({ type: ActionConst.RESET })
          _this.setState({
            isShowModal: true
          })
        } else if (registerData.code === 400) {
          _this.setState({ isProcess: false }, () => Alert.alert(
            '', JSON.stringify(registerData.warning),
            [
              {text: I18n.t('common_button_ok'), onPress: () => console.log('OK Pressed'), style: 'cancel'}
            ],
            { cancelable: false })
          )
        } if (registerData.code === 500) {
          _this.setState({ isProcess: false }, () => Alert.alert(
            '', registerData.error,
            [
              {text: I18n.t('common_button_ok'), onPress: () => console.log('OK Pressed'), style: 'cancel'}
            ],
            { cancelable: false }))
        }
        _this.setState({ isProcess: false })
      }, 500)
    }
  }
}
/**
* NAME: validateSpace
* PARAMS: strString
* Remove all space if string contain all space
*/
const validateSpace = (strString) => {
  return /\S/.test(strString)
}

/** -------------------------------------
* @method : GetTokenAuth
* @param: ip
* @description :
* @author : Tuan Nguyen
* @Create_date: 2018/07/03
* @Update_date:
* @Update_by:
* @Update_description:
* ---------------------------------------
*/

export const funcSkipToStep = () => {
  return (dispatch) => {
    _this.setState({ isProcess: true })
    const { localeData, userInfoData, Mnemonic } = _this.props
    setTimeout(async () => {
      let registerData = await API.PostSignUp(localeData, userInfoData.email, userInfoData.phone, userInfoData.password, userInfoData.passwordConfirm, Mnemonic)
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
        dispatch(ActionsRedux.setLogin(userInfo))
        dispatch(ActionsRedux.setWallet(walletInfoTemp))
        Actions.walletTopScreen({ type: ActionConst.RESET })
        _this.setState({
          isShowModal: true
        })
      } else if (registerData.code === 400) {
        _this.setState({ isProcess: false }, () => Alert.alert(
          '', JSON.stringify(registerData.warning),
          [
            {text: I18n.t('common_button_ok'), onPress: () => console.log('OK Pressed'), style: 'cancel'}
          ],
          { cancelable: false }))
      } if (registerData.code === 500) {
        _this.setState({ isProcess: false }, () => Alert.alert(
          '', registerData.error,
          [
            {text: I18n.t('common_button_ok'), onPress: () => console.log('OK Pressed'), style: 'cancel'}
          ],
          { cancelable: false }))
      }
      _this.setState({ isProcess: false })
    }, 500)
  }
}
