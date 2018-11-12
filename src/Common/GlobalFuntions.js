import I18n from 'react-native-i18n'
import {Share} from 'react-native'

/**
* @method : validateEmail
* @param: email
* @description :  check validate of email
* @author : Tuan Nguyen
* @Create_date: 2018/07/05
* @Update_date:
* @Update_by:
* @Update_description:
*/
export const validateEmail = (email) => {
  var re = /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email)
}

/**
* @method : validatePhone
* @param: phone
* @description : check validate of number phone
* @author : Tuan Nguyen
* @Create_date: 2018/07/05
* @Update_date:
* @Update_by:
* @Update_description:
*/
export const validatePhone = (phone) => {
  var re = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/
  return re.test(phone)
}

/**
* @method : getIP
* @param:
* @description : get ip of device
* @author : Tuan Nguyen
* @Create_date: 2018/07/03
* @Update_date:
* @Update_by:
* @Update_description:
*/
export const getIP = async () => {
  const response = await fetch('https://api.ipify.org')
  const ip = response.text()
  return ip
}

export const hashCode = (str, num) => {
  var result = ''
  for (var i = 0; i < str.length; i++) {
    result += str.charCodeAt(i).toString(num)
  }
  return result
}
export const formatNumber = (strNumber, isFiatMoney) => {
  let stringNumber = Number(strNumber).toFixed(8).replace(/\.?0+$/, '')
  let dotsCount = countDots(stringNumber, '\\.')
  let precision = null
  if (dotsCount === 1) {
    let decimalCount = stringNumber.length - stringNumber.indexOf('.') - 1
    decimalCount = decimalCount <= 2 ? 2 : decimalCount
    precision = decimalCount > 8 ? 8 : decimalCount
  } else {
    precision = 2
  }
  let value = I18n.toNumber(stringNumber,
    { separator: '.',
      precision: isFiatMoney ? 2 : precision,
      delimiter: ',' })
  return value
}
/**
* NAME: countDots
* PARAMS: strString, strLetter
* Count dots in string receive from user input
*/
export const countDots = (strString, strLetter) => {
  return (strString.match(RegExp(strLetter, 'g')) || []).length
}
/**
* NAME: showAlert
* PARAMS: THIS, strMessage, isError
* Show alert for application
*/
export const showAlert = (THIS, strMessage, isError) => {
  THIS.showAlert(strMessage, isError)
}
/**
* NAME: validateSpace
* PARAMS: strString
* Remove all space if string contain all space
*/
export const validateSpace = (strString) => {
  return /\S/.test(strString)
}

export const onClickShare = (address) => () => {
  Share.share({
    message: address,
    url: address,
    title: 'Wow, did you see that?'
  }, {
    // Android only:
    dialogTitle: 'Share NAM Pay goodness',
    // iOS only:
    excludedActivityTypes: [
      'com.apple.UIKit.activity.PostToTwitter'
    ]
  })
}

/**
* @method : validateAddressBTC
* @param: str
* @description : validation BTC address
* @author : Tuan Nguyen
* @Create_date: 2018/07/17
* @Update_date:
* @Update_by:
* @Update_description:
*/
export const validateAddressBTC = (str) => {
  if (str.length < 26 || str.length > 35) {
    return false
  }

  let re = /^[A-Z0-9]+$/i
  if (!re.test(str)) {
    return false
  }

  return true
}

export const normalize = (str) => {
  let x = String(str) || ''
  return x.replace(/^[\s\xa0]+|[\s\xa0]+$/g, '')
}
/**
* NAME: validateAddress
* PARAMS: strAddress
* Validate address from users input
* RULE: A-F, a-f, 0-9, x
*/
export const validateAddressETH = (strAddress) => {
  var reg = ''
  if (countDots(strAddress, '\\x') > 1) {
    reg = /^([A-Fa-f0-9_]+)$/
  } else {
    reg = /^([A-Fa-f0-9_x]+)$/
  }

  return reg.test(strAddress)
}
