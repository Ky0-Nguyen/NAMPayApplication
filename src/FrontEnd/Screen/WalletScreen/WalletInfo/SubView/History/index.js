import React from 'react'
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native'
// icon
import FontAwesome from 'react-native-vector-icons/FontAwesome'

// style
import {width, height} from 'react-native-dimension'

// global
import {formatNumber} from 'common/GlobalFuntions'
import {COLOR, APPFONT} from 'common/GlobalConstants'

import I18n from 'react-native-i18n'
// controler

// import {CustomLoading} from 'frontend/Components'
import LinearGradient from 'react-native-linear-gradient'
const colorGreen = '#95BF7B'
const colorRed = '#D60A2E'

const icSend = <FontAwesome name={'send'} size={width(8)} color={colorRed}/>
const icReceive = <FontAwesome name={'download'} size={width(8)} color={colorGreen}/>

const _keyExtractor = (item, index) => index.toString()

class History extends React.PureComponent {
  _renderItem = ({item}) => {
    let styleContIcon = [styles.contIcon, { borderColor: item.type === 2 ? colorGreen : colorRed }]
    let styleTxtStatus = [styles.txtStatus, { color: item.type === 2 ? colorGreen : colorRed }]
    // type = 1 => send
    // type = 2 => receive

    // confirmed = false + confirmmation_number = 0 => pending
    // confirmed = false + confirmmation_number = 1 => confirming
    // confirmed = false + confirmmation_number = 6 => success
    return (
      <TouchableOpacity onPress={this.props.handleSelectTxs(item)}>
        <View style={styles.contItem}>
          <View style={styles.contLeft}>
            <View style={styleContIcon}>
              {
                item.type === 2 ? icReceive : icSend
              }
            </View>
            <Text style={styleTxtStatus}>{item.type === 2 ? I18n.t('coin_detail_screen_menu_button_receive') : I18n.t('coin_detail_screen_menu_button_send')}</Text>
          </View>
          <View style={styles.contRight}>
            <Text style={styles.txtAmount}>{formatNumber(item.value) + ' ' + this.props.itemSymbol}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  render () {
    const {dataTxs, isLoadingHistory, loadingInitData, isSend} = this.props
    const styleTxtSent = [styles.txtButton, { color: isSend === 0 ? COLOR.BUTTON : isSend === 1 ? '#FFFFFF' : COLOR.BUTTON }]
    const styleTxtReceive = [styles.txtButton, { color: isSend === 0 ? COLOR.BUTTON : isSend === 2 ? '#FFFFFF' : COLOR.BUTTON }]
    return (
      <View pointerEvents={isLoadingHistory ? 'none' : 'box-none'} style={styles.container}>
        <View style={styles.contTop}>
          <Text style={styles.txtHistory}>{I18n.t('coin_detail_screen_label_historical')}</Text>
          <View style={styles.contButton}>
            <TouchableOpacity onPress={this.props.onReceived}>
              {
                isSend === 2
                  ? <LinearGradient start={{x: 0, y: 0}} end={{x: 0.75, y: 0}} colors={['#299DFE', '#45C3FC']} style={styles.btnLinearGradient} >
                    <Text style={styleTxtReceive}>{I18n.t('common_button_received')}</Text>
                  </LinearGradient>
                  : <View style={styles.btn}>
                    <Text style={styleTxtReceive}>{I18n.t('common_button_received')}</Text>
                  </View>
              }

            </TouchableOpacity>
            <TouchableOpacity onPress={this.props.onSent}>
              {
                isSend === 1
                  ? <LinearGradient start={{x: 0, y: 0}} end={{x: 0.75, y: 0}} colors={['#299DFE', '#45C3FC']} style={styles.btnLinearGradient} >
                    <Text style={styleTxtSent}>{I18n.t('common_button_sent')}</Text>
                  </LinearGradient>
                  : <View style={styles.btn}>
                    <Text style={styleTxtSent}>{I18n.t('common_button_sent')}</Text>
                  </View>
              }
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.contBottom}>
          {
            dataTxs.length === 0
              ? <Text style={styles.txtNoTxs}>{I18n.t('coin_detail_screen_label_no_historical')}</Text>
              : <FlatList
                keyExtractor={_keyExtractor}
                data={dataTxs}
                refreshing={false}
                onRefresh={loadingInitData}
                extraData={dataTxs}
                renderItem={this._renderItem}
              />
          }
        </View>

      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  contItem: {
    height: height(10),
    width: width(90),
    flexDirection: 'row',
    paddingHorizontal: width(3),
    justifyContent: 'space-between',
    alignSelf: 'center',
    backgroundColor: '#F4F9FE',
    marginTop: height(1),
    borderRadius: 5
  },
  contTop: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: width(5)
  },
  contButton: {
    flexDirection: 'row'
  },
  contBottom: {
    flex: 9
  },
  contLeft: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  contRight: {
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  contIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: width(3)
  },
  txtStatus: {
    fontSize: width(5)
  },
  txtAmount: {
    fontSize: width(5),
    color: COLOR.BUTTON
  },
  // txtDate: {
  //   fontSize: width(3)
  // },
  btn: {
    width: width(25),
    height: height(5),
    borderRadius: height(2.5),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  btnLinearGradient: {
    width: width(25),
    height: height(5),
    borderRadius: height(2.5),
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: { width: 0, height: 1 },
    shadowColor: '#c3c3c3',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 1
  },
  txtButton: {
    fontSize: width(4),
    fontFamily: APPFONT.BOLD,
    fontWeight: 'bold'
  },
  txtHistory: {
    fontSize: width(4),
    fontFamily: APPFONT.BOLD,
    fontWeight: 'bold'
  },
  // modal: {
  //   top: height(15)
  // },
  txtNoTxs: {
    top: height(15),
    alignSelf: 'center'
  }
})
export default History
