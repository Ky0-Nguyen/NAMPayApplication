import React from 'react'
import {View, Text, ScrollView, TextInput,
  TouchableOpacity, StyleSheet} from 'react-native'

import FontAwesome from 'react-native-vector-icons/FontAwesome'
import {width, height} from 'react-native-dimension'

import {COLOR} from 'common/GlobalConstants'

import LinearGradient from 'react-native-linear-gradient'
import * as Animatable from 'react-native-animatable'

import I18n from 'react-native-i18n'
import { EventRegister } from 'react-native-event-listeners'

const space = ' '

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

class Send extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      strQrCodeData: props.qrCodeData.length === 0
        ? []
        : props.qrCodeData.split(/\s*,\s*/),
      strMoneyQr: 0
    }
  }
  componentDidMount () {
    this.loadUISend = EventRegister.addEventListener('loadUISend', () => {
      var re = /\s*,\s*/
      this.setState({
        strQrCodeData: this.props.qrCodeData.split(re),
        strMoneyQr: Number(this.props.qrCodeData.split(re)[1]) * this.props.item.coin_price
      })
    })
  }

  componentWillUnmount () {
    EventRegister.removeEventListener(this.loadUISend)
  }
  render () {
    const {item, strMoneySend, strAmountSend, strAddress, qrCodeData,
      onChangeAmountSend, onChangeMoneySend, onChangeAddressSend, handleQrCodeScreen,
      handleSend, onEndEditAmountSend, onEndEditMoneySend, onFocusSend,
      isErrorAddress, isErrorAmount, txtErrorAmount
    } = this.props
    const {strQrCodeData, strMoneyQr} = this.state
    return (
      <ScrollView keyboardShouldPersistTaps={'handled'} scrollEnabled={false} >
        <View style={styles.contInput}>
          <View style={styles.contChildInput}>
            <Text style={styles.txtTitleInput}>{I18n.t('coin_detail_screen_textbox_address')}</Text>
            <TextInput
              value={ strQrCodeData[0] || strAddress}
              placeholder={I18n.t('coin_detail_screen_textbox_placeholder_address')}
              style={styles.inp}
              maxLength={42}
              onFocus={onFocusSend}
              placeholderTextColor={COLOR.BUTTON}
              onChangeText={onChangeAddressSend}
              underlineColorAndroid={'transparent'}
            />
            <TouchableOpacity onPress={handleQrCodeScreen}>
              <FontAwesome name={'qrcode'} size={width(9)} color={'#111'}/>
            </TouchableOpacity>
          </View>
          {isErrorAddress && <Animatable.Text animation="AnimError" style={styles.txtError}>{I18n.t('common_param_format').replace('$0', I18n.t('common_text_address'))}</Animatable.Text>}

          <View style={styles.contAmount}>
            <View style={styles.contInputAmount}>
              <Text style={styles.txtTitleInput}>{item.coin_symbol || item.token_symbol}</Text>
              <TextInput
                value={strQrCodeData[1] || strAmountSend}
                keyboardType={'numeric'}
                placeholder={'0,000'}
                maxLength={10}
                onFocus={onFocusSend}
                onEndEditing={onEndEditAmountSend}
                placeholderTextColor={COLOR.BUTTON}
                style={styles.inpAmount}
                onChangeText={onChangeAmountSend}
                underlineColorAndroid={'transparent'}
              />
            </View>
            <View style={styles.contInputAmount}>
              <Text style={styles.txtTitleInput}>{item.to_currency_symbol}</Text>
              <TextInput
                value= {strMoneyQr || strMoneySend}
                keyboardType={'numeric'}
                placeholder={'0,000'}
                maxLength={10}
                placeholderTextColor={COLOR.BUTTON}
                style={styles.inpAmount}
                onEndEditing={onEndEditMoneySend}
                onChangeText={onChangeMoneySend}
                underlineColorAndroid={'transparent'}
              />
            </View>
          </View>
          {isErrorAmount && <Animatable.Text animation="AnimError" style={styles.txtError}>{txtErrorAmount}</Animatable.Text>}
          <View style={styles.contChildInput}>
            <Text style={styles.txtTitleInput}>{I18n.t('coin_detail_screen_textbox_fee') + space + space}</Text>
            <Text style={styles.txtFee}>{I18n.t('coin_detail_screen_label_fee_standard')}</Text>
          </View>
        </View>

        <View pointerEvents={(qrCodeData || (!isErrorAddress && !isErrorAmount && strAmountSend.length !== 0 && strAddress.length !== 0)) ? 'box-none' : 'none'}>
          <TouchableOpacity style={styles.btn} onPress={handleSend}>
            {
              (qrCodeData || (!isErrorAddress && !isErrorAmount && strAmountSend.length !== 0 && strAddress.length !== 0))
                ? <LinearGradient start={{x: 0, y: 0}} end={{x: 0.75, y: 0}} colors={['#299DFE', '#45C3FC']} style={styles.btnLinearGradient} >
                  <Text style={styles.txtButton}>{I18n.t('common_button_next')}</Text>
                </LinearGradient>
                : <View style={styles.btnLinearGradient} >
                  <Text style={styles.txtButton}>{I18n.t('common_button_next')}</Text>
                </View>
            }
          </TouchableOpacity>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  contInput: {
    paddingVertical: height(2),
    justifyContent: 'flex-start'
  },
  contAmount: {
    width: width(90),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F4F9FF',
    alignSelf: 'center',
    marginBottom: height(1)
  },
  contChildInput: {
    height: height(6),
    width: width(90),
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: height(1),
    backgroundColor: '#F4F9FF',

    borderRadius: 5,
    alignSelf: 'center',
    paddingHorizontal: width(2)
  },
  contInputAmount: {
    flex: 1,
    height: height(6),
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 5,
    alignSelf: 'center',
    paddingHorizontal: width(2)
  },
  btn: {
    flex: 1,
    alignSelf: 'center',
    marginTop: height(2),
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#C3C3C3'
  },
  txtButton: {
    fontSize: width(4.5),
    color: '#ffffff'
  },
  inp: {
    width: width(60),
    paddingVertical: height(1),
    paddingHorizontal: width(2),
    color: COLOR.BUTTON
  },
  inpAmount: {
    width: width(30),
    paddingVertical: height(1),
    paddingHorizontal: width(2),
    color: COLOR.BUTTON
  },
  txtError: {
    color: 'red',
    fontSize: width(3),
    marginHorizontal: width(5)
  },
  txtTitleInput: {
    color: '#998989',
    textAlign: 'left'
  },
  txtFee: {
    color: COLOR.BUTTON,
    width: width(65)
  }

})
export default Send
