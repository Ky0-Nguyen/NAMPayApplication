import View from './view'
import { connect } from 'react-redux'
import * as mapActionsToProps from './actions'

const mapStateToProps = (state) => ({
})

export default connect(mapStateToProps, mapActionsToProps)(View)
