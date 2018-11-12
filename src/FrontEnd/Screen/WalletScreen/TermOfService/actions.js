import {Actions} from 'react-native-router-flux'
import API from 'controller/API'

/** -------------------------------------
* @method : funcDefaultThis
* @param:
* @description : set default this
* @author : Tuan Nguyen
* @Create_date: 2018/08/03
* @Update_date:
* @Update_by:
* @Update_description:
* ---------------------------------------
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
* @description : back to previous screen
* @author : Tuan Nguyen
* @Create_date: 2018/08/03
* @Update_date:
* @Update_by:
* @Update_description:
* ---------------------------------------
*/
export const handleBackRoute = () => {
  return () => {
    Actions.pop()
  }
}

/** -------------------------------------
* @method : loadingInittialData
* @param:
* @description : loading initial data
* @author : Tuan Nguyen
* @Create_date: 2018/08/03
* @Update_date:
* @Update_by:
* @Update_description:
* ---------------------------------------
*/
export const loadingInittialData = () => {
  return async () => {
    const {localeData} = _this.props
    let htmlView = await API.GetPageDetailTerm(localeData)
    _this.setState({
      title: htmlView.data.pageDetail.page_title,
      htmlView: htmlView.data.pageDetail.page_contents,
      isLoading: false
    })
  }
}
