/**
* @name : API
* @description : build api for app
* @author : Tuan Nguyen
* @Create_date: 2018/07/03
*
* @function
* - GetAppConfigs
* - GetTokenAuth
* - GetLanguages
* - PostLogin
* - PostRestoreWallet
* - PostAddToken
* - GetLanguageDetail
* - GetAllLanguageDetail
* - GetPageDetailPrivacy
* - GetPageDetailTerm
* - GetWalletSummary
* - GetTokensList
* - fetchDataWithBody
* - fetchDataWithBodyNoAuth
* - fetchData
* - fetchDataSystem
* @Update_by:
* @Update_function:
* -
* -
* -
* -
*/
import {Alert, Platform, PermissionsAndroid} from 'react-native'
import Permissions from 'react-native-permissions'

import DeviceInfo from 'react-native-device-info'

import bcrypt from 'react-native-bcrypt'
import {salt, sysAPI, sysToken} from './setting'
import store from 'react-native-simple-store'
import {KEYSTORE} from 'common/GlobalConstants'
import I18n from 'react-native-i18n'

let long
let lat
export default class API {
  // start app , we need get app config and authentication for API
  /**
   * @method : GetAppConfigs
    * @param: ip
    * @description : get system config for application
    * @author : Tuan Nguyen
    * @Create_date: 2018/07/03
    * @Update_date:
    * @Update_by:
    * @Update_description:
    */
  static GetAppConfigs () {
    let action = 'GetAppConfigs'
    return this.fetchDataSystem(action)
  }
  /**
  * @method : GetTokenAuth
  * @param: ip
  * @description : get authentication for app
  * @author : Tuan Nguyen
  * @Create_date: 2018/07/03
  * @Update_date:
  * @Update_by:
  * @Update_description:
  */
  static async GetTokenAuth () {
    let action = 'GetTokenAuth'
    let body = JSON.stringify({
      device_id: DeviceInfo.getUniqueID(),
      client_ip: await DeviceInfo.getIPAddress()
    })
    return this.fetchDataWithBodyNoAuth(action, body)
  }
  //  ------------- END ------------------------

  /**
  * @method : GetLanguages
  * @param:
  * @description : get list language for app that is supports
  * @author : Tuan Nguyen
  * @Create_date: 2018/07/03
  * @Update_date:
  * @Update_by:
  * @Update_description:
  */
  static async GetLanguages () {
    let action = 'GetLanguages'
    return this.fetchDataWithBody(action)
  }
  /**
  * @method : PostLogin
  * @param:  locale, customerEmail, customerPassword, ip
  * @description : login into app
  * @author : Tuan Nguyen
  * @Create_date: 2018/07/03
  * @Update_date:
  * @Update_by:
  * @Update_description:
  */
  static async PostLogin (locale, customerEmail, customerPassword) {
    let action = locale + '/PostLogin'
    var Hashed = bcrypt.hashSync(customerPassword, salt)
    let body = {
      'customer_email': customerEmail,
      'customer_password': Hashed
    }
    return this.fetchDataWithBody(action, body)
  }

