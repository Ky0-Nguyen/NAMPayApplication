import View from './view'
import { connect } from 'react-redux'
import * as mapActionsToProps from './actions'

const mapStateToProps = (state) => ({
  appConfigData: state.appConfigData,
  localeData: state.localeData
})

export default connect(mapStateToProps, mapActionsToProps)(View)
