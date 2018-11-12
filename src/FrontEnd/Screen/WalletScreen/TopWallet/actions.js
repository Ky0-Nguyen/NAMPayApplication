import {Actions, ActionConst} from 'react-native-router-flux'
import { Alert } from 'react-native'
import API from 'controller/API'
import * as ActionsRedux from 'controller/Redux/Actions'
import init from 'controller/Redux/Lib/initState'
import I18n from 'react-native-i18n'
// import {hashCode} from 'common/GlobalFuntions'

import BackgroundTimer from 'react-native-background-timer'

// var Identicon = require('identicon.js')

/**
* @method : funcDefaultThis
* @param: THIS
* @description : set default this for main tabbar
* @author : Tuan Nguyen
* @Create_date: 2018/07/05
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
* @method : loadTokenList
* @param: ip
* @description : get authentication for app
* @author : Tuan Nguyen
* @Create_date: 2018/07/03
* @Update_date:
* @Update_by:
* @Update_description:
*/
const loadTokenList = (TokenList) => {
  let tokenListTemp = []
  TokenList.map((item, index) => {
    let tokenItemTemp = {
      id: index.toString(),
      address_id: item.address_id,
      address_code: item.address_code,
      token_id: item.token_id,
      total_amount: item.total_amount,
      status: item.status,

      token_contract_address: item.token_contract_address,
      token_decimals: item.token_decimals,
      token_name: item.token_name,
      token_photo: item.token_photo,
      token_symbol: item.token_symbol,
      token_type: item.token_type,

      to_currency_symbol: item.to_currency_symbol,
      coin_price: item.coin_price,
      coin_volumne_24h: item.coin_volumne_24h,
      coin_change_24h: item.coin_change_24h,
      coin_change_percent_24h: item.coin_change_percent_24h,
      total_supply: item.total_supply,
      historical_data: item.historical_data
    }
    tokenListTemp.push(tokenItemTemp)
  })

  return tokenListTemp
}
const LoadData = async (dispatch) => {
  const {localeData} = _this.props

  let str = _this.props.userInfoData.email

  let getSummary = await API.GetWalletSummary(localeData, str, 'USD')
  console.log('loadingInittialData - getSummary : ', getSummary)
  let coinList = []

  if (getSummary) {
    if (getSummary.code === 400) {
      setTimeout(() => {
        _this.props.loadingInittialData()
      }, 15000)
    } else if (getSummary.code === 500) {
      setTimeout(() => {
        _this.props.loadingInittialData()
      }, 15000)
    } else if (getSummary.code === 200) {
      let getTokenList = await API.GetTokensList(localeData)
      console.log('loadingInittialData - getTokenList : ', getTokenList)
      if (getTokenList.code === 400) {
        Alert.alert(
          '',
          getTokenList.warning.message,
          [
            {text: I18n.t('common_button_ok'), onPress: () => console.log('OK Pressed'), style: 'cancel'}
          ],
          { cancelable: false })
      } else if (getTokenList.code === 500) {
        Alert.alert(
          '',
          getTokenList.error,
          [
            {text: I18n.t('common_button_ok'), onPress: () => console.log('OK Pressed'), style: 'cancel'}
          ],
          { cancelable: false })
      }

      getSummary.data.CoinsList.map((item, index) => {
        let itemTemp = {
          id: index.toString(),
          address: item.address,
          address_amount: item.address_amount,
          address_index: item.address_index,
          coin_change_24h: item.coin_change_24h,
          coin_change_percent_24h: item.coin_change_percent_24h,
          coin_image_url: item.coin_image_url,
          coin_name: item.coin_name,
          coin_price: item.coin_price,
          coin_symbol: item.coin_symbol,
          exchange_name: item.exchange_name,
          to_currency_symbol: item.to_currency_symbol,
          mnemonic: item.mnemonic
        }
        coinList.push(itemTemp)
      })

      let tokenListTemp = loadTokenList(getSummary.data.TokenList, getTokenList.data.TokensList)

      tokenListTemp.map((item, index) => {
        let itemTemp = {
          id: coinList.length.toString(),
          status: 1,
          token_contract_address: item.token_contract_address,
          token_decimals: item.token_decimals,
          token_id: item.token_id,
          token_name: item.token_name,
          token_photo: item.token_photo,
          token_symbol: item.token_symbol,
          token_type: item.token_type,
          total_amount: item.total_amount,
          address_id: item.address_id,
          address_code: item.address_code,

          to_currency_symbol: item.to_currency_symbol,
          coin_price: item.coin_price,
          coin_volumne_24h: item.coin_volumne_24h,
          coin_change_24h: item.coin_change_24h,
          coin_change_percent_24h: item.coin_change_percent_24h,
          total_supply: item.total_supply,
          historical_data: item.historical_data
        }
        coinList.push(itemTemp)
      })
      console.log('coinList +++', coinList)
      let totalMoney = 0
      coinList.map((item, index) => {
        totalMoney = (totalMoney.toString() === 'NaN' ? 0 : totalMoney) + (Number(item.address_amount || item.total_amount) * Number(item.coin_price))
      })
      console.log('totalMoney', totalMoney)
      //  set info wallet
      let restoreData = await API.PostRestoreWallet(localeData, str, coinList[0].mnemonic)
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
      // ------------------

      _this.setState({
        coinList,
        tokenList: getTokenList.data.TokensList,
        isLoadingHome: false,
        totalMoney
      })
    }
  }
}

