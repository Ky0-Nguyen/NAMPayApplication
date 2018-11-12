import View from './view'
import { connect } from 'react-redux'
import * as mapActionsToProps from './actions'

const mapStateToProps = (state) => ({
  appConfigData: state.appConfigData,
  internetData: state.internetData
})

export default connect(mapStateToProps, mapActionsToProps)(View)
