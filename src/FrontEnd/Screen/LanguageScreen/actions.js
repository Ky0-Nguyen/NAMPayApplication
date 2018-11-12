/**
* @name : API
* @description : build api for app
* @author : Tuan Nguyen
* @Create_date: 2018/07/03
*
* @function
* - funcDefaultThis
* - funcInitialData
* - handleSelectLanguage
* - handlePrivacyPolicy
* @Update_by:
* @Update_function:
* -
* -
* -
* -
*/

import I18n from 'react-native-i18n'
import {Actions} from 'react-native-router-flux'
import {setLocale, setListLanguage} from 'controller/Redux/Actions'
import API from 'controller/API'
import store from 'react-native-simple-store'
import {KEYSTORE} from 'common/GlobalConstants'

/**
* @method : funcDefaultThis
* @param: THIS
* @description : set default this for page action
* @author : Tuan Nguyen
* @Create_date: 2018/07/23
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
* @method : funcInitialData
* @param:
* @description : load initial data
* @author : Tuan Nguyen
* @Create_date: 2018/07/23
* @Update_date:
* @Update_by:
* @Update_description:
*/
const sortArray = (arrSort) => {
  return arrSort.sort((a, b) => (a.lang_id < b.lang_id) ? -1 : 1)
}
export const funcInitialData = () => {
  return async (dispatch, getState) => {
    console.log('START FUNCTION : funcInitialData')
    const {internetData} = getState()
    if (internetData) {
      let ListLanguageData = await API.GetLanguages()

      if (ListLanguageData.code === 200) {
        let arr = []
        console.log('ListLanguageData :', ListLanguageData)
        sortArray(ListLanguageData.data.listLanguages).map((item, index) => {
          let itemTemp = {
            key: index.toString(),
            lang_flag_photo: item.lang_flag_photo,
            lang_locale: item.lang_locale,
            lang_name: item.lang_name,
            lang_order: item.lang_order,
            lang_id: item.lang_id
          }
          arr.push(itemTemp)
        })

        dispatch(setListLanguage(arr))
        let localeData = await store.get(KEYSTORE.LOCALE)
        I18n.locale = localeData
        I18n.fallbacks = true

        let selected = 0
        sortArray(ListLanguageData.data.listLanguages).map((item, index) => {
          if (item.lang_locale === localeData) {
            selected = index
          }
        })
        _this.setState({
          selected,
          data: sortArray(ListLanguageData.data.listLanguages),
          isLoading: false
        })
      }
    }
    console.log('END FUNCTION : funcInitialData')
  }
}

/**
* @method : handleSelectLanguage
* @param: indexSelect
* @description : when select language , language for that were choiced
* @author : Tuan Nguyen
* @Create_date: 2018/07/23
* @Update_date:
* @Update_by:
* @Update_description:
*/
export const handleSelectLanguage = (indexSelect) => () => {
  return () => {
    _this.state.data.map((item, index) => {
      if (indexSelect === index) {
        I18n.locale = item.lang_locale
      }
    })
    _this.setState({
      selected: indexSelect
    })
  }
}

/**
* @method : handlePrivacyPolicy
* @param:
* @description : go to screen privacy policy and set local data is locale
* @author : Tuan Nguyen
* @Create_date: 2018/07/03
* @Update_date:
* @Update_by:
* @Update_description:
*/
export const handlePrivacyPolicy = () => {
  return (dispatch) => {
    let locale = 'en'
    _this.state.data.map((item, index) => {
      if (_this.state.selected === index) {
        locale = item.lang_locale
      }
    })
    dispatch(setLocale(locale))
    Actions.mainUser()
  }
}
