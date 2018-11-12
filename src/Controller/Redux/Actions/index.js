import key from '../Lib/constants'
import {KEYSTORE, LOCALE, TXT_DEFAULT, TXT_JAPAN} from 'common/GlobalConstants'
import {checkStore} from 'controller/Redux/Lib/reducerConfig'
import I18n from 'react-native-i18n'
import { setCustomText } from 'react-native-global-props'

export function setInternet (internet) {
  return {
    type: key.SET_INTERNET,
    payload: internet
  }
}
export function setAppConfigs (appConfig) {
  checkStore(appConfig, KEYSTORE.APP_CONFIGS)
  return {
    type: key.SET_APP_CONFIGS,
    payload: appConfig
  }
}

export function setListLanguage (list) {
  checkStore(list, KEYSTORE.LIST_LANGUAGE)
  return {
    type: key.SET_LIST_LANGUAGE,
    payload: list
  }
}

export function setLocale (locale) {
  I18n.locale = locale
  if (locale && locale === LOCALE.JAPAN) {
    setCustomText({style: TXT_JAPAN})
  } else {
    setCustomText({style: TXT_DEFAULT})
  }
  checkStore(locale, KEYSTORE.LOCALE)
  return {
    type: key.SET_LOCALE,
    payload: locale
  }
}

export function setPagePrivacy (page) {
  checkStore(page, KEYSTORE.PAGE_PRIVACY)
  return {
    type: key.SET_PAGE_PRIVACY,
    payload: page
  }
}

export function setLogin (loginInfo) {
  checkStore(loginInfo, KEYSTORE.LOGIN)
  return {
    type: key.SET_LOGIN,
    payload: loginInfo
  }
}

export function setWallet (walletInfo) {
  checkStore(walletInfo, KEYSTORE.WALLET)
  return {
    type: key.SET_WALLET,
    payload: walletInfo
  }
}

// SET DATA for PINcode
export function setPINcode (pinCode) {
  checkStore(pinCode, KEYSTORE.PINCODE)
  return {
    type: key.SET_PINCODE,
    payload: pinCode
  }
}

export function setFingerprint (value) {
  checkStore(value, KEYSTORE.FINGERPRINT)
  return {
    type: key.SET_FINGERPRINT,
    payload: value
  }
}

export function setQrCode (value) {
  return {
    type: key.SET_QR_CODE,
    payload: value
  }
}

export function setRoleBackup (value) {
  checkStore(value, KEYSTORE.ROLE_BACKUP)
  return {
    type: key.SET_ROLE_BACKUP,
    payload: value
  }
}
