import View from './view'
import { connect } from 'react-redux'
import * as mapActionsToProps from './actions'

const mapStateToProps = (state) => ({
  localeData: state.localeData,
  walletData: state.walletData,
  pinCodeData: state.pinCodeData,
  userInfoData: state.userInfoData,
  qrCodeData: state.qrCodeData
})

export default connect(mapStateToProps, mapActionsToProps)(View)
