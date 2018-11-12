import React from 'react'
import {View, ScrollView, TextInput,
  // Platform,
  TouchableOpacity, Image, Text, StyleSheet} from 'react-native'

import {logoNoText} from 'assets/Images'
import {CoreLayout} from 'frontend/Container'
import {STYLE, COLOR} from 'common/GlobalConstants'

import * as Animatable from 'react-native-animatable'
import I18n from 'react-native-i18n'
import LinearGradient from 'react-native-linear-gradient'
import {width, height} from 'react-native-dimension'

import CustomLoading from 'frontend/Components/CustomLoading'
import CustomModal from 'frontend/Components/CustomModal'
import ViewModal from './viewModal'

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
      strMnemonic: '',
      isMnemonicError: false,
      txtErrorPassword: '',

      isProcess: false,
      isShowModal: false

    }
    props.funcDefaultThis(this)
  }

  funcClose =() => this.setState({ isShowModal: false })
  _renderItem = ({item}) => {
    return (
      <Text style={styles.txtItem}>{item}</Text>
    )
  }
  render () {
    const {
      onChangeTextMnemonic, handleSubmit, handleBackRoute, Mnemonic, parentView, funcSkipToStep
    } = this.props
    console.log('Mnemonic', Mnemonic)
    const {
      strMnemonic,
      // isMnemonicError,
      // txtErrorPassword,
      isProcess,
      isShowModal
    } = this.state
    return (
      <CoreLayout title={I18n.t('common_button_restore_wallet')} leftAction={handleBackRoute} >
        <ScrollView keyboardShouldPersistTaps={'handled'} scrollEnabled={false} ref={'scrRegister'} >
          <View pointerEvents={isProcess ? 'none' : 'box-none'} style={styles.container}>
            {/* background top view */}
            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0.5}} colors={['#299DFE', '#45C3FC']} style={styles.contTopBackground} />

            {/* Interface  */}
            <View style={styles.contTop}>
              <Image source={logoNoText} style={styles.img} resizeMode={'contain'}/>
            </View>

            <View style={styles.contBottom}>
              <View style={styles.contInput}>
                {/* Text input Email */}
                <TextInput
                  multiline = {true}
                  numberOfLines = {6}
                  value={strMnemonic}
                  autoCapitalize={'none'}
                  onChangeText={onChangeTextMnemonic}
                  placeholder={I18n.t('restore_screen_input_mnemonic')}
                  style={styles.inp}
                  underlineColorAndroid={'transparent'}/>
              </View>
              {/* {isMnemonicError && <Animatable.Text animation="AnimError" style={styles.txtError}>{txtErrorPassword}</Animatable.Text>} */}
              {
                parentView === 'create' &&
                <View style={styles.contSub}>
                  <TouchableOpacity style={styles.btnSkip} onPress={funcSkipToStep}>
                    <Text style={styles.txtButtonSkip}>{I18n.t('common_button_skip')}</Text>
                  </TouchableOpacity>
                </View>

              }
            </View>

            <View style={styles.contButton}
              pointerEvents={
                isProcess ? 'none' : 'box-none'
              }>
              <TouchableOpacity onPress={ (strMnemonic.length > 0) ? handleSubmit : console.log('nofunction')} style={styles.btn}>
                {
                  (strMnemonic.length > 0)
                    ? <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0.5}} colors={['#299DFE', '#45C3FC']} style={styles.btnLinearGradient} >
                      <Text style={styles.txtSignUp}>{I18n.t('common_button_confirmation')}</Text>
                    </LinearGradient>
                    : <View style={[styles.btnLinearGradient, STYLE.BUTTON_DISABLE]}>
                      <Text style={styles.txtSignUp}>{I18n.t('common_button_confirmation')}</Text>
                    </View>
                }
              </TouchableOpacity>

            </View>
          </View>
        </ScrollView>
        <CustomModal isShowModal={isShowModal} style={styles.modal}>
          <ViewModal funcClose={this.funcClose}/>
        </CustomModal>
        <CustomLoading isProcess={isProcess}/>
      </CoreLayout>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: height(90),
    width: width(100),
    backgroundColor: '#FFFFFF'
  },
  contTopBackground: {
    backgroundColor: COLOR.BUTTON,
    position: 'absolute',
    zIndex: -1000,
    height: height(40),
    width: width(100)
  },
  contTop: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center'
  },
  contBottom: {
    flex: 5,
    backgroundColor: 'transparent',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  contButton: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnSkip: {

  },
  contSub: {
    marginTop: height(1),
    paddingVertical: height(1),
    width: width(80),
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  contInput: {
    width: width(80),
    borderRadius: 8,
    justifyContent: 'flex-start',
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
  txtItem: {
    margin: width(1),
    backgroundColor: '#F0F0F0'
  },
  inp: {
    marginHorizontal: width(5),
    paddingHorizontal: width(3),
    width: width(80),
    height: height(25),
    fontSize: width(4),
    borderColor: '#0065B8',
    alignSelf: 'center',
    borderRadius: 10
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
  // txtError: {
  //   color: 'red',
  //   fontSize: width(Platform.OS === 'ios' ? 3.5 : 3),
  //   marginHorizontal: width(10)
  // },
  modal: {
    top: height(15),
    backgroundColor: 'transparent'
  },
  txtButtonSkip: {
    textDecorationLine: 'underline'
  }
})
