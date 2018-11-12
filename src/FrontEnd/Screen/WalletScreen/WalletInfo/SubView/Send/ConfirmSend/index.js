import React from 'react'
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import {width, height} from 'react-native-dimension'
import I18n from 'react-native-i18n'
import LinearGradient from 'react-native-linear-gradient'
// style
class ConfirmSend extends React.Component {
  onClickSend = () => {
    this.props.onExcuteSendCoin()
    this.props._closeModal()
  }
  render () {
    const { item,
      strMoneySend,
      strAmountSend,
      strAddress
    } = this.props
    return (
      <View style={styles.container}>
        <View style={styles.contList}>
          <Text style={styles.txtAmount}>{strAmountSend + ' ' + item.coin_symbol}</Text>
          <Text style={styles.txtMoney}>{strMoneySend + ' ' + item.to_currency_symbol}</Text>
          <View style={styles.row}>
            <Text style={styles.txtAddress}>{I18n.t('coin_detail_screen_receive_address_title')}</Text>
            <Text style={styles.txtAddress}>{strAddress}</Text>
          </View>
          <View style={styles.row}>
            <Text>{I18n.t('coin_detail_screen_textbox_fee')}</Text>
            <Text>{'0.000002' + ' ' + item.coin_symbol}</Text>
          </View>
        </View>
        <View style={styles.contButton}>
          <TouchableOpacity style={styles.btnCancel} onPress={this.props._closeModal}>
            <Text style={styles.txtButton}>{I18n.t('common_button_cancel')}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.onClickSend}>
            <LinearGradient start={{x: 0, y: 0}} end={{x: 0.75, y: 0}} colors={['#299DFE', '#45C3FC']} style={styles.btnConfirm} >
              <Text style={styles.txtButton}>{I18n.t('common_button_confirmation')}</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 5
  },
  contList: {
    height: height(33),
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    paddingVertical: height(3)
  },
  contButton: {
    flexDirection: 'row'
  },
  txtButton: {
    fontSize: width(4.5),
    color: '#ffffff'
  },
  btnCancel: {
    height: height(7),
    width: width(45),
    borderBottomLeftRadius: 5,
    backgroundColor: '#C3C3C3',
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnConfirm: {
    height: height(7),
    width: width(45),
    borderBottomRightRadius: 5,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center'
  },
  txtAmount: {
    fontSize: width(8)
  },
  txtMoney: {
    fontSize: width(5)
  },
  txtAddress: {
    fontSize: width(4)
  },
  row: {
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center'
  }
})
export default ConfirmSend