  /**
  * @method : PostSignUp
  * @param:
  * @description : register account with wallet
  * @author : Tuan Nguyen
  * @Create_date: 2018/07/04
  * @Update_date:
  * @Update_by:
  * @Update_description:
  */
  static async PostSignUp (locale, email, phone, pass, confirmPass, Mnemonic) {
    let action = locale + '/PostSignUp'
    let passWordHashed = bcrypt.hashSync(pass, salt)
    let passConfirmHashed = bcrypt.hashSync(confirmPass, salt)
    let body = {
      'customer_email': email,
      'customer_phone': phone,
      'customer_password': passWordHashed,
      'customer_password_confirmation': passConfirmHashed,
      'wallet_mnemonic': Mnemonic
    }
    return this.fetchDataWithBody(action, body)
  }
  /**
  * @method : PostRestoreWallet
  * @param:
  * @description : restore wallet
  * @author : Tuan Nguyen
  * @Create_date: 2018/07/10
  * @Update_date:
  * @Update_by:
  * @Update_description:
  */
  static async PostRestoreWallet (locale, email, Mnemonic) {
    let action = locale + '/PostRestoreWallet'
    let body = {
      'customer_email': email,
      'mnemonic': Mnemonic
    }
    return this.fetchDataWithBody(action, body)
  }
  /**
  * @method : PostCoinTransfer
  * @param:
  * @description : send coin
  * @author : Tuan Nguyen
  * @Create_date: 2018/07/16
  * @Update_date:
  * @Update_by:
  * @Update_description:
  */
  static async PostCoinTransfer (locale, coinType, email, priKey, toAddress, amount) {
    let action = locale + '/PostCoinTransfer'
    let body = {
      'coin_type': coinType,
      'customer_email': email,
      'private_key': priKey,
      'to_address': toAddress,
      'amount': amount
    }
    return this.fetchDataWithBody(action, body)
  }

  /**
  * @method : PostTransfer
  * @param:
  * @description : send coin
  * @author : Tuan Nguyen
  * @Create_date: 2018/08/21
  * @Update_date:
  * @Update_by:
  * @Update_description:
  */
  static async PostTransfer (locale, symbol, email, fromAddress, priKey, toAddress, amount) {
    let action = locale + '/PostTransfer'
    let body = {
      'symbol': symbol,
      'customer_email': email,
      'from_address': fromAddress,
      'private_key': priKey,
      'to_address': toAddress,
      'amount': amount
    }
    return this.fetchDataWithBody(action, body)
  }

