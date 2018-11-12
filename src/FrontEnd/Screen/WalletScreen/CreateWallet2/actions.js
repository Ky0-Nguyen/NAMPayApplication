import {Actions} from 'react-native-router-flux'

/**
* @method : funcDefaultThis
* @param: THIS
* @description :  set default this of screen
* @author : Tuan Nguyen
* @Create_date: 2018/08/06
* @Update_date:
* @Update_by:
* @Update_description:
*/
let _this
export const funcDefaultThis = (THIS) => {
  return () => {
    _this = THIS
  }
}

/** -------------------------------------
* @method : handleBackRoute
* @param:
* @description : back previous screen
* @author : Tuan Nguyen
* @Create_date: 2018/08/06
* @Update_date:
* @Update_by:
* @Update_description:
* ---------------------------------------
*/
export const handleBackRoute = () => {
  return () => {
    Actions.pop()
    Actions.refresh()
  }
}

/** -------------------------------------
* @method : funcClose
* @param:
* @description :close modal
* @author : Tuan Nguyen
* @Create_date: 2018/08/06
* @Update_date:
* @Update_by:
* @Update_description:
* ---------------------------------------
*/
export const funcClose = () => {
  return () => {
    _this.setState({ isShowModal: false })
  }
}
/** -------------------------------------
* @method : funcOpen
* @param:
* @description :open modal
* @author : Tuan Nguyen
* @Create_date: 2018/08/06
* @Update_date:
* @Update_by:
* @Update_description:
* ---------------------------------------
*/
export const funcOpen = () => {
  return () => {
    _this.setState({ isShowModal: true })
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

export const handleRestore = () => {
  return () => {
    // walletRestoreWallet
    // _this.setState({ isShowModal: false },
    //   () => Actions.confirmRestoreWallet({
    //     parentView: 'create', Mnemonic: _this.props.Mnemonic
    //   }))
    Actions.showPassphrase()
  }
}
