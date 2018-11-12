import React from 'react'
import {View,
  // TouchableOpacity,
  Text, Image, Platform, StyleSheet} from 'react-native'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import {width, height} from 'react-native-dimension'
import Carousel, { Pagination } from 'react-native-snap-carousel'
import I18n from 'react-native-i18n'

import {CustomModal, CustomLoading} from 'frontend/Components'
import {CoreLayout} from 'frontend/Container'
import {formatNumber} from 'common/GlobalFuntions'
import {COLOR} from 'common/GlobalConstants'
import Tabbar from './Component/Tabbar'

import History from './SubView/History'
import Receive from './SubView/Receive'
import Send from './SubView/Send'

import ConfirmSend from './SubView/Send/ConfirmSend'
import HistoryInfo from './SubView/History/HistoryInfo'
import LinearGradient from 'react-native-linear-gradient'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const icEthereum = <MaterialCommunityIcons name={'ethereum'} size={width(25)} color={'#F0F0F0'}/>
const icBitcoin = <FontAwesome name={'bitcoin'} size={width(25)} color={'#F0F0F0'}/>

const _renderItem = ({item, index}) => {
  const dataMoney = Number(item.total_amount || item.address_amount) * Number(item.coin_price || 0)

  return (
    <LinearGradient start={{x: 0, y: 0}} end={{x: 0.75, y: 0}} colors={['#299DFE', '#45C3FC']} style={styles.contTotalBalance} >
      <View style={styles.icBitcoin}>
        {
          index === 0
            ? icBitcoin
            : icEthereum
        }
      </View>
      <Text style={styles.txtAmount}>
        {
          (formatNumber((item.address_amount || item.total_amount), false) === 'NaN'
            ? 0.00
            : formatNumber((item.address_amount || item.total_amount), false)) +
                  ' ' + (item.coin_symbol || item.token_symbol)
        }</Text>
      <Text style={styles.txtMoney}>
        {
          (formatNumber(dataMoney) === 'NaN'
            ? 0.00
            : formatNumber(dataMoney)
          ) +
                  ' ' + (item.to_currency_symbol || 'USD')
        } </Text>
      <View style={styles.contIconNameCoin}>
        <Image
          style={styles.img}
          resizeMode={'cover'}
          source={{
            uri: item.coin_image_url || item.token_photo
          }}/>
        <Text style={styles.txtNameCoin}>{item.coin_name || item.token_name}</Text>
      </View>
    </LinearGradient>
  )
}

