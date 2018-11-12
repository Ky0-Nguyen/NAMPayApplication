import React, { Component } from 'react'
import { Image, View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import CoreLayout from 'frontend/Container/CoreLayout'
import { logo } from 'assets/Images'
import LinearGradient from 'react-native-linear-gradient'
import I18n from 'react-native-i18n'
import { height, width } from 'react-native-dimension'
import {COLOR} from 'common/GlobalConstants'

class MainUser extends Component {
  get renderHeader () {
    return (
      <View/>
    )
  }
  render () {
    const {
      handleLogin, handleRegister, handlePrivacy, handleTerm
    } = this.props
    return (
      <CoreLayout showStatusBar={false} CustomHeader={this.renderHeader}>
        <View style={styles.container}>
          {/* container image header  */}
          <View style={styles.contImg}>
            <Image source={logo} style={styles.img} resizeMode={'contain'}/>
            <Text style={styles.txtTitle}>{'NAM '}<Text style={styles.txtSub}>{'Pay'}</Text></Text>
          </View>

          {/* container button */}
          <View style={styles.contButton}>
            <TouchableOpacity onPress={handleLogin}>
              <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0.5}} colors={['#299DFE', '#45C3FC']} style={styles.btn}>
                <Text style={styles.txtSignUp}>{I18n.t('common_button_login')}</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleRegister}>
              <View style={styles.btnRegister}>
                <Text style={styles.txtRegister}>{I18n.t('common_button_register')}</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/*  container privacy policy and term of service */}
          <View style={styles.contPrivacy}>
            <TouchableOpacity onPress={handlePrivacy}>
              <Text style={styles.txtButton}>{I18n.t('common_privacy_policy')}</Text>
            </TouchableOpacity>
            <Text style={styles.txtTip}>{' & '}</Text>
            <TouchableOpacity onPress={handleTerm}>
              <Text style={styles.txtButton}>{I18n.t('common_label_terms_of_services')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </CoreLayout>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    height: height(100),
    width: width(100),
    backgroundColor: '#FFFFFF'
  },
  txtTitle: {
    color: COLOR.BUTTON,
    fontSize: width(12),
    fontWeight: 'bold'
  },
  txtSub: {
    color: COLOR.BUTTON,
    fontSize: width(11)
  },
  contImg: {
    flex: 5,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  img: {
    width: width(30),
    height: width(30),
    backgroundColor: 'transparent'
  },
  contButton: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center'
  },
  contPrivacy: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexDirection: 'row'
  },
  btn: {
    height: height(8),
    width: width(60),
    borderRadius: height(4),
    borderColor: COLOR.BUTTON,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: height(3)
  },
  btnRegister: {
    height: height(8),
    width: width(60),
    borderWidth: 0.5,
    borderRadius: height(4),
    borderColor: COLOR.BUTTON,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: height(3)
  },
  txtSignUp: {
    fontSize: width(5),
    color: '#FFFFFF'
  },
  txtRegister: {
    fontSize: width(5),
    color: COLOR.BUTTON
  },
  txtButton: {
    color: COLOR.BUTTON
  }
})
export default MainUser
