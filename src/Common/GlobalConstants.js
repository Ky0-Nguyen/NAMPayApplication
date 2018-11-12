// import {Platform} from 'react-native'
import {width, height} from 'react-native-dimension'
import I18n from 'react-native-i18n'

// Keystore for save Async store
export const KEYSTORE = {
  APP_CONFIGS: 'APP_CONFIGS',
  LIST_LANGUAGE: 'LIST_LANGUAGE',
  LANG_EN: 'LANG_EN',
  LOCALE: 'LOCALE',
  PAGE_PRIVACY: 'PAGE_PRIVACY',
  LOGIN: 'LOGIN',
  TOKEN_AUTHENTICATION: 'TOKEN_AUTHENTICATION',
  WALLET: 'WALLET',
  PINCODE: 'PINCODE',
  FINGERPRINT: 'FINGERPRINT',
  ROLE_BACKUP: 'ROLE_BACKUP'
}

export const LANGUAGE = {
  ENGLISH: 'English',
  JAPAN: '日本語',
  VIETNAMESE: 'Tiếng Việt'
}
export const LOCALE = {
  ENGLISH: 'en',
  JAPAN: 'ja',
  VIETNAMESE: 'vi'
}
export const APPFONT = {
  QUICKSAND: 'Quicksand-Regular',
  QUICKSAND_BOLD: 'QuicksandBold',
  OSAKA: 'Osaka',
  TOHOMA: 'Tahoma',
  YUGOTHIC: 'YuGothic-Light',
  BOLD: I18n.locale === LOCALE.JAPAN ? 'Osaka' : 'Quicksand-Bold'
}

export const COLOR = {
  BUTTON: '#00A7EE',
  GRADIENT1: '#299DFE',
  GRADIENT2: '#45C3FC'// '#299DFE', '#45C3FC'
}

export const STYLE = {
  BUTTON: {
    width: width(80),
    height: height(7),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: height(3.5),
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5
  },
  BUTTON_DISABLE: {
    backgroundColor: '#c1c1c1'
  }
}
export const TXT_DEFAULT = {
  color: '#111111',
  fontSize: width(4),
  fontFamily: APPFONT.QUICKSAND,
  paddingTop: height(0)
}

export const TXT_JAPAN = {
  color: '#111111',
  fontSize: width(4),
  fontFamily: APPFONT.TOHOMA
  // paddingTop: height(Platform.OS === 'ios' ? 1 : 0)
}
