// import liraries
import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import {width, height} from 'react-native-dimension'
import {CoreLayout} from 'frontend/Container'

import LinearGradient from 'react-native-linear-gradient'

import I18n from 'react-native-i18n'

import {APPFONT, COLOR} from 'common/GlobalConstants'
import {icDetective} from 'assets/Images'
import CustomModal from 'frontend/Components/CustomModal'
import ViewModal from './viewModal'

// create a component
class MyClass extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isShowModal: false
    }
    props.funcDefaultThis(this)
  }
  render () {
    const {handleBackRoute, funcClose, funcOpen, handleRestore, localeData} = this.props
    const {isShowModal} = this.state
    return (
      <CoreLayout title={I18n.t('create_wallet_screen_title')} leftAction={handleBackRoute}>
        <View style={styles.container}>
          <View style={styles.contTop}>
            <Text style={styles.txtWarning}>{I18n.t('create_wallet_screen_tip_4')}</Text>
            <Text style={styles.txtTip}>{I18n.t('create_wallet_screen_tip_5')}</Text>
          </View>
          <View style={styles.contMiddle}>
            <Image source={icDetective} resizeMode={'contain'} style={styles.img}/>
            {/* </View>
          <View style={styles.contBottom}> */}
            <Text style={styles.txtTip}>{I18n.t('create_wallet_screen_tip_6')}</Text>

            {localeData === 'ja' && <Text style={styles.txtTip2}>{I18n.t('create_wallet_screen_tip_8_1')}</Text>}
            {localeData === 'ja' && <Text style={styles.txtTip2}>{I18n.t('create_wallet_screen_tip_8_2')}</Text>}
            {localeData === 'ja' && <Text style={styles.txtTip2}>{I18n.t('create_wallet_screen_tip_8_3')}</Text>}
            {localeData === 'ja' && <Text style={styles.txtTip2}>{I18n.t('create_wallet_screen_tip_8_4')}</Text>}

          </View>
          <View style={styles.contButton}>
            <TouchableOpacity style={styles.btn} onPress={funcOpen}>
              <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0.5}} colors={[COLOR.GRADIENT1, COLOR.GRADIENT2]} style={styles.linearGradient}>
                <Text style={styles.txtButton}>{I18n.t('common_button_got')}</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
        <CustomModal isShowModal={isShowModal} style={styles.modal}>
          <ViewModal funcClose={funcClose} handleRestore={handleRestore}/>
        </CustomModal>
      </CoreLayout>
    )
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF'
  },
  contTop: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  contMiddle: {
    flex: 6, justifyContent: 'center', alignItems: 'center'
  },
  // contBottom: {
  //   flex: 3,
  //   justifyContent: 'center',
  //   alignItems: 'center'
  // },
  contButton: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  txtWarning: {
    fontSize: width(6),
    fontFamily: APPFONT.BOLD,
    fontWeight: 'bold',
    color: 'red'
  },
  txtTip: {
    width: width(70),
    fontSize: width(3.5),
    textAlign: 'center',
    marginBottom: height(1)
  },
  txtTip2: {
    width: width(70),
    fontSize: width(3.5),
    textAlign: 'center'
  },
  btn: {
    height: height(7),
    width: width(70),
    borderRadius: height(3.5)
  },
  linearGradient: {
    flex: 1,
    borderRadius: height(3.5),
    justifyContent: 'center',
    alignItems: 'center'
  },
  txtButton: {
    color: '#FFFFFF',
    fontSize: width(5),
    fontWeight: 'bold',
    fontFamily: APPFONT.BOLD
  },
  img: {
    height: width(40),
    width: width(40),
    marginBottom: height(3)
  },
  modal: {
    height: height(50),
    width: width(80),
    top: height(15),
    backgroundColor: 'transparent'
  }
})

// make this component available to the app
export default MyClass
