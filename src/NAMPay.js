import React from 'react'
import scenes from 'common/GlobalRoutes'
import { Router } from 'react-native-router-flux'
import { Provider, connect } from 'react-redux'
import storeRedux from 'controller/Redux/Store/configureStore'
import { checkLocalStoreToRedux } from 'controller/Redux/Lib/reducerConfig'
import {KEYSTORE, TXT_DEFAULT} from 'common/GlobalConstants'
import * as actions from 'controller/Redux/Actions'
import init from 'controller/Redux/Lib/initState'
import { setCustomText } from 'react-native-global-props'

const RouterWithRedux = connect()(Router)
setCustomText({ style: TXT_DEFAULT })

const indexApp = () => {
  checkLocalStoreToRedux(storeRedux, KEYSTORE.ROLE_BACKUP, actions.setRoleBackup, init.roleBackupInit)

  // system
  checkLocalStoreToRedux(storeRedux, KEYSTORE.APP_CONFIGS, actions.setAppConfigs, init.appConfigsInit)
  // language
  checkLocalStoreToRedux(storeRedux, KEYSTORE.LOCALE, actions.setLocale, init.localeInit)
  checkLocalStoreToRedux(storeRedux, KEYSTORE.LIST_LANGUAGE, actions.setListLanguage, init.listLanguageInit)
  // wallet
  checkLocalStoreToRedux(storeRedux, KEYSTORE.WALLET, actions.setWallet, init.walletInit)
  // user
  checkLocalStoreToRedux(storeRedux, KEYSTORE.LOGIN, actions.setLogin, init.userInit)
  // security
  checkLocalStoreToRedux(storeRedux, KEYSTORE.PINCODE, actions.setPINcode, init.pinInit)
  checkLocalStoreToRedux(storeRedux, KEYSTORE.FINGERPRINT, actions.setFingerprint, init.isFingerprint)

  return (
    <Provider store={storeRedux}>
      <RouterWithRedux scenes={scenes} />
    </Provider>
  )
}
export default indexApp