class view extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      item: props.item,
      QrCodeValue: '',
      strAmount: '',
      strMoney: '',

      // send
      strAmountSend: '',
      strAddress: props.qrCodeData || '',
      strMoneySend: '',
      isErrorAddress: false,
      isErrorAmount: false,

      // history
      dataTxs: [],
      dataTxsReceive: null,
      dataTxsSent: null,
      // isLoadingHistory: false,
      itemHistoryInfo: null,

      isOpenModalHistory: false,
      isOpenModalSend: false,
      isOpenModalCopy: false,

      firstIndex: Number(props.item.id) || 0,
      isSend: 0,

      modalMessage: ''
    }
    props.funcDefaultThis(this)
  }

  componentDidMount () {
    this.props.loadingInitData()
  }

  render () {
    const {
      handleBackRoute,
      handleQrCodeScreen,
      onChangeAmount, onChangeMoney, walletData, data, handleSnapToItem,
      // send
      pinCodeData,
      _openModal, _closeModal, handleSend,
      onChangeAddressSend, onChangeMoneySend, onChangeAmountSend,
      onExcuteSendCoin, onFocusSend, onEndEditAmountSend, onEndEditMoneySend,
      // onFocusAmountSend,
      // receive
      onEndEditMoneyReceive, onEndEditAmountReceive, onFocusReceive,

      // history trsanction
      handleSelectTxs, loadingInitData, onSent, onReceived,

      // modal history info
      _openModalHistoryInfo, _closeModalHistoryInfo, handleReceived, handleSent, handleTxsAll, onCopyClipboard
    } = this.props
    const {
      item, strAmount, strMoney, isOpenModalHistory, firstIndex, isSend,
      // send
      strAddress, strAmountSend, strMoneySend, isErrorAddress, isErrorAmount, txtErrorAmount,

      // modal history info
      itemHistoryInfo, isLoadingHistory, dataTxs, dataTxsReceive, dataTxsSent
    } = this.state
    return (
      <CoreLayout title={I18n.t('coin_detail_screen_title')} leftAction ={handleBackRoute}>
        <View style={styles.container}>
          <View pointerEvents={isLoadingHistory ? 'none' : 'box-none'} style={styles.contLogo}>
            <Carousel
              ref={(c) => { this._carousel = c }}
              data={data}
              firstItem={firstIndex}
              onSnapToItem={(idx) => handleSnapToItem(idx)}
              renderItem={_renderItem}
              sliderWidth={width(85)}
              itemWidth={width(85)}
            />
            <Pagination
              dotsLength={data.length}
              activeDotIndex={firstIndex}
              containerStyle={styles.contPagination}
              dotColor={COLOR.BUTTON}
              dotStyle={styles.paginationDot}
              inactiveDotColor={'#C3C3C3'}
              inactiveDotOpacity={0.4}
              inactiveDotScale={0.6}
            />
          </View>
          <View style={styles.contBottom}>
            <ScrollableTabView
              locked={true}
              initialPage={1}
              scrollWithoutAnimation={false}
              renderTabBar={() => { return <Tabbar/> }}
              tabBarPosition={'bottom'}
            >
              <Send
                tabLabel={I18n.t('coin_detail_screen_menu_button_send')}
                item={item}

                handleSend={handleSend}
                handleQrCodeScreen={handleQrCodeScreen}

                strAddress={strAddress}
                strAmountSend={strAmountSend}
                strMoneySend={strMoneySend}
                txtErrorAmount={txtErrorAmount}

                isErrorAddress={isErrorAddress}
                isErrorAmount={isErrorAmount}

                _openModal={_openModal}
                _closeModal={_closeModal}

                qrCodeData={this.props.qrCodeData}
                pinCodeData={pinCodeData}

                onChangeAmountSend={onChangeAmountSend}
                onChangeMoneySend={onChangeMoneySend}
                onFocusSend={onFocusSend}
                onEndEditAmountSend={onEndEditAmountSend}
                onEndEditMoneySend={onEndEditMoneySend}
                onChangeAddressSend={onChangeAddressSend}
              />
              <History
                tabLabel={I18n.t('coin_detail_screen_label_historical')}
                itemSymbol={item.coin_symbol || 'ETH'}

                isSend={isSend}
                isLoadingHistory={isLoadingHistory}

                _openModal={_openModalHistoryInfo}
                _closeModal={_closeModalHistoryInfo}

                handleSelectTxs={handleSelectTxs}
                dataTxs={dataTxsReceive || dataTxsSent || dataTxs}
                handleReceived={handleReceived}
                handleSent={handleSent}

                onSent ={onSent}
                onReceived={onReceived}
                handleTxsAll={handleTxsAll}

                loadingInitData={loadingInitData}
              />
              <Receive
                tabLabel={I18n.t('coin_detail_screen_menu_button_receive')}
                item={item}
                address={item.token_contract_address ? walletData.ethInfo.address : ''}
                strAmount={strAmount}
                strMoney ={strMoney}

                onFocusReceive={onFocusReceive}
                onEndEditMoneyReceive={onEndEditMoneyReceive}
                onEndEditAmountReceive={onEndEditAmountReceive}
                onCopyClipboard={onCopyClipboard}
                onChangeAmount={onChangeAmount}
                onChangeMoney={onChangeMoney}
              />
            </ScrollableTabView>
          </View>
        </View>
        <CustomModal ref={refs => (this.modalSend = refs)} style={styles.modal} >
          <ConfirmSend
            item={item}
            _closeModal={_closeModal}
            strMoneySend={strMoneySend}
            strAmountSend={strAmountSend}
            strAddress={strAddress}
            onExcuteSendCoin={onExcuteSendCoin}
          />
        </CustomModal>
        <CustomModal ref={refs => (this.modalHistoryInfo = refs)} style={styles.modalHistory} isShowModal={isOpenModalHistory}>
          <HistoryInfo
            item={itemHistoryInfo}
            itemSymbol={item.coin_symbol || 'ETH'}
            _closeModal={_closeModalHistoryInfo}
          />
        </CustomModal>
        <CustomModal ref={refs => (this.modalCopy = refs)}
          style={styles.modalAlert} isError={false}
          message={this.state.modalMessage}
          onPress={() => this.modalCopy._hideModal()}/>
        <CustomLoading style={styles.modalLoading} isProcess={isLoadingHistory}/>
      </CoreLayout>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: height(Platform.OS === 'ios' ? 87 : 86),
    width: width(100)
  },
  contLogo: {
    flex: 2.5,
    width: width(100),
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: width(2),
    paddingVertical: height(Platform.OS === 'ios' ? 1 : 1.5),
    backgroundColor: 'transparent'
  },
  contBottom: {
    flex: 7.5,
    width: width(100),
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  contTotalBalance: {
    width: width(85),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    shadowOffset: { width: 0, height: 3 },
    shadowColor: '#c3c3c3',
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 3,
    paddingVertical: height(1)
  },
  contPagination: {
    backgroundColor: 'transparent',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: width(20),
    position: 'absolute',
    top: height(Platform.OS === 'ios' ? 15 : 16)
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
  },
  txtAmount: {
    fontSize: width(6.5),
    color: '#ffffff',
    fontWeight: 'bold'
  },
  txtMoney: {
    fontSize: width(3.5),
    color: '#ffffff',
    marginTop: height(1),
    marginBottom: height(2)
  },
  txtNameCoin: {
    fontSize: width(4),
    color: '#ffffff',
    fontWeight: 'bold'
  },
  contIconNameCoin: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  img: {
    width: width(8),
    height: width(8),
    marginHorizontal: width(1)
  },
  modal: {
    top: height(15),
    height: height(40),
    width: width(90),
    backgroundColor: '#ffffff',
    borderRadius: 5
  },
  modalHistory: {
    top: height(10),
    flex: 1,
    height: height(50),
    width: width(90)
  },
  modalLoading: {
    top: height(40)
  },
  modalAlert: {
    top: height(15)
  }
})
export default view
