import MainScreen from './view'
import { connect } from 'react-redux'
import * as mapActionsToProps from './actions'

const mapStateToProps = (state) => ({
  pinCodeData: state.pinCodeData,
  isFingerprint: state.isFingerprint
})

export default connect(mapStateToProps, mapActionsToProps)(MainScreen)
