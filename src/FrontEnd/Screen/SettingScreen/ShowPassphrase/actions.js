import { Actions } from 'react-native-router-flux'

/**
* NAME: handleBackRoute
* PARAMS:
* back to previous screen
*/
export const handleBackRoute = () => {
  return () => {
    Actions.pop()
    Actions.refresh()
  }
}

export const handleConfirm = () => {
  return () => {
    Actions.confirmRestoreWallet()
  }
}