  /**
  * @method : PostRestoreWallet
  * @param:
  * @description : restore wallet
  * @author : Tuan Nguyen
  * @Create_date: 2018/07/10
  * @Update_date:
  * @Update_by:
  * @Update_description:
  */
  static async PostAddToken (locale, email, symbol, tokenId, tokenName) {
    let action = locale + '/PostAddToken'
    let body = {
      'customer_email': email,
      'to_currency_symbol': symbol,
      'token_id': tokenId,
      'token_name': tokenName
    }
    return this.fetchDataWithBody(action, body)
  }
  /** -------------------------------------
  * @method : PostGenerateMnemonic
  * @param:
  * @description : get new mnemonic
  * @author : Tuan Nguyen
  * @Create_date: 2018/08/06
  * @Update_date:
  * @Update_by:
  * @Update_description:
  * ---------------------------------------
  */
  static async PostGenerateMnemonic (locale) {
    let action = locale + '/PostGenerateMnemonic'
    return this.fetchDataWithBody(action)
  }
  /** -------------------------------------
  * @method : PostGenerateMnemonic
  * @param:
  * @description : get new mnemonic
  * @author : Tuan Nguyen
  * @Create_date: 2018/08/06
  * @Update_date:
  * @Update_by:
  * @Update_description:
  * ---------------------------------------
  */
  static async PostCheckExistenceEmail (locale, email) {
    let action = locale + '/PostCheckExistenceEmail'
    let body = {
      'customer_email': email
    }
    return this.fetchDataWithBody(action, body)
  }
  /**
  * @method : GetLanguageDetail
  * @param: locale
  * @description : get language detail for app
  * @author : Tuan Nguyen
  * @Create_date: 2018/07/03
  * @Update_date:
  * @Update_by:
  * @Update_description:
  */
  static async GetLanguageDetail (locale) {
    console.log('START FUNCTION : GetLanguageDetail')
    let action = locale + '/GetLanguageDetail'
    console.log('END FUNCTION : GetLanguageDetail')
    return this.fetchDataWithBody(action)
  }
  /**
  * @method : GetAllLanguageDetail
  * @param: locale
  * @description : get all language detail for app
  * @author : Tuan Nguyen
  * @Create_date: 2018/07/10
  * @Update_date:
  * @Update_by:
  * @Update_description:
  */
  static async GetAllLanguageDetail () {
    let action = '/GetAllLanguageDetail'
    return this.fetchDataWithBody(action)
  }
  /**
  * @method : GetPageDetailPrivacy
  * @param: locale
  * @description : get page privacy policy
  * @author : Tuan Nguyen
  * @Create_date: 2018/07/03
  * @Update_date:
  * @Update_by:
  * @Update_description:
  */
  static async GetPageDetailPrivacy (locale) {
    let action = locale + '/GetPageDetail'
    let body = {
      'page_slug': 'privacy-policy'
    }
    return this.fetchDataWithBody(action, body)
  }
  /**
  * @method : GetPageDetailPrivacy
  * @param: locale
  * @description : get page privacy policy
  * @author : Tuan Nguyen
  * @Create_date: 2018/07/03
  * @Update_date:
  * @Update_by:
  * @Update_description:
  */
  static async GetAddressTxs (locale, address, addressType) {
    let action = locale + '/GetAddressTxs'
    let body = {
      'address': address,
      'address_type': addressType
    }
    console.log('body', body)
    return this.fetchDataWithBody(action, body)
  }
  /**
  * @method : GetPageDetailTerm
  * @param: locale
  * @description : get page term of service
  * @author : Tuan Nguyen
  * @Create_date: 2018/07/03
  * @Update_date:
  * @Update_by:
  * @Update_description:
  */
  static async GetPageDetailTerm (locale) {
    let action = locale + '/GetPageDetail'
    let body = {
      'page_slug': 'terms-of-service'
    }
    return this.fetchDataWithBody(action, body)
  }
  /**
  * @method : GetPageDetailAbout
  * @param: locale
  * @description : get page about us
  * @author : Tuan Nguyen
  * @Create_date: 2018/07/05
  * @Update_date:
  * @Update_by:
  * @Update_description:
  */
  static async GetPageDetailAbout (locale) {
    let action = locale + '/GetPageDetail'
    let body = {
      'page_slug': 'about-us'
    }
    return this.fetchDataWithBody(action, body)
  }
  /**
  * @method : GetPageDetailHelp
  * @param: locale
  * @description : get page help
  * @author : Tuan Nguyen
  * @Create_date: 2018/07/05
  * @Update_date:
  * @Update_by:
  * @Update_description:
  */
  static async GetPageDetailHelp (locale) {
    let action = locale + '/GetPageDetail'
    let body = {
      'page_slug': 'help'
    }
    return this.fetchDataWithBody(action, body)
  }

  /**
  * @method : GetWalletSummary
  * @param: locale, email, currency
  * @description :  get wallet summary
  * @author : Tuan Nguyen
  * @Create_date: 2018/07/05
  * @Update_date:
  * @Update_by:
  * @Update_description:
  */
  static async GetWalletSummary (locale, email, currency) {
    let action = locale + '/GetWalletSummary'
    let body = {
      'customer_email': email,
      'to_currency_symbol': currency
    }
    return this.fetchDataWithBody(action, body)
  }
  /**
  * @method : GetTokensList
  * @param: locale
  * @description :  get token list custom
  * @author : Tuan Nguyen
  * @Create_date: 2018/07/09
  * @Update_date:
  * @Update_by:
  * @Update_description:
  */
  static async GetTokensList (locale) {
    let action = locale + '/GetTokensList'
    return this.fetchDataWithBody(action)
  }

  /**
   * fetchData() returns the result from rest api call using build-in fetch() of react
   * based on the passed-in pre-defined query string
   */

