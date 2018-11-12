import React, { Component } from 'react'
import { Image, NetInfo, View, Text, StyleSheet, AppState, Platform } from 'react-native'
import CoreLayout from 'frontend/Container/CoreLayout'
import { Bar } from 'react-native-progress'
import { logo } from 'assets/Images'
import { width, height } from 'react-native-dimension'
import { EventRegister } from 'react-native-event-listeners'
import {COLOR} from 'common/GlobalConstants'

const CONNECTION_CHANGE = 'connectionChange'

class Splash extends Component {
  constructor (props) {
    super(props)
    this.state = {
      AppConfigs: {},
      isLoading: true,
      refSplash: undefined,
      progress: 0,
      indeterminate: true
    }
    props.funcDefaultThis(this)
  }

  componentDidMount () {
    this.props.getInitData()
    NetInfo.isConnected.addEventListener(CONNECTION_CHANGE, this.props.handleConnectionChange)
    EventRegister.addEventListener('reloadSplash', () => {
      console.log('reloadSplash')
      this.props.getInitData()
    })
  }
  componentWillUnmount () {
    AppState.removeEventListener('change', this._handleAppStateChange)
  }

  get renderHeader () {
    return (
      <View/>
    )
  }
  render () {
    const {appConfigData} = this.props
    return (
      <CoreLayout showStatusBar={false} CustomHeader={this.renderHeader}>
        <View style={styles.container}>
          <View style={styles.contImg}>
            <Image source={logo} style={styles.img} resizeMode={'contain'}/>
            <Text style={styles.txtTitle}>{'NAM '}<Text style={styles.txtSub}>{'Pay'}</Text></Text>
          </View>
          <View style={styles.contBar}>
            <Bar
              color={COLOR.BUTTON}
              borderRadius={0}
              animationType={'timing'}
              indeterminate={this.state.indeterminate}
              // progress={this.state.progress}
              width={width(50)}
              height={height(0.3)} />
          </View>
          <View style={styles.contFoot}>
            <Text style={styles.txtCopyright}>{appConfigData.app_copyright}</Text>
          </View>
        </View>
      </CoreLayout>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center'
  },
  txtTitle: {
    color: COLOR.BUTTON,
    fontSize: width(12),
    // fontStyle: 'italic',
    fontWeight: 'bold'
  },
  txtSub: {
    color: COLOR.BUTTON,
    fontSize: width(11)
  },
  contImg: {
    flex: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  img: {
    width: width(60),
    height: width(60),
    backgroundColor: 'transparent'
  },
  contBar: {
    flex: 1,
    justifyContent: 'center'
  },
  contFoot: {
    flex: 1,
    justifyContent: Platform.OS === 'ios' ? 'flex-end' : 'flex-start'
  },
  txtCopyright: {
    color: '#111111',
    alignSelf: 'center',
    fontSize: width(3)
  }
})
export default Splash
