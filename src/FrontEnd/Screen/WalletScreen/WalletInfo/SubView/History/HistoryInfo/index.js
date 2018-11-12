import React from 'react'
import {View, Text, TouchableOpacity, Linking, StyleSheet} from 'react-native'

import {width, height} from 'react-native-dimension'
// global
import {formatNumber} from 'common/GlobalFuntions'
import {COLOR} from 'common/GlobalConstants'
import I18n from 'react-native-i18n'
// style

const colorGreen = '#3CB371'
const colorRed = '#FF6A6A'

class HistoryInfo extends React.PureComponent {
  onClickSend = (url) => () => {
    this.props._closeModal()
    Linking.openURL(url)
    // this.props.handleAddToken(this.state.tokenList[this.state.selected])
  }
  // confirmed = false + confirmmation_number = 0 => pending
  // confirmed = false + confirmmation_number = 1 => confirming
  // confirmed = false + confirmmation_number = 6 => success
  render () {
    const { item, itemSymbol, _closeModal } = this.props
    let styleTitle = [styles.txtAmount, {color: item.type === 1 ? colorRed : colorGreen}]
    console.log('item +++', item)
    return (
      <View style={styles.container}>
        <View style={styles.contList}>
          <View style={styles.rowTitleClose}>
            <TouchableOpacity onPress={_closeModal}>
              <Text style={styles.txtAmount}>{'X'}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.rowTitle}>
            <Text style={styleTitle}>{item.type === 1 ? I18n.t('common_button_sent') : I18n.t('common_button_received')}</Text>
            <View style={styles.rowTitleRight}>
              <Text style={[styleTitle, styles.txtMoney]}>{formatNumber(item.value) + ' ' + itemSymbol}</Text>
              <Text style={styles.txtFee}>{I18n.t('coin_detail_screen_textbox_fee') + ' ' + formatNumber(item.fee) + ' ' + itemSymbol }</Text>
            </View>
          </View>
          <View style={styles.rowAddress}>
            <Text style={styles.txtAddressTitle}>{item.type === 1 ? I18n.t('coin_detail_screen_label_to') : I18n.t('coin_detail_screen_label_from')}</Text>
            <Text style={styles.txtAddress}>{item.type === 1 ? item.from_address : item.to_address}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.txtAddressTitle}>{I18n.t('coin_detail_screen_label_status')}</Text>
            <Text style={styles.txtConfirm}>
              {
                item.confirmed === true
                  ? I18n.t('coin_detail_screen_label_confirmed')
                  : item.confirmation_number === 0
                    ? I18n.t('coin_detail_screen_label_pending')
                    : item.confirmation_number === 1
                      ? I18n.t('coin_detail_screen_label_confirming')
                      : item.confirmation_number >= 6 && I18n.t('coin_detail_screen_label_confirmed')
              }
            </Text>
          </View>
        </View>
        <TouchableOpacity style={styles.btn} onPress={this.onClickSend(item.blockchain_url)}>
          <Text style={styles.txtButton}>{I18n.t('coin_detail_screen_button_view_blockchain')}</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: height(50),
    width: width(90),
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    alignSelf: 'center'
  },
  contList: {
    height: height(40),
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    paddingTop: height(2),
    paddingHorizontal: width(3)
  },
  txtButton: {
    width: width(70),
    alignSelf: 'center',
    fontSize: width(4.5),
    fontWeight: 'bold',
    color: COLOR.BUTTON,
    textAlign: 'center'
  },
  btn: {
    flex: 2,
    width: width(90),
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: height(1)
  },
  txtAmount: {
    fontSize: width(6)
  },
  txtMoney: {
    fontSize: width(6)
  },
  txtAddress: {
    fontSize: width(3.5),
    fontWeight: 'bold'
  },
  txtAddressTitle: {
    fontSize: width(4),
    marginRight: width(3)
  },
  txtFee: {
    fontSize: width(3),
    color: '#C3C3C3'
  },
  txtConfirm: {
    color: COLOR.BUTTON,
    fontSize: width(5)
  },
  row: {
    flex: 1.5,
    width: width(90),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    paddingHorizontal: width(3)
  },
  rowAddress: {
    flex: 1.5,
    width: width(90),
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'flex-start',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    paddingHorizontal: width(3)
  },
  rowTitle: {
    flex: 2,
    width: width(90),
    justifyContent: 'space-between',
    alignSelf: 'center',
    alignItems: 'flex-start',
    borderBottomColor: '#F0F0F0',
    borderBottomWidth: 1,
    flexDirection: 'row',
    paddingHorizontal: width(5)
  },
  rowTitleClose: {
    flex: 1,
    width: width(90),
    justifyContent: 'flex-end',
    flexDirection: 'row',
    paddingHorizontal: width(5)
  },
  rowTitleRight: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  }
})
export default HistoryInfo
