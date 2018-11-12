import {Alert} from 'react-native'
import {Actions, ActionConst} from 'react-native-router-flux'
import {setRoleBackup} from 'controller/Redux/Actions'
import I18n from 'react-native-i18n'
let _this
export const funcDefaultThis = (THIS) => {
  return () => {
    _this = THIS
  }
}

export const handleBackRoute = () => {
  return () => {
    Actions.pop()
    Actions.refresh()
  }
}

export const handleSubmit = () => {
  return (dispatch) => {
    const {
      walletData
    } = _this.props
    const {
      txtChoice
    } = _this.state

    if (JSON.stringify(txtChoice) === JSON.stringify(walletData.mnemonic.split(' '))) {
      dispatch(setRoleBackup(false))
      Alert.alert(
        '',
        I18n.t('confirm_restore_screen_popup_success'),
        [
          {text: I18n.t('common_button_ok'), onPress: () => Actions.walletTopScreen({ type: ActionConst.RESET }), style: 'cancel'}
        ],
        { cancelable: false }
      )
    } else {
      Alert.alert(
        '',
        I18n.t('confirm_restore_screen_popup_error'),
        [
          {text: I18n.t('common_button_ok'), onPress: () => console.log('OK Pressed'), style: 'cancel'}
        ],
        { cancelable: false }
      )
    }
  }
}
