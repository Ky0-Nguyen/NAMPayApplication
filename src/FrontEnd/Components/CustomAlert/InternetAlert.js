import React, { Component } from 'react'

// View component
import styles from './styles'
import { Text } from 'react-native'
import { EventRegister } from 'react-native-event-listeners'
// Redux
import { connect } from 'react-redux'
import * as Animatable from 'react-native-animatable'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import {width} from 'react-native-dimension'

const icConnect = <FontAwesome name={'exclamation-circle'} size={width(25)} color={'#FFFFFF'}/>
class InternetAlert extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isActive: true
    }
  }
  componentDidMount () {
    this.internetListener = EventRegister.addEventListener('internetChange', () => {
      this.internetShow()
    })
  }

  componentWillUnmount () {
    EventRegister.removeEventListener(this.internetListener)
  }
  /**
   * NAME: internetShow
   * Render animated for internet show
   */
   internetShow =async () => {
     this.internet && this.setState({isActive: true})
   }

   internetHide = async () => {
     this.internet && this.setState({isActive: false})
   }

  // |------------------------------|
  // |--- RENDER MAIN VIEW START ---|
  // |------------------------------|
   render () {
     const { isActive } = this.state
     const { internetData } = this.props

     let styleInter = {
       zIndex: isActive ? 1001 : -1
     }
     return (
       !internetData
         ? <Animatable.View ref={(ref) => { this.internet = ref }} animation={'fadeIn'}
           onAnimationEnd={this.internetShow} style={[styles.internetContent, styleInter]}>
           {icConnect}
           <Text style={styles.txtInternet}>{'Network Error'}</Text>
           <Text style={styles.txtInternet}>{`The internet connection appears to be offline`}</Text>
         </Animatable.View> : null
     )
   }
}

const mapStateToProps = (state) => {
  return {
    internetData: state.internetData
  }
}

export default connect(mapStateToProps, null)(InternetAlert)
