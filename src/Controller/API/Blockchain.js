/**
* @name : API
* @description : build api for app
* @author : Tuan Nguyen
* @Create_date: 2018/07/18
*
* @function
* - fetchDataSystem
* @Update_by:
* @Update_function:
* -
* -
* -
* -
*/

export default class Blockchain {
  static GetTxsHistory () {
    let url = 'https://blockchain.info/rawaddr/' + '1NSc6zAdG2NGbjPLQwAjAuqjHSoq5KECT7' + '?format=json&limit=50&offset=0'
    return this.fetchData(url)
  }
  /**
   * fetchData() returns the result from rest api call using build-in fetch() of react
   * based on the passed-in pre-defined query string
   */
  static async fetchData (queryStr) {
    let apiurl = queryStr
    try {
      let response = await fetch(apiurl)
      let responJson = await response.json()
      if (responJson) {
        return responJson
      }
    } catch (error) {
      throw error
    }
  }
}
