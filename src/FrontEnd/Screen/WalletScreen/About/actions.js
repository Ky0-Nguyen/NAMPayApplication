/**
* @name : API
* @description : build api for app
* @author : Tuan Nguyen
* @Create_date: 2018/07/18
*
* @function
* - funcDefaultThis
* - loadInitData
* @Update_by:
* @Update_function:
* -
* -
* -
* -
*/
import API from 'controller/API'
/**
* @method : funcDefaultThis
* @param: THIS
* @description : set default this for main tabbar
* @author : Tuan Nguyen
* @Create_date: 2018/07/18
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

/**
* @method : loadInitData
* @param:
* @description : loading initial data
* @author : Tuan Nguyen
* @Create_date: 2018/07/18
* @Update_date:
* @Update_by:
* @Update_description:
*/
export const loadInitData = () => {
  return async () => {
    let htmlViewAbout = await API.GetPageDetailAbout(_this.props.localeData)
    _this.setState({
      htmlView: htmlViewAbout.data.pageDetail.page_contents,
      isLoading: false
    })
  }
}