/**
* @method : loadingInittialData
* @param:
* @description : get initial data for home page
* @author : Tuan Nguyen
* @Create_date: 2018/07/18
* @Update_date:
* @Update_by:
* @Update_description:
*/
export const loadingInittialData = () => {
  return async (dispatch, getState) => {
    if (_this.props.internetData) {
      _this.setState({ isLoadingHome: true })
      LoadData(dispatch)
      BackgroundTimer.setInterval(async () => {
        LoadData(dispatch)
      }, 3000000)
    }
  }
}

/**
* @method : handlePrivacyPolicy
* @param:
* @description : go to privacy policy screen
* @author : Tuan Nguyen
* @Create_date: 2018/07/09
* @Update_date:
* @Update_by:
* @Update_description:
*/
export const handlePrivacyPolicy = () => {
  return () => {
    Actions.walletPrivacyPolicy()
  }
}

/**
* @method : handleSettingLanguage
* @param :
* @description : go to setting language screen
* @author : Tuan Nguyen
* @Create_date: 2018/07/03
* @Update_date:
* @Update_by:
* @Update_description:
*/
export const handleSettingLanguage = () => {
  return () => {
    Actions.settingLanguage()
  }
}

export const handleRestoreWallet = () => {
  return () => {
    Actions.walletRestoreWallet()
  }
}

export const handleRefreshData = () => {
  return () => {
    _this.props.loadingInittialData()
  }
}

export const funcOnChangeTextPhone = (text) => {
  return () => {
    _this.setState({
      txtPhone: text
    })
  }
}

// export const funcDone = () => {
//   return () => {
//     _this.setState({
//       isEditPhone: false,
//       txtPhone: _this.state.selectedCountry.first_number + _this.state.txtPhone
//     })
//   }
// }

export const funcChangeStatusButton = () => {
  return () => {
    const {isEditPhone, txtPhone} = _this.state
    _this.setState({
      isEditPhone: !isEditPhone,
      txtPhone: txtPhone.slice(6)
    })
  }
}

export const handleWalletInfo = (item, data, isToken) => () => {
  return () => {
    Actions.walletInfo({ item, data, isToken })
  }
}

export const handleAddToken = (item) => {
  return async () => {
    const {localeData} = _this.props

    let email = _this.props.userInfoData.email
    // locale, email, symbol, tokenId, tokenName
    let addToken = await API.PostAddToken(localeData, email, item.token_symbol, item.token_id, item.token_name)
    if (addToken.code === 200) {
      // alert('success')
    } else if (addToken.code === 400) {
      Alert.alert(
        '',
        addToken.warning.message,
        [
          {text: I18n.t('common_button_ok'), onPress: () => console.log('OK Pressed'), style: 'cancel'}
        ],
        { cancelable: false })
    } else if (addToken.code === 500) {
      Alert.alert(
        '',
        addToken.error,
        [
          {text: I18n.t('common_button_ok'), onPress: () => console.log('OK Pressed'), style: 'cancel'}
        ],
        { cancelable: false })
    }
    _this.props.loadingInittialData()
  }
}

/**
* @method : handleLogout
* @param:
* @description : logout application
* @author : Tuan Nguyen
* @Create_date: 2018/07/18
* @Update_date:
* @Update_by:
* @Update_description:
*/
export const handleLogout = () => {
  return (dispatch) => {
    dispatch(ActionsRedux.setLogin(init.userInit))
    dispatch(ActionsRedux.setWallet(init.walletInit))
    dispatch(ActionsRedux.setPINcode(init.pinInit))
    dispatch(ActionsRedux.setRoleBackup(init.roleBackupInit))
    Actions.login({ type: ActionConst.RESET })
  }
}

/**
* @method : _closeModalConfirm
* @param:
* @description : open modal confirm
* @author : Tuan Nguyen
* @Create_date: 2018/07/18
* @Update_date:
* @Update_by:
* @Update_description:
*/
export const _closeModalConfirm = () => {
  return () => {
    // _this.setState({ isOpenLogOut: false })
    _this.modalLogout._hideModal()
  }
}

/**
* @method : _openModalConfirm
* @param:
* @description : open modal confirm
* @author : Tuan Nguyen
* @Create_date: 2018/07/18
* @Update_date:
* @Update_by:
* @Update_description:
*/
export const _openModalConfirm = () => {
  return () => {
    // _this.setState({ isOpenLogOut: true })
    _this.modalLogout._showModal()
  }
}

/**
* @method : handleSecurity
* @param:
* @description : go to security screen
* @author : Tuan Nguyen
* @Create_date: 2018/07/18
* @Update_date:
* @Update_by:
* @Update_description:
*/
export const handleSecurity = () => {
  return () => {
    Actions.security()
  }
}

export const handleShowPassphrase = () => {
  return () => {
    if (_this.props.pinCodeData.length !== 0) {
      Actions.pincode({ types: 'passphrase' })
    } else {
      if (_this.props.roleBackupData) {
        Actions.createWallet()
      } else {
        Actions.showPassphrase()
      }
    }
  }
}
