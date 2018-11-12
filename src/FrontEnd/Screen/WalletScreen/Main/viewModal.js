import React from 'react'
import {View,
  TouchableOpacity, Text, StyleSheet} from 'react-native'

import {COLOR, APPFONT} from 'common/GlobalConstants'

import * as Animatable from 'react-native-animatable'
import LinearGradient from 'react-native-linear-gradient'
import {width, height} from 'react-native-dimension'
import Ionicons from 'react-native-vector-icons/Ionicons'
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

const icCheck = <Ionicons name={'ios-checkmark-circle-outline'} color={'#FFFFFF'} size={width(22)}/>

export default class view extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      strMnemonic: '',
      isMnemonicError: false,

      isProcess: false

    }
  }

  render () {
    const {
      isProcess
    } = this.state
    const {funcClose} = this.props
    return (
      <View pointerEvents={isProcess ? 'none' : 'box-none'} style={styles.container}>
        {/* background top view */}

        {/* Interface  */}
        <View style={styles.contTop}>
          <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0.25}} colors={['#299DFE', '#45C3FC']} style={styles.viewTop} >
            {icCheck}
          </LinearGradient>
        </View>
        <View style={styles.contBottom}>
          <Text style={styles.txtTitle}>{I18n.t('create_wallet_screen_dialog_label_success')}</Text>
          <TouchableOpacity style={styles.btn} onPress={funcClose}>
            <Text style={styles.txtButton}>{I18n.t('common_button_got')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 9,

    borderRadius: 10,
    backgroundColor: 'transparent'
  },
  contTop: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOR.BUTTON,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5
  },
  contBottom: {
    paddingTop: height(5),
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    justifyContent: 'space-between',
    alignItems: 'center'
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
    width: width(80),
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
  txtButton: {
    color: COLOR.BUTTON,
    fontFamily: APPFONT.BOLD,
    fontSize: width(5)
  }
})
