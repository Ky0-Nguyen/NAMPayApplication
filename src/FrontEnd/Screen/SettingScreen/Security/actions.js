import { Actions } from 'react-native-router-flux'
import { setFingerprint } from 'controller/Redux/Actions'
/**
* NAME: handleBackRoute
* PARAMS:
* back to  prev screen
*/
export const handleBackRoute = () => {
  return (dispatch, getState) => {
    Actions.pop()
  }
}

export const onChangeSwitchValue = (value, error) => {
  return (dispatch) => {
    console.log(value)
    console.log(error)
    if (!error) {
      dispatch(setFingerprint(value))
    } else {
      dispatch(setFingerprint(false))
    }
  }
}
/**
* NAME: onSettingPinCode
* PARAMS:
* routes to screen setting pincode
*/
export const onSettingPinCode = () => {
  return (dispatch, getState) => {
    const { pinCodeData } = getState()
    if (pinCodeData !== '') {
      Actions.settingPincode()
    } else {
      Actions.pincode({ types: 'SetupPinCode' })
    }
  }
}
