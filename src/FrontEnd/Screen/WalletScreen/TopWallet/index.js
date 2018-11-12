import View from './view'
import { connect } from 'react-redux'
import * as mapActionsToProps from './actions'

const mapStateToProps = (state) => ({
  appConfigData: state.appConfigData,
  userInfoData: state.userInfoData,
  listLanguageData: state.listLanguageData,
  localeData: state.localeData,
  internetData: state.internetData,
  pinCodeData: state.pinCodeData,
  roleBackupData: state.roleBackupData
})

export default connect(mapStateToProps, mapActionsToProps)(View)
