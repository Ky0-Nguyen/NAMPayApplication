import { Actions } from 'react-native-router-flux'

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
/**
* NAME: onChangePINCode
* PARAMS:
* route to pincode screen with type of screen ( ChangePinCode,RemovePinCode )
*/
export const onChangePINCode = () => {
  return () => {
    Actions.pincode({ types: 'ChangePinCode' })
  }
}
/**
* NAME: onRemovePINCode
* PARAMS:
* route to pincode screen with type of screen ( ChangePinCode,RemovePinCode )
*/
export const onRemovePINCode = () => {
  return () => {
    Actions.pincode({ types: 'RemovePinCode' })
  }
}
/**
* NAME: onSetupPINCode
* PARAMS:
* route to pincode screen with type of screen ( SetupPinCode )
*/
export const onSetupPINCode = () => {
  return () => {
    Actions.pincode({ types: 'SetupPinCode' })
  }
}
