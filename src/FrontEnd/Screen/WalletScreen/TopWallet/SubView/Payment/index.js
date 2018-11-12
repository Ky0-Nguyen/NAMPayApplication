import React from 'react'
import { AppState, PermissionsAndroid, Platform, View, Vibration } from 'react-native'
import { Alert } from 'react-native'

// Base component
import * as Animatable from 'react-native-animatable'
import Permissions from 'react-native-permissions'
import { Actions } from 'react-native-router-flux'

//  container
//  style
import { width } from 'react-native-dimension'
import {CoreLayoutTabbar} from 'frontend/Container'
import Camera from 'react-native-camera'
import styles from './styles'

import * as ActionsRedux from 'controller/Redux/Actions'

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
      canOpenSettings: false
    }
  }
  async componentDidMount () {
    if (Platform.OS === 'ios') {
      console.log('tuan tuan')
      Permissions.check('camera').then((response) => {
        console.log(response)
        if (response === 'undetermined') {
          this.requestUndetermined()
        } else if (response !== 'authorized') {
          this.funcRequestPermission()
        }
      })
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Permisson denied',
            message: '"NAM Pay" Would like to Access the Camera'
          }
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          this.setState({ canOpenSettings: true })
          console.log('You can use the camera')
        } else {
          Actions.pop()
          Actions.refresh()
          console.log('Camera permission denied')
        }
      } catch (err) {
        console.warn(err)
      }
    }
    this.updatePermissions(['camera'])
    AppState.addEventListener('change', this.handleAppStateChange)
  }

  requestUndetermined = () => {
    return async () => {
      console.log('tuan tuan tuan')
      console.log(await Permissions.check('camera'))

      await Permissions.check('camera')
        .then((res) => {
          THIS.setState({ canOpenSettings: res === 'authorized' })
          if (res !== 'authorized') {
            Actions.pop()
            Actions.refresh()
          }
        })
        .catch((e) => console.warn(e))
    }
  }
  funcRequestPermission = () => {
    return async () => {
      Alert.alert(
        'Permisson denied',
        '"NAM Pay" Would like to Access the Camera',
        [
          {
            text: 'Cancel',
            onPress: () => {
              Actions.pop()
              Actions.refresh()
            }},
          {
            text: I18n.t('common_button_ok'),
            onPress: () => Permissions.openSettings().then(() => {
              Alert.alert(
                'Permisson denied',
                'Please accept camera permission to scan QR code',
                [
                  {
                    text: 'Cancel',
                    onPress: () => {
                      Actions.pop()
                      Actions.refresh()
                    }}
                ],
                { cancelable: false }
              )
            })}
        ],
        { cancelable: false }
      )
    }
  }

  onBarCodeRead = (objResult) => {
    return async () => {
      const { resultsData } = THIS.state

      if (resultsData !== objResult.data) {
        Vibration.vibrate(1, false)
        ActionsRedux.setQrCode(objResult.data)
        THIS.setState({resultsData: objResult.data})
        Actions.pop()
        Actions.refresh()
      }
    }
  }

  handleAppStateChange = (appState) => {
    if (appState === 'active') {
      this.updatePermissions(['camera'])
    }
  }
  updatePermissions = async (types) => {
    await Permissions.checkMultiple(types)
      .then((status) => {
        return status
      })
      .then((status) => this.setState({ canOpenSettings: status.camera === 'authorized' }))
  }

  render () {
    const { canOpenSettings } = this.state
    return (
      <CoreLayoutTabbar title={'QR Code Scanner'}>
        {
          canOpenSettings && <Camera style={styles.cameraContainer}
            type={Camera.constants.Type.back}
            onBarCodeRead={this.onBarCodeRead} />}
        {/* Rounded camera */}
        <View style={styles.scanContainer}>
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
                iterationCount={'infinite'}
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
        </View>
      </CoreLayoutTabbar>
    )
  }
}
