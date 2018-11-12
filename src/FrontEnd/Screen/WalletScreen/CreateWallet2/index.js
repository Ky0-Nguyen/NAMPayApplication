import View from './view'
import { connect } from 'react-redux'
import * as mapActionsToProps from './actions'

const mapStateToProps = (state) => ({
  userInfoData: state.userInfoData,
  localeData: state.localeData,
  walletData: state.walletData
})

export default connect(mapStateToProps, mapActionsToProps)(View)
