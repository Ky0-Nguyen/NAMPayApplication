import React from 'react'
import {View, Text, TouchableOpacity, FlatList, Image, Platform, StyleSheet} from 'react-native'

// style
import {width, height} from 'react-native-dimension'
// core
import {CoreLayoutTabbar} from 'frontend/Container'

// another component
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import * as Animatable from 'react-native-animatable'

import {CustomModal} from 'frontend/Components'
import LinearGradient from 'react-native-linear-gradient'
import I18n from 'react-native-i18n'
// common
import { COLOR, APPFONT } from 'common/GlobalConstants'
import {formatNumber} from 'common/GlobalFuntions'

// sub view
import ListTokenScreen from '../ListToken'

const _keyExtractor = (item, index) => item.id
const icBitcoin = <FontAwesome name={'bitcoin'} size={width(25)} color={'#F0F0F0'}/>

class Home extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isShowModal: false
    }
  }

  _openModal=() => {
    this.setState({ isShowModal: true })
  }
  _closeModal=() => {
    this.setState({ isShowModal: false })
  }

  _renderItemButton = ({item, index}) => {
    const { coinList, handleWalletInfo } = this.props
    const styleTxtProfit = [styles.txtPriInfo, { color: item.coin_change_percent_24h < 0 ? 'red' : 'green' }]
    return (
      <TouchableOpacity style={styles.contButtonChart} onPress={handleWalletInfo(item, coinList, false)}>
        <View style={styles.btn}>
          <View style={styles.contTopButton}>
            {/* view 1 */}
            <View style={styles.contTextIcon}>
              <View style={styles.contImage}>
                <Image
                  style={styles.img}
                  resizeMode={'cover'}
                  source={{
                    uri: item.coin_image_url || item.token_photo
                  }} />
              </View>
              <View style={styles.contTextButton}>
                <Text style={styles.txtPriInfo}>{item.coin_symbol || item.token_symbol}</Text>
                <Text style={styles.txtTitlePriInfoPrice}>{item.coin_name || item.token_name}</Text>
              </View>
            </View>

            {/* ----------- */}
            {/* view 2 */}
            <View style={styles.contBalance}>
              <Text style={styles.txtPriInfoAmout}>
                {
                  (formatNumber(item.coin_price) === 'NaN'
                    ? 0.00
                    : formatNumber(item.coin_price)
                  ) +
                  ' ' + (item.to_currency_symbol)
                }</Text>
              <Text style={styles.txtTitlePriInfoPrice}>{I18n.t('home_screen_label_price')}</Text>
            </View>
            {/* ------------------ */}
          </View>

          {/* Bottom view */}
          <View style={styles.contBottomButton}>
            <View style={styles.contPriInfo}>
              <Text style={styles.txtAmountInfo}>
                {
                  (formatNumber((item.address_amount || item.total_amount), false) === 'NaN'
                    ? 0.00
                    : formatNumber((item.address_amount || item.total_amount), false)) +
                  ' ' + (item.coin_symbol || item.token_symbol)
                }</Text>
            </View>

            <View style={styles.contPriInfo}>
              <Text style={styleTxtProfit}>
                {
                  Number(item.coin_change_percent_24h) < 0
                    ? <FontAwesome name={'long-arrow-down'} size={width(6)}/>
                    : <FontAwesome name={'long-arrow-up'} size={width(6)}/>
                }
                {
                  (formatNumber((item.coin_change_percent_24h), true) === 'NaN'
                    ? 0.00
                    : formatNumber((item.coin_change_percent_24h), true)) +
                    '' + '%'
                }
              </Text>
              <Text style={styles.txtTitlePriInfoProfit}>{I18n.t('home_screen_label_profit')}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
  render () {
    const {
      // handleRefreshData,
      totalMoney, tokenListOfUser, coinList,
      refreshing, tokenList, isLoadingHome} = this.props

    return (
      <CoreLayoutTabbar title={'NAM Pay'} headerStyle={styles.headerStyle} titleColor={'#ffffff'}>
        <Animatable.View pointerEvents={isLoadingHome ? 'none' : 'box-none'} transition={'opacity'} style={styles.container}>
          <View style={styles.contTop}>
            <LinearGradient start={{x: 0, y: 0}} end={{x: 0.75, y: 0}} colors={['#299DFE', '#45C3FC']} style={styles.contTotalBalance} >
              <View style={styles.icBitcoin}>
                {icBitcoin}
              </View>
              <Text style={styles.txtTitleTotal}>{I18n.t('home_screen_label_wallet_total')}</Text>
              <Text style={styles.txtTotal}>{'$' + (formatNumber(totalMoney, true) === 'NaN' ? '0.00' : formatNumber(totalMoney, true))}</Text>
            </LinearGradient>
          </View>
          <Animatable.View style={styles.contContent} >
            <FlatList
              data={coinList}
              keyExtractor={ _keyExtractor }
              extraData={this.props}
              scrollEnabled={false}
              refreshing={refreshing}
              contentContainerStyle={styles.contentContainerStyle}
              renderItem={this._renderItemButton}
              // onRefresh={handleRefreshData}
              showsHorizontalScrollIndicator={false}
              scrollEventThrottle={10}
            />
          </Animatable.View>
        </Animatable.View>
        <CustomModal style={styles.modal} isShowModal={this.state.isShowModal}>
          <ListTokenScreen
            _closeModal={this._closeModal}
            handleAddToken={this.props.handleAddToken}
            tokenList={tokenList}
            tokenListOfUser={tokenListOfUser}
            showsHorizontalScrollIndicator={false}
          />
        </CustomModal>
      </CoreLayoutTabbar>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    height: height(82),
    width: width(100),
    backgroundColor: '#ffffff'
  },
  contTop: {
    flex: 2.5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  contTotalBalance: {
    height: height(18),
    width: width(85),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    shadowOffset: { width: 0, height: 3 },
    shadowColor: '#c3c3c3',
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 3
  },
  contContent: {
    flex: 7.5,
    backgroundColor: '#ffffff'
  },
  headerStyle: {
    backgroundColor: COLOR.BUTTON
  },
  contentContainerStyle: {
    paddingBottom: height(8),
    backgroundColor: 'white'
  },
  btn: {
    width: width(90),
    height: height(16),
    alignSelf: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: width(5)
  },
  contButtonChart: {
    alignSelf: 'center',
    marginTop: height(1.5),
    backgroundColor: '#ffffff',
    shadowOffset: { width: 2, height: 2 },
    shadowColor: '#c3c3c3',
    shadowOpacity: 0.5,
    shadowRadius: 8,
    borderRadius: 5,
    paddingTop: height(1),
    borderWidth: Platform.OS === 'ios' ? 0 : 1,
    borderColor: '#F0F0F0'
  },
  contTopButton: {
    flex: 1,
    width: width(85),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  contBottomButton: {
    width: width(85),
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  contTextIcon: {
    flexDirection: 'row'
  },
  contBalance: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  contPriInfo: {
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  txtPriInfo: {
    fontSize: width(4)
  },
  txtAmountInfo: {
    fontSize: width(6)
  },
  txtTitlePriInfoProfit: {
    fontSize: width(4),
    color: '#c3c3c3',
    alignSelf: 'flex-end'
  },
  txtTitlePriInfoPrice: {
    fontSize: width(4),
    color: '#c3c3c3',
    alignSelf: 'flex-end'
  },
  contImage: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginRight: width(3)
  },
  img: {
    width: width(10),
    height: width(10)
  },
  txtPriInfoAmout: {
    fontSize: width(5),
    color: '#555555'
  },
  modal: {
    top: height(10),
    height: height(50),
    width: width(90),
    backgroundColor: '#ffffff',
    borderRadius: 5
  },
  txtTitleTotal: {
    fontSize: width(4),
    color: '#FFFFFF'

  },
  txtTotal: {
    fontSize: width(7),
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontFamily: APPFONT.BOLD
  },
  icBitcoin: {
    transform: [{ rotate: '20deg' }],
    height: width(35),
    width: width(35),
    position: 'absolute',
    alignSelf: 'flex-start',
    opacity: 0.2,
    borderWidth: Platform.OS === 'ios' ? 15 : 0,
    borderColor: '#F0F0F0',
    borderRadius: width(17.5),
    justifyContent: 'center',
    alignItems: 'center'
  }

})

export default Home
