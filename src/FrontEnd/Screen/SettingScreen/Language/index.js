import MainScreen from './view'
import { connect } from 'react-redux'
import * as mapActionsToProps from './actions'

const mapStateToProps = (state) => ({
  localeData: state.localeData,
  internetData: state.internetData,
  listLanguageData: state.listLanguageData
})

export default connect(mapStateToProps, mapActionsToProps)(MainScreen)
