import React from 'react'
import {View,
  TouchableOpacity, Text, StyleSheet} from 'react-native'

import {COLOR, APPFONT} from 'common/GlobalConstants'

import * as Animatable from 'react-native-animatable'
import LinearGradient from 'react-native-linear-gradient'
import {width, height} from 'react-native-dimension'
import Feather from 'react-native-vector-icons/Feather'
import I18n from 'react-native-i18n'

Animatable.initializeRegistryWithDefinitions({
  AnimError: {
    from: {
      opacity: 0
    },
    to: {
      opacity: 1
    }
  }
})
const icNoCamera = <Feather name={'camera-off'} color={'#FFFFFF'} size={width(12)} />
export default class view extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      strMnemonic: '',
      isMnemonicError: false,

      isProcess: false

    }
  }
  get renderHeader () {
    return (
      <View/>
    )
  }

  render () {
    const {
      isProcess
    } = this.state
    const {funcClose, handleRestore} = this.props
    return (
      <View pointerEvents={isProcess ? 'none' : 'box-none'} style={styles.container}>
        {/* background top view */}

        {/* Interface  */}
        <View style={styles.contTop}>
          <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0.25}} colors={['#299DFE', '#45C3FC']} style={styles.viewTop} >
            <View style={styles.icNoCamera}>
              {icNoCamera}
            </View>
          </LinearGradient>
        </View>
        <View style={styles.contBottom}>
          <Text style={styles.txtTitle}>{I18n.t('create_wallet_screen_dialog_confirm_title')}</Text>
          <Text style={styles.txtContent}>{I18n.t('create_wallet_screen_dialog_confirm_description')}</Text>
          <View style={styles.contButton}>
            <TouchableOpacity style={styles.btn} onPress={funcClose}>
              <Text style={styles.txtButton}>{I18n.t('common_button_back')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn} onPress={handleRestore}>
              <Text style={styles.txtButton}>{I18n.t('common_button_understand')}</Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 9,
    height: height(50),
    width: width(80),
    borderRadius: 10
  },
  contTop: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOR.BUTTON,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5
  },
  contBottom: {
    flex: 6,
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: height(3)
  },
  contButton: {
    flexDirection: 'row'
  },
  viewTop: {
    width: width(80),
    height: height(20),
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5
  },
  btn: {
    width: width(40),
    height: height(10),
    justifyContent: 'center',
    alignItems: 'center'
  },
  txtTitle: {
    width: width(60),
    textAlign: 'center',
    fontWeight: 'bold',
    fontFamily: APPFONT.BOLD
  },
  txtContent: {
    color: '#c3c3c3',
    width: width(70),
    textAlign: 'center'
  },
  txtButton: {
    color: COLOR.BUTTON,
    fontFamily: APPFONT.BOLD,
    fontSize: width(5)
  },
  icNoCamera: {
    width: width(18),
    height: width(18),
    borderWidth: 2,
    borderColor: '#FFFFFF',
    borderRadius: width(9),
    justifyContent: 'center',
    alignItems: 'center'
  }
})
