import React from 'react'
import {View, Image, FlatList, TouchableHighlight, StyleSheet,
  TouchableOpacity, Text} from 'react-native'

import {width, height} from 'react-native-dimension'

import { CoreLayoutNoHeader } from 'frontend/Container'

import {STYLE, COLOR, APPFONT} from 'common/GlobalConstants'

import {logoNoText} from 'assets/Images'

import Ionicons from 'react-native-vector-icons/Ionicons'
import Spinner from 'react-native-spinkit'
import LinearGradient from 'react-native-linear-gradient'
import { EventRegister } from 'react-native-event-listeners'
import I18n from 'react-native-i18n'

const _keyExtractor = (item) => item.lang_id.toString()

class view extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      selected: 0,
      isLoading: true,
      data: []
    }
    props.funcDefaultThis(this)
  }
  componentDidMount () {
    this.props.funcInitialData()
    EventRegister.addEventListener('reloadLanguage', () => {
      console.log('reloadLanguage')
      this.props.funcInitialData()
    })
  }
  _renderItem = ({item, index}) => {
    const styleCont = [styles.contItem, {
      borderBottomWidth: index === this.props.listLanguageData.length - 1 ? 0 : 0.5
    }]
    let styleTxtImg = [styles.txtImage, { fontFamily: (index === 0 || index === 2) ? APPFONT.QUICKSAND : APPFONT.OSAKA }]
    return (
      <TouchableHighlight hitSlop={{top: 20, bottom: 20, right: 20, left: 20}} underlayColor={'transparent'} onPress={this.props.handleSelectLanguage(index)}>

        <View style={styleCont}>
          <View style={styles.contItem1}>
            <Image
              style={styles.img}
              source={{
                uri: item.lang_flag_photo
              }}
              resizeMode={'cover'}
            />
            <Text style={styleTxtImg}>{item.lang_name}</Text>
          </View>
          {
            this.state.selected === index
              ? <Ionicons name={'ios-checkmark-circle'} size={width(10)} color={COLOR.BUTTON}/>
              : <Ionicons name={'ios-radio-button-off'} size={width(10)} color={'#c3c3c3'}/>
          }
        </View>
      </TouchableHighlight>
    )
  }
  render () {
    const { handlePrivacyPolicy } = this.props
    const { isLoading, data } = this.state

    return (
      <CoreLayoutNoHeader ref={'scrLanguage'}>
        <LinearGradient colors={['#299DFE', '#3CB8FD', '#45C3FC']} style={styles.linearGradient}>
          <View style={styles.container}>
            <View style={styles.containerTitle}>
              <Image source={logoNoText} style={styles.imgLogo} resizeMode={'cover'}/>
              <Text style={styles.txtTitle}>{I18n.t('languages_screen_description')}</Text>
            </View>
            <View style={styles.containerSelect}>
              {
                isLoading
                  ? <Spinner isVisible={isLoading} size={width(8)} type={'Circle'} color={'#111111'}/>
                  : <FlatList
                    keyExtractor={_keyExtractor}
                    data={data}
                    renderItem={this._renderItem}
                    extraData={this.state}
                  />
              }
            </View>
            <View style={styles.containerButton}>
              <TouchableOpacity style={STYLE.BUTTON} onPress={handlePrivacyPolicy}>
                <Text style={styles.txtButtonNext}>{I18n.t('common_button_confirmation')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      </CoreLayoutNoHeader>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    height: height(100),
    width: width(100)
  },
  containerTitle: {
    height: height(35),
    width: width(100),
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'transparent',
    paddingVertical: height(5)
  },
  containerSelect: {
    width: width(80),
    height: height(40),
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 3,
    paddingVertical: height(3)
  },
  containerButton: {
    height: height(20),
    width: width(100),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  contItem: {
    flexDirection: 'row',
    height: height(10),
    width: width(70),
    borderRadius: 5,
    borderBottomColor: '#c3c3c3',
    borderBottomWidth: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center'
  },
  contItem1: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  img: {
    width: width(17),
    height: height(8),
    borderRadius: 10
  },
  imgLogo: {
    width: width(30),
    height: width(30)
  },
  txtImage: {
    color: '#111111',
    marginLeft: width(3),
    fontSize: width(5)
  },
  txtTitle: {
    fontSize: width(6),
    color: '#FFFFFF'
  },
  txtButtonNext: {
    color: COLOR.BUTTON,
    fontSize: width(6),
    fontFamily: APPFONT.BOLD
  },
  linearGradient: {
    flex: 1
  }
})
export default view
