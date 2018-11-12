import React from 'react'
import {
  View, Text, Image, Platform,
  TouchableOpacity, FlatList, StyleSheet
} from 'react-native'

  // style
import {width, height} from 'react-native-dimension'

// core layout
import { CoreLayoutTabbar } from 'frontend/Container'

// icon
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import LinearGradient from 'react-native-linear-gradient'
import { COLOR } from 'common/GlobalConstants'
import I18n from 'react-native-i18n'

const colorIcon = COLOR.BUTTON
const sizeIcon = width(7)

const icLanguage = <FontAwesome name={'language'} size ={sizeIcon} color={colorIcon}/>
const icSecurity = <MaterialCommunityIcons name={'security'} size ={sizeIcon} color={colorIcon}/>
const icPassphrase = <FontAwesome name={'key'} size ={sizeIcon} color={colorIcon}/>
const icLogout = <MaterialCommunityIcons name={'logout'} size ={sizeIcon} color={colorIcon}/>

const icRight = <FontAwesome name={'angle-right'} size ={width(10)} color={'#D5D5D5'}/>

class More extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      txtSub: ''
    }
  }
  componentDidMount () {

  }

  renderItemSetting = ({item, index}) => {
    let txtSub = ''
    this.props.listLanguageData.map(item => {
      if (item.lang_locale === this.props.localeData) {
        txtSub = item.lang_name
      }
    })
    console.log('txtSub', txtSub)
    return (
      <TouchableOpacity onPress={item.func}>
        <View style={styles.contItemSetting}>
          {item.ic}
          <View style={styles.contChildItemSetting}>
            <Text style={styles.txtButtonSetting}>{item.title}</Text>
            <View style={styles.contSub}>
              {
                index === 0 && <Text style={styles.txtSub}>{txtSub}</Text>
              }
              {icRight}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
  render () {
    const { userInfoData } = this.props
    const dataSetting = [
      { key: '0', title: I18n.t('setting_screen_button_choice_languages'), ic: icLanguage, func: this.props.handleSettingLanguage },
      { key: '2', title: I18n.t('setting_screen_button_security'), ic: icSecurity, func: this.props.handleSecurity },
      { key: '3', title: I18n.t('setting_screen_button_show_mnemonic'), ic: icPassphrase, func: this.props.handleShowPassphrase },
      { key: '4', title: I18n.t('common_button_logout'), ic: icLogout, func: this.props._openModalConfirm }
    ]
    return (
      <CoreLayoutTabbar ref={refs => { this.srcMore = refs }} title={I18n.t('common_menu_button_setting')} headerStyle={styles.headerStyle} titleColor={'#ffffff'}>
        <View style={styles.container}>
          <LinearGradient start={{x: 0.2, y: 0}} end={{x: 1, y: 0}} colors={['#299DFE', '#45C3FC']} style={styles.contUser}>
            <View style={styles.contAvatar}>
              <Image
                source={{
                  uri: userInfoData.customerAvatar
                }}
                style={styles.avatar}
                resizeMode={Platform.OS === 'ios' ? 'contain' : 'cover'}
              />
            </View>

            <Text style={styles.txtEmail}>{userInfoData.email}</Text>
            <Text style={styles.txtEmail}>{I18n.t('common_label_version')}</Text>
          </LinearGradient>

          {/* setting */}
          <View style={styles.contSetting}>
            <FlatList
              data={dataSetting}
              scrollEnabled={false}
              extraData={this.props}
              renderItem={this.renderItemSetting}
            />
          </View>
        </View>
      </CoreLayoutTabbar>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  headerStyle: {
    backgroundColor: COLOR.BUTTON
  },
  contUser: {
    flex: 3,
    paddingHorizontal: width(5),
    paddingVertical: height(4),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF'
  },
  contSetting: {
    flex: 7,
    paddingVertical: height(2),
    backgroundColor: '#FFFFFF'
  },
  contItemSetting: {
    flexDirection: 'row',
    height: height(10),
    width: width(80),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  contChildItemSetting: {
    flexDirection: 'row',
    height: height(10),
    justifyContent: 'space-between',
    alignItems: 'center',
    width: width(80),
    borderBottomWidth: 1,
    borderBottomColor: '#f3f3f3',
    marginLeft: width(5)
  },
  contSub: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  txtButtonSetting: {
    fontSize: width(5.5),
    color: '#555555'
  },
  contAvatar: {
    height: width(30),
    width: width(30),
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 5
  },
  avatar: {
    height: width(30),
    width: width(30),
    borderRadius: width(15)
  },
  txtEmail: {
    fontSize: width(5),
    color: '#FFFFFF',
    top: height(1)
  },
  txtSub: {
    fontSize: width(5.5),
    color: '#c3c3c3',
    marginRight: width(3)
  }
})
export default More
