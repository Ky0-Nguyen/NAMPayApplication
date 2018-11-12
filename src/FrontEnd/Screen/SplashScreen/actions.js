/**
* @name : ACTION SPLASH SCREEN
* @description : build api for app
* @author : Tuan Nguyen
* @Create_date: 2018/07/20
*
* @function
* - funcDefaultThis
* - handleConnectionChange
* - getInitData
* @Update_by:
* @Update_function:
* -
* -
* -
* -
*/

import { setAppConfigs, setInternet, setRoleBackup } from 'controller/Redux/Actions'

import API from 'controller/API'
import store from 'react-native-simple-store'
import {KEYSTORE, LOCALE, TXT_DEFAULT, TXT_JAPAN} from 'common/GlobalConstants'

import {Actions, ActionConst} from 'react-native-router-flux'
import I18n from 'react-native-i18n'
import { EventRegister } from 'react-native-event-listeners'
import { setCustomText } from 'react-native-global-props'

/**
* @method : funcDefaultThis
* @param: THIS
* @description : set default this
* @author : Tuan Nguyen
* @Create_date: 2018/07/20
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
* @method : handleConnectionChange
* @param: isConnected
* @description : handle connection of internet
* @author : Tuan Nguyen
* @Create_date: 2018/07/20
* @Update_date:
* @Update_by:
* @Update_description:
*/
export const handleConnectionChange = (isConnected) => {
  return async (dispatch) => {
    dispatch(setInternet(isConnected))
    EventRegister.emit('reloadSplash')
    console.log('isConntecd ++ ', isConnected)
    if (!isConnected) {
      EventRegister.emit('internetChange')
    }
  }
}

/**
* @method : getInitData
* @param:
* @description : load initial data
* @author : Tuan Nguyen
* @Create_date: 2018/07/20
* @Update_date:
* @Update_by:
* @Update_description:
*/
export const getInitData = () => {
  return async (dispatch, getState) => {
    console.log('START FUNCTION : SplashScreen - getInitData')
    const {internetData} = getState()
    let localeData = await store.get(KEYSTORE.LOCALE)
    let roleBackupData = await store.get(KEYSTORE.ROLE_BACKUP)
    if (localeData && localeData === LOCALE.JAPAN) {
      setCustomText({style: TXT_JAPAN})
    } else {
      setCustomText({style: TXT_DEFAULT})
    }
    if (internetData) {
      // let progress = 0

      let AppConfigsData = await API.GetAppConfigs()
      if (AppConfigsData.code === 200) {
        dispatch(setAppConfigs(AppConfigsData.data))
        dispatch(setRoleBackup(roleBackupData))
        // setting language multiple language for application that is application support
        let languageDetail = await API.GetAllLanguageDetail()
        console.log('Language Array: ', languageDetail.data.LanguageDetailList)
        I18n.fallbacks = true
        I18n.translations = languageDetail.data.LanguageDetailList
        // end --------------

        let AppConfigs = await store.get(KEYSTORE.APP_CONFIGS)
        if (_this.splash) {
          _this.setState({
            AppConfigs,
            isLoading: false })
        }
        let userInfo = await store.get(KEYSTORE.LOGIN)
        let walletData = await store.get(KEYSTORE.WALLET)

        if (userInfo && userInfo.email && walletData && walletData.btcInfo && walletData.ethInfo) {
          Actions.walletTopScreen({ type: ActionConst.RESET })
        } else {
          Actions.languageScreen({ type: ActionConst.RESET })
        }
      }
    }
    console.log('END FUNCTION : SplashScreen - getInitData')
  }
}
