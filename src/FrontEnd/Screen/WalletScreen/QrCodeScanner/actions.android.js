import { Actions } from 'react-native-router-flux'
import { Alert, Vibration, PermissionsAndroid } from 'react-native'
import Permissions from 'react-native-permissions'
import { EventRegister } from 'react-native-event-listeners'
import * as ActionsRedux from 'controller/Redux/Actions'
var _this
export const defaultThis = (THIS) => {
  return () => {
    _this = THIS
  }
}

export const requestUndetermined = () => {
  return async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          'title': 'Permisson denied',
          'message': '"FH Wallet" Would like to Access the Camera'
        }
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        _this.setState({ canOpenSettings: true })
        console.log('You can use the camera')
      } else {
        Actions.pop()
        Actions.refresh()
        console.log('Camera permission denied')
      }
    } catch (err) {
      console.warn(err)
    }
  }
}

export const _requestPermission = () => {
  return (dispatch, getState) => {
    Alert.alert(
      'Permisson denied',
      '"FH Wallet" Would like to Access the Camera',
      [
        {text: 'Cancel',
          onPress: () => {
            Actions.pop()
            Actions.refresh()
          }},
        {text: I18n.t('common_button_ok'),
          onPress: () => Permissions.openSettings().then(() => {
            Alert.alert(
              'Permisson denied',
              'Please accept camera permission to scan QR code',
              [
                {text: 'Cancel',
                  onPress: () => {
                    Actions.pop()
                    Actions.refresh()
                  }},
                {text: I18n.t('common_button_ok'), onPress: () => console.log('OK Pressed'), style: 'cancel'}
              ],
              { cancelable: false }
            )
          })}
      ],
      { cancelable: false }
    )
  }
}

export const onBarCodeRead = (objResult) => {
  return async (dispatch) => {
    const { resultsData } = _this.state
    // Vibration.vibrate()
    // console.log('objResult', objResult)
    // dispatch(ActionsRedux.setQrCode(objResult.data))
    // _this.setState({resultsData: objResult.data})
    // Actions.pop()
    // Actions.refresh()
    if (resultsData !== objResult.data) {
      Vibration.vibrate()
      console.log('objResult', objResult)
      dispatch(ActionsRedux.setQrCode(objResult.data))
      _this.setState({resultsData: objResult.data})
      Actions.pop()
      Actions.refresh()
      EventRegister.emit('loadUISend')
    }
  }
}