  static async checkLocationIOS () {
    await Permissions.check('location').then(async response => {
      if (response.toString() === 'denied') {
        Alert.alert(
          'Can we access your location?',
          'We need access it for better application',
          [
            {
              text: 'No',
              onPress: () => console.log('Permission denied'),
              style: 'cancel'
            },
            { text: I18n.t('common_button_open_setting'), onPress: Permissions.openSettings }
          ]
        )
      } else {
        await navigator.geolocation.getCurrentPosition((position) => {
          lat = position.coords.latitude
          long = position.coords.longitude
        })
      }
    })
  }
  static async checkLocationANDROID () {
    try {
      const granted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        await navigator.geolocation.getCurrentPosition((position) => {
          lat = position.coords.latitude
          long = position.coords.longitude
        }, (error) => { console.log(error) },
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 })
      } else {
        console.log('Location permission denied')
        long = 0
        lat = 0
      }
    } catch (err) {
      console.warn(err)
    }
  }

  static async fetchDataWithBody (queryStr, bodyParam) {
    let AppConfig = await store.get(KEYSTORE.APP_CONFIGS)
    let tokenAuth = await this.GetTokenAuth()
    let apiurl = AppConfig.server_api_address + '/' + queryStr
    console.log('queryStr, apiurl, tokenAuth', queryStr, apiurl, tokenAuth)
    if (tokenAuth.code === 200) {
      if (Platform.OS === 'ios') {
        await this.checkLocationIOS()
      } else {
        await this.checkLocationANDROID()
      }
      let bodyTemp = {
        'device_id': DeviceInfo.getUniqueID(),
        'device_name': DeviceInfo.getDeviceName(),
        'device_longitude': long || 0,
        'device_latitude': lat || 0,
        'client_ip': await DeviceInfo.getIPAddress(),
        'device_country': DeviceInfo.getDeviceCountry(),
        'brand': DeviceInfo.getBrand(),
        'manufacturer': DeviceInfo.getManufacturer(),
        'system_version': DeviceInfo.getSystemVersion(),
        'timezone': DeviceInfo.getTimezone(),
        'bundle_id': DeviceInfo.getBundleId(),
        'version': DeviceInfo.getVersion()
      }
      console.log('bodyTemp +++', bodyTemp)

      let bodyAssign = Object.assign(bodyTemp, bodyParam)
      let body = JSON.stringify(bodyAssign)
      console.log('body' + queryStr + ' +++++ ' + body)

      try {
        let response = await fetch(apiurl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authentication': tokenAuth.data.token_id
          },
          body
        })
        let responJson = await response.json()
        return responJson
      } catch (error) {
        throw error
      }
    } else {
      return null
    }
  }
  /**
   * fetchData() returns the result from rest api call using build-in fetch() of react
   * based on the passed-in pre-defined query string
   */
  static async fetchDataWithBodyNoAuth (queryStr, body) {
    let AppConfig = await store.get(KEYSTORE.APP_CONFIGS)
    let apiurl = AppConfig.server_api_address + '/' + queryStr
    try {
      let response = await fetch(apiurl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body
      })
      let responJson = await response.json()
      console.log('fetchDataWithBodyNoAuth', responJson)
      if (responJson) {
        return responJson
      }
    } catch (error) {
      throw error
    }
  }
  /**
   * fetchData() returns the result from rest api call using build-in fetch() of react
   * based on the passed-in pre-defined query string
   */
  static async fetchData (queryStr) {
    let AppConfig = await store.get(KEYSTORE.APP_CONFIGS)
    let tokenAuth = await store.get(KEYSTORE.TOKEN_AUTHENTICATION)
    let apiurl = AppConfig.server_api_address + '/' + queryStr
    try {
      let response = await fetch(apiurl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authentication': tokenAuth.token_id
        }
      })
      let responJson = await response.json()
      return responJson
    } catch (error) {
      throw error
    }
  }
  /**
   * fetchData() returns the result from rest api call using build-in fetch() of react
   * based on the passed-in pre-defined query string
   */
  static async fetchDataSystem (queryStr) {
    let apiurl = sysAPI + queryStr
    try {
      let response = await fetch(apiurl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authentication': sysToken
        }
      })
      let responJson = await response.json()
      return responJson
    } catch (error) {
      throw error
    }
  }
}
