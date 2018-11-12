import {Actions} from 'react-native-router-flux'

/**
* @name : handleBackRoute
* @param :
* @description : back to previous screen
*/
export const handleBackRoute = () => {
  return () => {
    Actions.pop()
    Actions.refresh()
  }
}

/** -------------------------------------
* @method : GetTokenAuth
* @param: ip
* @description : get authentication for app
* @author : Tuan Nguyen
* @Create_date: 2018/07/03
* @Update_date:
* @Update_by:
* @Update_description:
* ---------------------------------------
*/
export const handleNext = () => {
  return () => {
    Actions.createWallet2()
  }
}
