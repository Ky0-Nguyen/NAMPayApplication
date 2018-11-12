import React from 'react'
import {
  View, Text, ScrollView, Keyboard,
  TextInput, TouchableOpacity, StyleSheet
} from 'react-native'
import QRCode from 'react-native-qrcode'
import {width, height} from 'react-native-dimension'

import I18n from 'react-native-i18n'
import * as Animatable from 'react-native-animatable'
import LinearGradient from 'react-native-linear-gradient'
// common
import {onClickShare} from 'common/GlobalFuntions'
import { COLOR } from 'common/GlobalConstants'

class Receive extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      keyboardHeight: 0,
      iHeightInput: 0
    }
  }

  componentDidMount () {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow)
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide)
  }
  _keyboardDidShow =(e) => {
    if (this.state.keyboardHeight === 0) {
      this.setState({ keyboardHeight: (e.endCoordinates.height - this.state.iHeightInput) * 1.5 })
    }
  }
  _keyboardDidHide =() => {
    this.setState({ keyboardHeight: 0 })
  }
  onLayout = (e) => {
    if (this.state.iHeightInput === 0) {
      let y = e.nativeEvent.layout.y
      this.setState({
        iHeightInput: y
      })
    }
  }

  render () {
    const {item, strMoney, strAmount, onFocusReceive,
      onChangeAmount, address, onEndEditMoneyReceive, onEndEditAmountReceive,
      onChangeMoney, onCopyClipboard} = this.props
    let QrCodeValue = strAmount.length !== 0 ? ((address || item.address) + ',' + strAmount) : (address || item.address)
    let styleContInput = [styles.contInput, {
      bottom: this.state.keyboardHeight
    }]
    return (
      <ScrollView keyboardShouldPersistTaps={'handled'} scrollEnabled={false} >
        <View style={styles.container} >
          <Text style={styles.txtTitle}>{I18n.t('coin_detail_screen_copy_address_tips')}</Text>
          <TouchableOpacity onPress={onCopyClipboard(QrCodeValue)}>
            <View style={styles.contQr} pointerEvents={'none'}>
              <QRCode
                value={QrCodeValue}
                size={height(18)}
                bgColor='black'
                fgColor='white'
              />
            </View>
          </TouchableOpacity>
          <Text style={styles.txtAddress}>{address || item.address}</Text>
          <Animatable.View onLayout={this.onLayout} transition="bottom" style={styleContInput}>
            <View style={styles.contChildInput}>
              <Text style={styles.txtTitleInput}>{item.coin_symbol || item.token_symbol}</Text>
              <TextInput
                value={strAmount}
                keyboardType={'numeric'}
                placeholder={'0,000'}
                maxLength={10}
                onFocus={onFocusReceive}
                onEndEditing={onEndEditAmountReceive}
                style={styles.inp}
                placeholderTextColor={COLOR.BUTTON}
                onChangeText={onChangeAmount}
                underlineColorAndroid={'transparent'}
              />
            </View>
            <View style={styles.contChildInput}>
              <Text style={styles.txtTitleInput}>{item.to_currency_symbol}</Text>
              <TextInput
                value={strMoney}
                keyboardType={'numeric'}
                placeholder={'0,000'}
                onFocus={onFocusReceive}
                onEndEditing={onEndEditMoneyReceive}
                placeholderTextColor={COLOR.BUTTON}
                maxLength={10}
                style={styles.inp}
                onChangeText={onChangeMoney}
                underlineColorAndroid={'transparent'}
              />
            </View>

          </Animatable.View>
          <TouchableOpacity style={styles.btn} onPress={onClickShare(item.address)}>
            <LinearGradient start={{x: 0, y: 0}} end={{x: 0.75, y: 0}} colors={['#299DFE', '#45C3FC']} style={styles.btnLinearGradient} >
              <Text style={styles.txtButton}>{I18n.t('coin_detail_screen_button_share')}</Text>
            </LinearGradient>
          </TouchableOpacity>

        </View>
      </ScrollView>

    )
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  contInput: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  contQr: {
    marginVertical: height(1)
  },
  contChildInput: {
    height: height(6),
    width: width(90),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
    marginBottom: height(1),
    backgroundColor: '#F4F9FF',
    borderRadius: 5
  },
  btn: {
    flex: 1,
    alignSelf: 'center',
    shadowOffset: { width: 0, height: 2 },
    shadowColor: '#c3c3c3',
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 2
  },
  btnLinearGradient: {
    width: width(90),
    height: height(6),
    borderRadius: height(3),
    backgroundColor: COLOR.BUTTON,
    justifyContent: 'center',
    alignItems: 'center'
  },
  txtTitle: {
    textAlign: 'center',
    color: 'red'
  },
  txtAddress: {
    textAlign: 'center',
    color: COLOR.BUTTON,
    fontSize: width(3.5)
  },
  txtButton: {
    fontSize: width(4.5),
    color: '#ffffff'
  },
  txtTitleInput: {
    color: '#443434'
  },
  inp: {
    width: width(80),
    paddingVertical: height(1),
    paddingHorizontal: width(2),
    color: COLOR.BUTTON
  }
})
export default Receive
