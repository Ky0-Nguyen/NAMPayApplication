import { Actions } from 'react-native-router-flux'
import { setLocale, setListLanguage } from 'controller/Redux/Actions'
import API from 'controller/API'
import I18n from 'react-native-i18n'
import { EventRegister } from 'react-native-event-listeners'

/** -------------------------------------
* @method : funcDefaultThis
* @param: ip
* @description : get authentication for app
* @author : Tuan Nguyen
* @Create_date: 2018/08/16
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
/**
   * _onClick
   * @param {*} id
   * @param {*} item
   * @param {*} isCurrency
   * @param {*} locale
   * @param {*} funcShowAlert
   * when click to select radio
   * check : if screen type is currency data then run function setCurrency from redux
   * if screen type is language data then run function setlanguage from redux
   */
export const onClickChoose = (id) => {
  return (dispatch, getState) => {
    var { localeData } = getState()

    console.log('_this.state.data[id - 1].lang_locale ', _this.state.data[id].lang_locale)
    I18n.locale = _this.state.data[id].lang_locale
    I18n.fallbacks = true
    if (localeData !== _this.state.data[id].lang_locale) {
      dispatch(setLocale(_this.state.data[id].lang_locale))
      Actions.pop()
    }
    EventRegister.emit('funcReLoadUI')
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
    const {internetData, localeData, listLanguageData} = getState()
    if (internetData) {
      let ListLanguageData = await API.GetLanguages()

      listLanguageData.map((item, index) => {
        if (item.lang_locale === localeData) {
          _this.setState({
            iValueDefault: item.key
          })
        }
      })
      if (ListLanguageData.code === 200) {
        if (listLanguageData.length !== ListLanguageData.data.listLanguages.length) {
          let arr = []
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
          I18n.locale = localeData
          I18n.fallbacks = true
          _this.setState({
            data: arr,
            isLoading: false
          })
        } else {
          _this.setState({
            data: listLanguageData,
            isLoading: false
          })
        }
      } else {
        _this.setState({
          data: listLanguageData,
          isLoading: false
        })
      }
    }
  }
}
