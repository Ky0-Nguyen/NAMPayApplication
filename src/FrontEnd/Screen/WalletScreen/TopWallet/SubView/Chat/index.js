import React, { Component } from 'react'
import { View, Text, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native'
// import Dialogflow from 'react-native-dialogflow'
// core
import {CoreLayoutTabbar} from 'frontend/Container'
import styles from './styles'
// create a component
class MyClass extends Component {
  constructor (props) {
    super(props)
    this.state = {
      txtInput: '',
      txtUser: ''
    }
    // Dialogflow.setConfiguration(
    //   '2b8d54269fa64d229e598dca3af35f71', Dialogflow.LANG_ENGLISH
    // )
  }
  render () {
    // const { txtInput } = this.state
    const { title } = this.props
    return (
      <CoreLayoutTabbar title={title} headerStyle={styles.headerStyle} titleColor={'#ffffff'}>
        <View style={styles.container}>
          <View style={styles.body}>
            <Text>{this.state.txtUser}</Text>
          </View>
          <KeyboardAvoidingView behavior="padding" enabled style={styles.footer}>
            <TextInput style={styles.inp} onChangeText={text => this.setState({ txtInput: text })} autoFocus={true}/>
            <TouchableOpacity style={styles.btnSend} onPress={() => {
              console.log('tuan')
              // Dialogflow.requestQuery(txtInput, result => this.setState({ txtUser: result.result.fulfillment.speech }), error => console.log(error))
            }}>
              <Text style={styles.txtButton}>{I18n.t('coin_detail_screen_button_send')}</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </View>
      </CoreLayoutTabbar>
    )
  }
}

// make this component available to the app
export default MyClass
