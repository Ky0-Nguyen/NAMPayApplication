import React from 'react'
import {View,
  Platform, FlatList,
  TouchableOpacity, Image, Text, StyleSheet} from 'react-native'

import {logoNoText} from 'assets/Images'
import {CoreLayout} from 'frontend/Container'
import {COLOR} from 'common/GlobalConstants'

import * as Animatable from 'react-native-animatable'
import I18n from 'react-native-i18n'
import LinearGradient from 'react-native-linear-gradient'
import {width, height} from 'react-native-dimension'

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

export default class view extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      txtChoice: []
    }
    props.funcDefaultThis(this)
  }

  funcClose =() => this.setState({ isShowModal: false })
  _renderItem = ({item}) => {
    let choiced = this.state.txtChoice.includes(item)
    return (
      <TouchableOpacity disabled={choiced} onPress={() => {
        let txtChoice = this.state.txtChoice
        txtChoice.push(item)
        this.setState({ txtChoice })
      }}>
        {
          choiced
            ? <View style={styles.contItem}>
              <Text style={styles.txtItem}>{item}</Text>
            </View>
            : <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0.5}} colors={['#299DFE', '#45C3FC']} style={styles.contItem} >
              <Text style={styles.txtItem}>{item}</Text>
            </LinearGradient>
        }
      </TouchableOpacity>

    )
  }
  _renderItemChoiced = ({item}) => {
    return (
      <TouchableOpacity onPress={() => {
        let txtChoice = this.state.txtChoice
        let arr = txtChoice.filter(items => items !== item)
        console.log(arr)
        this.setState({ txtChoice: arr })
      }}>
        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0.5}} colors={['#299DFE', '#45C3FC']} style={styles.contItem} >
          <Text style={styles.txtItem}>{item}</Text>
        </LinearGradient>
      </TouchableOpacity>

    )
  }
  render () {
    const {
      handleBackRoute, walletData, handleSubmit
    } = this.props
    const {
      txtChoice
    } = this.state
    return (
      <CoreLayout title={I18n.t('common_button_restore_wallet')} leftAction={handleBackRoute} >
        <View style={styles.container}>
          {/* background top view */}
          <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0.5}} colors={['#299DFE', '#45C3FC']} style={styles.contTopBackground} />

          {/* Interface  */}
          <View style={styles.contTop}>
            <Image source={logoNoText} style={styles.img} resizeMode={'contain'}/>
            <Text style={styles.txtTitle}>{I18n.t('create_wallet_screen_tip_9')}</Text>
          </View>

          <View style={styles.contBottom} >
            <View style={styles.contInput}>
              <FlatList
                keyExtractor={index => index}
                extraData={this.state}
                data={walletData.mnemonic.split(' ').sort()}
                renderItem={this._renderItem}
                numColumns={4}
                columnWrapperStyle={styles.columnWrapperStyle}
              />
            </View>
            <View style={styles.contChoice}>
              <FlatList
                keyExtractor={index => index}
                extraData={this.state}
                data={txtChoice}
                renderItem={this._renderItemChoiced}
                numColumns={4}
                columnWrapperStyle={styles.columnWrapperStyle}
              />
            </View>
          </View>

          <View style={styles.contButton} >
            <TouchableOpacity onPress={handleSubmit} style={styles.btn}>
              <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0.5}} colors={['#299DFE', '#45C3FC']} style={styles.btnLinearGradient} >
                <Text style={styles.txtSignUp}>{I18n.t('common_button_confirmation')}</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </CoreLayout>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: height(Platform.OS === 'ios' ? 92 : 90),
    width: width(100),
    backgroundColor: '#FFFFFF'
  },
  contTopBackground: {
    backgroundColor: COLOR.BUTTON,
    position: 'absolute',
    zIndex: -1000,
    height: height(35),
    width: width(100)
  },
  contTop: {
    flex: 2.5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  contBottom: {
    flex: 4.5,
    backgroundColor: 'transparent',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  contButton: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  contInput: {
    width: width(80),
    borderRadius: 8,
    paddingVertical: height(1),
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 2
  },
  img: {
    width: width(30),
    height: width(30)
  },
  txtSignUp: {
    color: '#FFFFFF',
    fontSize: width(6)
  },
  contItem: {
    padding: width(1),
    backgroundColor: '#F0F0F0',
    margin: width(1),
    borderRadius: width(3)
  },
  columnWrapperStyle: {
    justifyContent: 'center'
  },
  txtItem: {
    fontSize: width(4.5),
    color: '#FFFFFF'
  },
  btn: {
    borderRadius: height(4),
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5
  },
  btnLinearGradient: {
    width: width(70),
    height: height(8),
    borderRadius: height(4),
    justifyContent: 'center',
    alignItems: 'center'
  },
  txtTitle: {
    width: width(90), alignSelf: 'center', textAlign: 'center'
  },
  contChoice: {
    paddingVertical: height(1),
    paddingHorizontal: width(2),
    width: width(80),
    borderRadius: 8,
    borderStyle: 'dotted',
    borderWidth: 2,
    borderColor: '#111111',
    top: height(2)
  }
})
