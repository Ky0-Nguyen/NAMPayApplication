import { Actions } from 'react-native-router-flux'
import { Alert, Vibration } from 'react-native'
import Permissions from 'react-native-permissions'
import * as ActionsRedux from 'controller/Redux/Actions'
import { EventRegister } from 'react-native-event-listeners'

var _this
export const defaultThis = (THIS) => {
  return () => {
    _this = THIS
  }
}

export const requestUndetermined = () => {
  return async () => {
    Permissions.request('camera')
      .then(res => {
        _this.setState({ canOpenSettings: res === 'authorized' })
        if (res !== 'authorized') {
          Actions.pop()
          Actions.refresh()
        }
      })
      .catch(e => console.warn(e))
  }
}

export const _requestPermission = () => {
  return () => {
    Alert.alert(
      'Permisson denied',
      '"NAM Pay" Would like to Access the Camera',
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

    if (resultsData !== objResult.data) {
      Vibration.vibrate()
      dispatch(ActionsRedux.setQrCode(objResult.data))
      _this.setState({resultsData: objResult.data})
      Actions.pop()
      Actions.refresh()
      EventRegister.emit('loadUISend')
    }
  }
}
