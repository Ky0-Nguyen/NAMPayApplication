import React from 'react'
import {View, StyleSheet, AppState} from 'react-native'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import { EventRegister } from 'react-native-event-listeners'
import I18n from 'react-native-i18n'
import {width, height} from 'react-native-dimension'
// import {Actions} from 'react-native-router-flux'

import Home from './SubView/Home'
// import Payment from './SubView/Payment'
// import Chat from './SubView/Chat'
import More from './SubView/More'
import Tabbar from './Component/Tabbar'

import CustomAlert from './Component/Alert'
import {CustomModal, CustomLoading} from 'frontend/Components'
import {InternetAlert} from 'frontend/Components/CustomAlert'

class view extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      // home screen
      refreshing: false,
      coinList: [],
      isLoadingHome: false,
      tokenList: [],
      tokenListOfUser: [],
      totalMoney: 0,

      // more screen
      isEditPhone: false,
      txtPhone: '(+ 01) 976845321',

      // subview
      htmlViewHelp: null,
      htmlViewAbout: null,
      isLoadingHelp: true,
      isLoadingAbout: true,

      isOpenLogOut: false,
      appState: AppState.currentState
    }
    props.funcDefaultThis(this)
  }

  componentDidMount () {
    this.props.loadingInittialData()
    this.funcReLoadUI = EventRegister.addEventListener('funcReLoadUI', () => {
      this.setState({})
      console.log('funcReLoadUI')
    })
  }

  showAlert (mesage, isError) {
    this.refs.viewAlert.alertWithType(mesage, isError)
  }
  render () {
    const {
      appConfigData, handleRefreshData, userInfoData,
      funcDone, funcOnChangeTextPhone, funcChangeStatusButton,
      handleSelectDropdown, handleWalletInfo, handleAddToken,

      listLanguageData,
      // More
      handleSecurity, handleShowPassphrase, handleLogout, handleSettingLanguage, localeData,

      // modal confirm
      _closeModalConfirm, _openModalConfirm,

      //
      isDisableInternetAlert = false
    } = this.props
    const {
      refreshing,
      isEditPhone, txtPhone,
      // dataCountry, selectedCountry,
      coinList,
      isLoadingHome,
      tokenList,
      tokenListOfUser,
      totalMoney
    } = this.state

    return (
      <View style={styles.container}>
        <ScrollableTabView
          locked={true}
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps={'never'}
          scrollWithoutAnimation={true}
          renderTabBar={() => { return <Tabbar/> }}
          tabBarPosition={'bottom'}>
          <Home
            tabLabel={I18n.t('common_menu_button_home')}
            coinList={coinList}
            tokenList={tokenList}
            tokenListOfUser={tokenListOfUser}
            handleWalletInfo={handleWalletInfo}
            refreshing={refreshing}
            totalMoney={totalMoney}
            title={appConfigData.app_title}
            handleRefreshData={handleRefreshData}
            handleAddToken={handleAddToken}
          />
          <More
            tabLabel={I18n.t('common_menu_button_setting')}

            txtPhone={txtPhone}
            title={appConfigData.app_title}

            listLanguageData={listLanguageData}
            localeData={localeData}
            userInfoData={userInfoData}

            handleSettingLanguage={handleSettingLanguage}
            handleSelectDropdown={handleSelectDropdown}
            handleSecurity={handleSecurity}
            handleShowPassphrase={handleShowPassphrase}
            handleLogout={handleLogout}

            funcDone={funcDone}
            funcChangeStatusButton={funcChangeStatusButton}
            funcOnChangeTextPhone={funcOnChangeTextPhone}

            isEditPhone={isEditPhone}

            _openModalConfirm={_openModalConfirm}
            _closeModalConfirm={_closeModalConfirm}
          />
        </ScrollableTabView>
        {!isDisableInternetAlert && <InternetAlert/>}

        <CustomModal ref={refs => (this.modalLogout = refs)} style={styles.modal} >
          <CustomAlert
            _closeModal={_closeModalConfirm}
            handleLogout={handleLogout}
          />
        </CustomModal>
        <CustomLoading style={styles.modal} isProcess={isLoadingHome}/>
      </View>

    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: height(100),
    width: width(100)
  },
  modal: {
    top: height(35),
    backgroundColor: 'transparent'
  }
})
export default view
