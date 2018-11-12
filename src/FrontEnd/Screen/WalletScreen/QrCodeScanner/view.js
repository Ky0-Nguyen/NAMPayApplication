import React from 'react'
import { View,
  AppState,
  StyleSheet } from 'react-native'

import { width, height } from 'react-native-dimension'
// Base component
import Camera from 'react-native-camera'
import * as Animatable from 'react-native-animatable'
import { Actions } from 'react-native-router-flux'
import Permissions from 'react-native-permissions'

//  container
import {CoreLayout} from 'frontend/Container'

//  style
import LinearGradient from 'react-native-linear-gradient'
// multi language
// import I18n from 'react-native-i18n'

Animatable.initializeRegistryWithDefinitions({
  animScannerRect: {
    from: {
      top: width(0)
    },
    to: {
      top: width(70)
    }
  },
  animLoading: {
    from: {
      opacity: 1
    },
    to: {
      opacity: 0
    }
  },
  animLoading2: {
    from: {
      opacity: 0
    },
    to: {
      opacity: 1
    }

  }
})
// |------------------------------|
// |--- RENDER MAIN VIEW START ---|
// |------------------------------|
export default class QrCodeScanner extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      resultsData: '',
      canOpenSettings: false,
      isLoading: true
    }
    props.defaultThis(this)
  }

  async componentDidMount () {
    var self = this
    setTimeout(() => {
      Permissions.check('camera').then(response => {
        if (response === 'undetermined') {
          this.props.requestUndetermined()
        } else if (response !== 'authorized') {
          this.props._requestPermission()
        }
      })
      self._updatePermissions(['camera'])
      AppState.addEventListener('change', self._handleAppStateChange)
    }, 500)
    setTimeout(() => {
      self.setState({ isLoading: false })
    }, 2000)

    //
    //
  }

  componentWillUnmout () {
    this.camera && this.camera.shouldQR()
    AppState.removeEventListener('change', this._handleAppStateChange)
  }

  _handleAppStateChange = appState => {
    if (appState === 'active') {
      this._updatePermissions(['camera'])
    }
  }
  _updatePermissions = (types) => {
    Permissions.checkMultiple(types)
      .then(status => {
        return status
      })
      .then(status => this.setState({ canOpenSettings: status.camera === 'authorized' }))
  }

  render () {
    const { onBarCodeRead } = this.props
    const { canOpenSettings, isLoading } = this.state
    return (
      <CoreLayout title={'Qr Code Scanner'} leftAction={Actions.pop}>
        {
          isLoading && <View style={styles.contTotalBoard} >
            <LinearGradient start={{x: 0.2, y: 0}} end={{x: 1, y: 0}} colors={['#299DFE', '#45C3FC']} style={styles.contBoard} />
          </View>
        }

        {
          canOpenSettings && <Camera style={styles.cameraContainer}
            type={Camera.constants.Type.back}
            onBarCodeRead={onBarCodeRead} />
        }
        <Animatable.View style={styles.scanContainer}>
          <View style={styles.scanLineLeftTop}>
            <View style={styles.lineTop} />
            <View style={styles.lineBottom} />
          </View>
          <View style={styles.scanLineCenter}>
            <View style={styles.lineCenter}>
              <View style={styles.lineCenterTop} />
              <View style={styles.lineCenterBottom} />
            </View>
            <View style={styles.lineScanner}>
              <Animatable.View
                animation={'animScannerRect'}
                iterationCount= {'infinite'}
                duration={15000}
                easing={'linear'}
                style={styles.lineScannerAnim} />
            </View>
            <View style={styles.lineCenter}>
              <View style={styles.lineLeftTop} />
              <View style={styles.lineLeftBottom} />
            </View>
          </View>
          <View style={styles.lineRightContainer}>
            <View style={styles.lineRightTop} />
            <View style={styles.lineRightBottom} />
          </View>
        </Animatable.View>

        {/* Rounded camera */}
      </CoreLayout>
    )
  }
}
const scanCoverColor = '#44444488'
const scanRectWidth = width(70)
const scanBorder = '#999999'

const styles = StyleSheet.create({
  cameraContainer: {
    flex: 1
  },
  contTotalBoard: {
    position: 'absolute',
    zIndex: 10001
  },
  contBoard: {
    height: height(100),
    width: width(100)

  },
  lineScanner: {
    width: scanRectWidth
  },
  lineScannerAnim: {
    width: scanRectWidth,
    height: 2,
    backgroundColor: '#1dacf9'
  },
  scanContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  },
  scanLineLeftTop: {
    width: width(100),
    height: scanRectWidth / 2,
    backgroundColor: scanCoverColor,
    flexDirection: 'row'

  },
  lineTop: {
    borderBottomWidth: 4,
    borderBottomColor: scanBorder,
    width: scanRectWidth / 7 + 4.1,
    height: scanRectWidth / 2,
    marginLeft: (width(100) - scanRectWidth) / 2 - 4.1
  },
  lineBottom: {
    borderBottomWidth: 4,
    borderBottomColor: scanBorder,
    width: scanRectWidth / 7 + 4,
    height: scanRectWidth / 2,
    marginLeft: scanRectWidth - (scanRectWidth / 3.5)
  },
  scanLineCenter: {
    width: width(100),
    height: scanRectWidth,
    flexDirection: 'row'
  },
  lineCenter: {
    flex: 1,
    backgroundColor: scanCoverColor
  },
  lineCenterTop: {
    borderRightWidth: 4,
    borderRightColor: scanBorder,
    height: scanRectWidth / 7
  },
  lineCenterBottom: {
    borderRightWidth: 4,
    borderRightColor: scanBorder,
    height: scanRectWidth / 7,
    marginTop: scanRectWidth - (scanRectWidth / 3.5)
  },
  lineLeftTop: {
    borderLeftWidth: 4,
    borderLeftColor: scanBorder,
    height: scanRectWidth / 7
  },
  lineLeftBottom: {
    borderLeftWidth: 4,
    borderLeftColor: scanBorder,
    height: scanRectWidth / 7,
    marginTop: scanRectWidth - (scanRectWidth / 3.5)
  },
  lineRightContainer: {
    flex: 1,
    width: width(100),
    backgroundColor: scanCoverColor,
    flexDirection: 'row'
  },
  lineRightTop: {
    borderTopWidth: 4,
    borderTopColor: scanBorder,
    width: scanRectWidth / 7 + 4.1,
    height: scanRectWidth / 2,
    marginLeft: (width(100) - scanRectWidth) / 2 - 4.1
  },
  lineRightBottom: {
    borderTopWidth: 4,
    borderTopColor: scanBorder,
    width: scanRectWidth / 7 + 4,
    height: scanRectWidth / 2,
    marginLeft: scanRectWidth - (scanRectWidth / 3.5)
  }
})
