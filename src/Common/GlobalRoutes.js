import React from 'react'
import { Actions, Scene } from 'react-native-router-flux'

import SplashScreen from 'frontend/Screen/SplashScreen'
import LanguageScreen from 'frontend/Screen/LanguageScreen'

// Wallet
import WalletTopScreen from 'frontend/Screen/WalletScreen/TopWallet'
import WalletPrivacyPolicy from 'frontend/Screen/WalletScreen/PrivacyPolicy'
import WalletTermOfService from 'frontend/Screen/WalletScreen/TermOfService'
import WalletRestoreWallet from 'frontend/Screen/WalletScreen/RestoreWallet'
import WalletInfo from 'frontend/Screen/WalletScreen/WalletInfo'
import QrCodeScanner from 'frontend/Screen/WalletScreen/QrCodeScanner'
import About from 'frontend/Screen/WalletScreen/About'
import Help from 'frontend/Screen/WalletScreen/Help'
import MainWallet from 'frontend/Screen/WalletScreen/Main'
import CreateWallet from 'frontend/Screen/WalletScreen/CreateWallet'
import CreateWallet2 from 'frontend/Screen/WalletScreen/CreateWallet2'
import ConfirmRestoreWallet from 'frontend/Screen/WalletScreen/ConfirmRestoreWallet'
// User
import Login from 'frontend/Screen/UserScreen/Login'
import Register from 'frontend/Screen/UserScreen/Register'

import MainUser from 'frontend/Screen/UserScreen/Main'

// Setting
import Security from 'frontend/Screen/SettingScreen/Security'
import SettingPincode from 'frontend/Screen/SettingScreen/Security/SettingPincode'
import Pincode from 'frontend/Screen/SettingScreen/Security/Pincode'
import SettingLanguage from 'frontend/Screen/SettingScreen/Language'
import ShowPassphrase from 'frontend/Screen/SettingScreen/ShowPassphrase'

// Main

const scenes = Actions.create(
  <Scene key='root' hideNavBar hideTabBar>
    <Scene key='splashScreen' component={SplashScreen} initial={true}/>
    <Scene key='languageScreen' component={LanguageScreen} panHandlers={null}/>

    {/* wallet */}
    <Scene key='walletTopScreen' component={WalletTopScreen} panHandlers={null} />
    <Scene key='about' component={About} panHandlers={null}/>
    <Scene key='help' component={Help} panHandlers={null}/>
    <Scene key='walletPrivacyPolicy' component={WalletPrivacyPolicy} panHandlers={null}/>
    <Scene key='walletTermOfService' component={WalletTermOfService} panHandlers={null}/>
    <Scene key='walletRestoreWallet' component={WalletRestoreWallet} panHandlers={null}/>
    <Scene key='walletInfo' component={WalletInfo} panHandlers={null}/>
    <Scene key='qrCodeScanner' component={QrCodeScanner} panHandlers={null}/>
    <Scene key='mainWallet' component={MainWallet} panHandlers={null}/>
    <Scene key='createWallet' component={CreateWallet} panHandlers={null}/>
    <Scene key='createWallet2' component={CreateWallet2} panHandlers={null}/>
    <Scene key='confirmRestoreWallet' component={ConfirmRestoreWallet} panHandlers={null}/>

    {/* user */}
    <Scene key='login' component={Login} panHandlers={null}/>
    <Scene key='register' component={Register} panHandlers={null}/>
    <Scene key='mainUser' component={MainUser} panHandlers={null}/>

    {/* setting */}
    <Scene key='security' component={Security} panHandlers={null}/>
    <Scene key='settingPincode' component={SettingPincode} panHandlers={null}/>
    <Scene key='pincode' component={Pincode} panHandlers={null}/>
    <Scene key='settingLanguage' component={SettingLanguage} panHandlers={null}/>
    <Scene key='showPassphrase' component={ShowPassphrase} panHandlers={null}/>

  </Scene>
)
export default scenes
