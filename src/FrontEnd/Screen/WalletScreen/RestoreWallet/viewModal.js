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
  get renderHeader () {
    return (
      <View/>
    )
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
          <Text style={styles.txtTitle}>{'Your bitcoin/ethereum wallet is backed up'}</Text>
          <Text style={styles.txtContent}>{'Be sure to store you recovery phrase in a secure place. If this app is deleted, your money cannot recovered without it'}</Text>
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
    paddingVertical: height(3)
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
  txtContent: {
    color: '#c3c3c3',
    width: width(70),
    textAlign: 'center'
  },
  txtButton: {
    color: COLOR.BUTTON,
    fontFamily: APPFONT.BOLD,
    fontSize: width(5)
  }
})
