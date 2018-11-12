import PinCodeScreen from './view'
import { connect } from 'react-redux'
import * as mapActionsToProps from './actions'

const mapStateToProps = (state) => ({
  pinCodeData: state.pinCodeData,
  isFingerprint: state.isFingerprint,
  roleBackupData: state.roleBackupData
})

export default connect(mapStateToProps, mapActionsToProps)(PinCodeScreen)
