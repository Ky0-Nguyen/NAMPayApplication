// -------------------------------------
// @name : API
// @description : build api for app
// @author : Tuan Nguyen
// @Create_date: 2018/07/03
//
// @function
// - handleLogin
// - handleRegister
// - handlePrivacy
// - handleTerm
// @Update_by:
// @Update_function:
// -------------------------------------
import {Actions} from 'react-native-router-flux'

/** -------------------------------------
* @method : handleLogin
* @param:
* @description : go to screen login
* @author : Tuan Nguyen
* @Create_date: 2018/08/01
* @Update_date:
* @Update_by:
* @Update_description:
* ---------------------------------------
*/
export const handleLogin = () => {
  return () => {
    Actions.login()
  }
}

/** -------------------------------------
* @method : handleRegister
* @param:
* @description : go to screen register
* @author : Tuan Nguyen
* @Create_date: 2018/08/01
* @Update_date:
* @Update_by:
* @Update_description:
* ---------------------------------------
*/
export const handleRegister = () => {
  return () => {
    Actions.register()
  }
}

/** -------------------------------------
* @method : handlePrivacy
* @param:
* @description : go to Privacy Policy screen
* @author : Tuan Nguyen
* @Create_date: 2018/08/03
* @Update_date:
* @Update_by:
* @Update_description:
* ---------------------------------------
*/
export const handlePrivacy = () => {
  return () => {
    Actions.walletPrivacyPolicy()
  }
}
/** -------------------------------------
* @method : handleTerm
* @param:
* @description : go to Term of service screen
* @author : Tuan Nguyen
* @Create_date: 2018/08/03
* @Update_date:
* @Update_by:
* @Update_description:
* ---------------------------------------
*/
export const handleTerm = () => {
  return () => {
    Actions.walletTermOfService()
  }
}
