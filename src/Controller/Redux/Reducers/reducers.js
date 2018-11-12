import createReducer from '../Lib/reducerConfig'
import key from '../Lib/constants'
import init from '../Lib/initState'

export const internetData = createReducer(init.internetInit, {
  [key.SET_INTERNET] (state, action) {
    return action.payload
  }
})

export const appConfigData = createReducer(init.appConfigsInit, {
  [key.SET_APP_CONFIGS] (state, action) {
    return action.payload
  }
})

export const appAuthenData = createReducer(init.appAuthenInit, {
  [key.SET_AUTHEN] (state, action) {
    return action.payload
  }
})

export const listLanguageData = createReducer(init.listLanguageInit, {
  [key.SET_LIST_LANGUAGE] (state, action) {
    return action.payload
  }
})

export const localeData = createReducer(init.localeInit, {
  [key.SET_LOCALE] (state, action) {
    return action.payload
  }
})

export const userInfoData = createReducer(init.userInit, {
  [key.SET_LOGIN] (state, action) {
    return action.payload
  }
})

export const walletData = createReducer(init.walletInit, {
  [key.SET_WALLET] (state, action) {
    return action.payload
  }
})

export const isFingerprint = createReducer(init.isFingerprint, {
  [key.SET_FINGERPRINT] (state, action) {
    return action.payload
  }
})

// SET REDUCER for PINcode
export const pinCodeData = createReducer(init.pinInit, {
  [key.SET_PINCODE] (state, action) {
    return action.payload
  }
})

export const qrCodeData = createReducer(init.qrCodeInit, {
  [key.SET_QR_CODE] (state, action) {
    return action.payload
  }
})

export const roleBackupData = createReducer(init.roleBackupInit, {
  [key.SET_ROLE_BACKUP] (state, action) {
    return action.payload
  }
})
