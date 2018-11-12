import View from './view'
import { connect } from 'react-redux'
import * as mapActionsToProps from './actions'

const mapStateToProps = (state) => ({
  walletData: state.walletData,
  roleBackupData: state.roleBackupData
})

export default connect(mapStateToProps, mapActionsToProps)(View)
