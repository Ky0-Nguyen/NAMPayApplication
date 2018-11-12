/**
* @name : Wallet Info
* @description : Wallet info bitcoin , ethereum
* @author : Tuan Nguyen
* @Create_date: 2018/07/11
*
* @function
* - funcDefaultThis
* - loadingInitData
* - handleBackRoute
* - handleLeft
* - handleRight
* @Update_by:
* @Update_function:
* -
* -
* -
* -
*/

import {Actions} from 'react-native-router-flux'
import {Keyboard, Clipboard} from 'react-native'
import { normalize, validateAddressBTC, validateAddressETH, formatNumber } from 'common/GlobalFuntions'
import API from 'controller/API'
import * as ActionsRedux from 'controller/Redux/Actions'
import BackgroundTimer from 'react-native-background-timer'
import I18n from 'react-native-i18n'

/**
* @method : funcDefaultThis
* @param: THIS
* @description : set default _this for main tabbar
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
export const LoadDataTxs = () => {
  return async () => {
    const {walletData, localeData} = _this.props
    let dataTxs = []
    let address = _this.state.item.coin_symbol === 'BTC' ? walletData.btcInfo.address : walletData.ethInfo.address
    let numberType = _this.state.item.coin_symbol === 'BTC' ? 1 : 2

    console.log('address', address)

    dataTxs = await API.GetAddressTxs(localeData, address, numberType)
    console.log('dataTxs +++', dataTxs.data.TxsList)
    if (dataTxs.code === 200) {
      _this.setState({
        dataTxs: dataTxs.data.TxsList,
        isLoadingHistory: false
      })
    }
  }
}

/**
* @method : loadingInitData
* @param:
* @description : loading initial data from server
* @author : Tuan Nguyen
* @Create_date: 2018/07/17
* @Update_date:
* @Update_by:
* @Update_description:
*/
export const loadingInitData = () => {
  return async () => {
    console.log('_this.state.firstIndex ++', _this.state.firstIndex)
    _this.setState({
      isLoadingHistory: true,
      dataTxs: []
    })
    _this.props.LoadDataTxs()
    BackgroundTimer.setInterval(async () => {
      _this.props.LoadDataTxs()
    }, 300000)
  }
}
/** -------------------------------------
* @method : handleReceived
* @param:
* @description : click receive
* @author : Tuan Nguyen
* @Create_date: 2018/08/08
* @Update_date:
* @Update_by:
* @Update_description:
* ---------------------------------------
*/
export const handleReceived = () => {
  return () => {
    let dataTxs = []
    _this.state.dataTxs.map(item => {
      if (item.type === 2) {
        dataTxs.push(item)
      }
    })
    _this.setState({
      dataTxsReceive: dataTxs,
      dataTxsSent: null
    })
  }
}

/** -------------------------------------
* @method : handleSent
* @param: ip
* @description : get authentication for app
* @author : Tuan Nguyen
* @Create_date: 2018/08/08
* @Update_date:
* @Update_by:
* @Update_description:
* ---------------------------------------
*/
export const handleSent = () => {
  return () => {
    let dataTxs = []
    _this.state.dataTxs.map(item => {
      if (item.type === 1) {
        dataTxs.push(item)
      }
    })
    _this.setState({
      dataTxsSent: dataTxs,
      dataTxsReceive: null
    })
  }
}

/** -------------------------------------
* @method : handleTxsAll
* @param: ip
* @description : get authentication for app
* @author : Tuan Nguyen
* @Create_date: 2018/08/08
* @Update_date:
* @Update_by:
* @Update_description:
* ---------------------------------------
*/

export const handleTxsAll = () => {
  return () => {
    _this.setState({ dataTxsSent: null, dataTxsReceive: null })
  }
}

/** -------------------------------------
* @method : onReceived
* @param:
* @description : onClick button received in history screen
* @author : Tuan Nguyen
* @Create_date: 2018/08/13
* @Update_date:
* @Update_by:
* @Update_description:
* ---------------------------------------
*/
export const onReceived = () => {
  return () => {
    _this.setState({ isSend: _this.state.isSend === 2 ? 0 : 2 }, () => {
      if (_this.state.isSend === 2) {
        _this.props.handleReceived()
      } else if (_this.state.isSend === 0) {
        _this.props.handleTxsAll()
      }
    })
  }
}

/** -------------------------------------
* @method : onSent
* @param:
* @description : onClick button sent in history screen
* @author : Tuan Nguyen
* @Create_date: 2018/08/13
* @Update_date:
* @Update_by:
* @Update_description:
* ---------------------------------------
*/
export const onSent = () => {
  return () => {
    _this.setState({ isSend: _this.state.isSend === 1 ? 0 : 1 }, () => {
      if (_this.state.isSend === 1) {
        _this.props.handleSent()
      } else if (_this.state.isSend === 0) {
        _this.props.handleTxsAll()
      }
    })
  }
}

/**
* @method : handleBackRoute
* @param:
* @description : back to previous screen
* @author : Tuan Nguyen
* @Create_date: 2018/07/17
* @Update_date:
* @Update_by:
* @Update_description:
*/
export const handleBackRoute = () => {
  return () => {
    Actions.pop()
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
export const handleSnapToItem = (id) => {
  return () => {
    _this.setState({
      item: _this.props.data[id],
      dataTxsSent: null,
      dataTxsReceive: null,
      firstIndex: id,
      isSend: 0
    }, () => _this.props.loadingInitData())
  }
}

/**
* @method : onChangeAmount
* @param: text
* @description : set amount for receive screen
* @author : Tuan Nguyen
* @Create_date: 2018/07/11
* @Update_date:
* @Update_by:
* @Update_description:
*/
export const onChangeAmount = (text) => {
  return () => {
    _this.setState({
      strAmount: text,
      strMoney: formatNumber(Number(text) * _this.state.item.coin_price, true).toString()
    })
  }
}

/**
* @method : onChangeMoney
* @param: text of Money
* @description : set money for receive screen
* @author : Tuan Nguyen
* @Create_date: 2018/07/11
* @Update_date:
* @Update_by:
* @Update_description:
*/
export const onChangeMoney = (text) => {
  return () => {
    _this.setState({
      strMoney: text,
      strAmount: formatNumber(Number(text) / _this.state.item.coin_price, false).toString()
    })
  }
}
/** -------------------------------------
* @method : onEndEditAmountSend
* @param: text
* @description :
* @author : Tuan Nguyen
* @Create_date: 2018/08/14
* @Update_date:
* @Update_by:
* @Update_description:
* ---------------------------------------
*/
export const onEndEditAmountReceive = () => {
  return () => {
    _this.setState({
      strAmount: formatNumber(Number(_this.state.strAmount))
    })
  }
}
/** -------------------------------------
* @method : onEndEditMoneyReceive
* @param: text
* @description :
* @author : Tuan Nguyen
* @Create_date: 2018/08/14
* @Update_date:
* @Update_by:
* @Update_description:
* ---------------------------------------
*/
export const onEndEditMoneyReceive = () => {
  return () => {
    _this.setState({
      strMoney: formatNumber(Number(_this.state.strMoney), true)
    })
  }
}
/**
* @method : onCopyClipboard
* @param: ip
* @description : get authentication for app
* @author : Tuan Nguyen
* @Create_date: 2018/08/13
* @Update_date:
* @Update_by:
* @Update_description:
*/
export const onCopyClipboard = (text) => () => {
  return () => {
    Clipboard.setString(text)
    _this.setState({ modalMessage: I18n.t('receive_screen_copy_success') }, () => _this.modalCopy._showModal())
  }
}

/** -------------------------------------
* @method : onChangeAddressSend
* @param: text
* @description : excute function for text input form address send
* @author : Tuan Nguyen
* @Create_date: 2018/08/14
* @Update_date:
* @Update_by:
* @Update_description:
* ---------------------------------------
*/
export const onChangeAddressSend = (text) => {
  return (dispatch) => {
    _this.setState({
      strAddress: normalize(text),
      isErrorAddress: _this.state.item.coin_symbol === 'BTC'
        ? !validateAddressBTC(normalize(text))
        : !validateAddressETH(text)
    })
    if (_this.props.qrCodeData.length !== 0) {
      _this.setState({
        strAddress: normalize(_this.props.qrCodeData),
        isErrorAddress: _this.state.item.coin_symbol === 'BTC'
          ? !validateAddressBTC(normalize(_this.props.qrCodeData))
          : !validateAddressETH(_this.props.qrCodeData)
      })
      dispatch(ActionsRedux.setQrCode(''))
    }
  }
}

/** -------------------------------------
* @method : onChangeAmountSend
* @param: text
* @description : excute change amount in send screen
* @author : Tuan Nguyen
* @Create_date: 2018/08/14
* @Update_date:
* @Update_by:
* @Update_description:
* ---------------------------------------
*/
export const onChangeAmountSend = (text) => {
  return () => {
    _this.setState({
      strAmountSend: text,
      strMoneySend: formatNumber(Number(text) * _this.state.item.coin_price, true),
      isErrorAmount: !((Number(text) * _this.state.item.coin_price) > 0.03 && Number(text) < (_this.state.item.address_amount || _this.state.item.total_amount)),
      txtErrorAmount: ((Number(text) * _this.state.item.coin_price) < 0.03) ? I18n.t('coin_detail_screen_label_confirm_fee') : I18n.t('coin_detail_screen_label_warning_amount')
    })
  }
}

/** -------------------------------------
* @method : onEndEditAmountSend
* @param: text
* @description :
* @author : Tuan Nguyen
* @Create_date: 2018/08/14
* @Update_date:
* @Update_by:
* @Update_description:
* ---------------------------------------
*/
export const onEndEditAmountSend = () => {
  return () => {
    _this.setState({
      strAmountSend: formatNumber(Number(_this.state.strAmountSend))
    })
  }
}
/** -------------------------------------
* @method : onEndEditAmountSend
* @param: text
* @description :
* @author : Tuan Nguyen
* @Create_date: 2018/08/14
* @Update_date:
* @Update_by:
* @Update_description:
* ---------------------------------------
*/
export const onEndEditMoneySend = () => {
  return () => {
    _this.setState({
      strMoneySend: formatNumber(Number(_this.state.strMoneySend), true)
    })
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
export const onChangeMoneySend = (text) => {
  return () => {
    _this.setState({
      strAmountSend: formatNumber(Number(text) / _this.state.item.coin_price),
      strMoneySend: text,
      isErrorAmount: !(Number(text) > 0.03 && (Number(text) / _this.state.item.coin_price) < _this.state.item.address_amount),
      txtErrorAmount: (Number(text) > 0.03) ? 'User total available minus fee: $0.03' : 'Value is larger available user amount'
    })
  }
}
export const handleQrCodeScreen = () => {
  return () => {
    Keyboard.dismiss()
    Actions.qrCodeScanner()
  }
}
export const _openModal = () => {
  return () => {
    if (_this.props.pinCodeData.length !== 0) {
      Actions.pincode({ types: 'send' })
    } else {
      _this.modalSend._showModal()
    }
  }
}
export const _closeModal = () => {
  return () => {
    _this.modalSend._hideModal()
  }
}

export const _openModalHistoryInfo = () => {
  return () => {
    _this.modalHistoryInfo._showModal()
  }
}
export const _closeModalHistoryInfo = () => {
  return () => {
    _this.modalHistoryInfo._hideModal()
  }
}

export const handleSelectTxs = (item) => () => {
  return () => {
    _this.setState({
      itemHistoryInfo: item
    })
    _this.modalHistoryInfo._showModal()
  }
}

export const handleSend = () => {
  return () => {
    if (_this.props.pinCodeData.length !== 0) {
      Actions.pincode({ types: 'send', closeModal: () => _this.modalSend._hideModal() })
      _this.modalSend._showModal()
    } else {
      _this.modalSend._showModal()
    }
  }
}

export const handleSendToken = () => {
  return () => {
    if (_this.props.pinCodeData.length !== 0) {
      Actions.pincode({ types: 'send', closeModal: () => _this.modalSend._hideModal() })
      _this.modalSend._showModal()
    } else {
      _this.modalSend._showModal()
    }
  }
}
/** -------------------------------------
* @method : onExcuteSendCoin
* @param: ip
* @description :
* @author : Tuan Nguyen
* @Create_date: 2018/07/03
* @Update_date:
* @Update_by:
* @Update_description:
* ---------------------------------------
*/
export const onExcuteSendCoin = () => {
  return async () => {
    const {localeData, userInfoData, walletData} = _this.props
    const { item, strAddress, strAmountSend } = _this.state
    _this.setState({ isLoadingHistory: true })
    let symbol = item && (item.coin_symbol || item.token_symbol)
    let priKey = item && item.coin_symbol === 'BTC' ? walletData.btcInfo.priKey : walletData.ethInfo.priKey
    let address = item && item.coin_symbol === 'BTC' ? walletData.btcInfo.address : walletData.ethInfo.address
    // (locale, symbol, email, fromAddress, priKey, toAddress, amount)
    let data = await API.PostTransfer(localeData, symbol, userInfoData.email, address, priKey, strAddress, strAmountSend)

    if (data.code === 200) {
      _this.setState({
        isLoadingHistory: false,
        strAmountSend: '',
        strMoneySend: '',
        strAddress: '',
        modalMessage: 'Send successfully!'
      }, () => {
        _this.modalCopy._showModal()
        _this.props.loadingInitData()
      })
    } else if (data.code === 400) {
      _this.setState({
        isLoadingHistory: false,
        strAmountSend: '',
        strMoneySend: '',
        strAddress: '',
        modalMessage: JSON.stringify(data.warning)
      }, () => {
        _this.modalCopy._showModal()
      })
    } else if (data.code === 500) {
      _this.setState({ isLoadingHistory: false,
        strAmountSend: '',
        strMoneySend: '',
        strAddress: '',
        modalMessage: data.error
      }, () => {
        _this.modalCopy._showModal()
      })
    }
  }
}

// /** -------------------------------------
// * @method : GetTokenAuth
// * @param: ip
// * @description :
// * @author : Tuan Nguyen
// * @Create_date: 2018/07/03
// * @Update_date:
// * @Update_by:
// * @Update_description:
// * ---------------------------------------
// */
// export const onExcuteSendToken = () => {
//   return async () => {
//     const {localeData, userInfoData, walletData} = _this.props
//     const { item, strAddress, strAmountSend } = _this.state
//     _this.setState({ isLoadingHistory: true })
//     let symbol = 'NAM'
//     let priKey = walletData.ethInfo.priKey
//
//     let data = await API.PostTransfer(localeData, symbol, userInfoData.email, walletData.ethInfo.address, priKey, strAddress, strAmountSend)
//   }
// }

export const onFocusSend = () => {
  return (dispatch, getState) => {
    const {qrCodeData} = getState()
    if (qrCodeData.length !== 0) {
      var re = /\s*,\s*/
      var strQrCodeData = qrCodeData.split(re)
      _this.setState({
        strAmountSend: strQrCodeData[1] || '',
        strAddress: strQrCodeData[0],
        strMoneySend: strQrCodeData[1] ? formatNumber(Number(strQrCodeData[1]) * _this.state.item.coin_price, true) : 0
      }, () => dispatch(ActionsRedux.setQrCode('')))
    }
  }
}

/** -------------------------------------
* @method : onFocusReceive
* @param:
* @description :
* @author : Tuan Nguyen
* @Create_date: 2018/08/16
* @Update_date:
* @Update_by:
* @Update_description:
* ---------------------------------------
*/
export const onFocusReceive = () => {
  return () => {
    _this.setState({
      strAmount: _this.state.strAmount.replace(/,/g, ''),
      strMoney: _this.state.strMoney.replace(/,/g, '')
    })
  }
}

export const onFocusAmountSend = () => {
  return () => {
    _this.setState({
      strAmountSend: _this.state.strAmountSend.replace(/,/g, ''),
      strMoneySend: _this.state.strMoneySend.replace(/,/g, '')
    })
  }
}
