import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'

import { width, height } from 'react-native-dimension'

import styles from './styles'

import {icError, icSuccess} from 'assets/Images'

import I18n from 'react-native-i18n'
import * as Animatable from 'react-native-animatable'

Animatable.initializeRegistryWithDefinitions({
  animAlertActive: {
    from: {
      opacity: 0
    },
    to: {
      opacity: 1
    }
  },
  animAlertDeactive: {
    from: {
      opacity: 1
    },
    to: {
      opacity: 0
    }
  }
})

export default class CustomerAlert extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      type: false,
      message: '',
      isOpen: false
    }
  }
  deActiveAlert = () => {
    this.setState({ isOpen: false })
    this.refs.viewAlert.animAlertDeactive(800)
  }
  alertWithType (message, type) {
    if (typeof message !== 'string') {
      message = message.toString()
    }
    this.setState({ type, message, isOpen: true })
  }
  renderAndroidImage (type) {
    return (
      <View style={{ width: width(13) }}>
        <Image style={{ width: width(12.5), height: height(7) }} resizeMode='contain'
          {...(type
            ? {
              source: icError
            }
            : { source: icSuccess }
          ) } />
      </View>
    )
  }

  renderAndroidText (text, style, numberOfLines) {
    if (text != null) {
      if (text.length > 0) {
        return (
          <View style={styles.contAndroidText}>
            <Text style={ style} numberOfLines={numberOfLines}>{text}</Text>
          </View>
        )
      }
    }
    return null
  }

  // |------------------------------|
  // |--- RENDER MAIN VIEW START ---|
  // |------------------------------|
  render () {
    const { isOpen, type, message } = this.state
    const { style } = this.props
    var messageLength = (message.length * width(7))
    if (messageLength >= width(77)) {
      messageLength = width(90)
    }
    const styleContMess = {
      marginTop: height(1),
      paddingVertical: height(3),
      width: message.length * width(3) >= width(77) ? width(77) : width(65)
    }
    return (
      isOpen
        ? <View style={[styles.viewContainer, style]}>
          <View style={styles.backDropContainer} />
          <Animatable.View
            ref={'viewAlert'}
            animation={'animAlertActive'}
            style={styles.contAlertActive}>
            {
              <View style={[styles.defaultContainer, { }]}>
                <View style={{ width: width(13) }}>
                  <Image style={{ width: height(7), height: height(7) }} resizeMode='cover'
                    {...(type
                      ? {
                        source: icError
                      }
                      : { source: icSuccess }
                    ) } />
                </View>
                <View style={styleContMess}>
                  <Text style={styles.messageStyle}>{this.state.message}</Text>
                </View>
                <View style={styles.contButton}>
                  <TouchableOpacity onPress={this.deActiveAlert} style={styles.btn}>
                    <Text style={styles.txtButton}>{I18n.t('common_button_cancel')}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            }
          </Animatable.View>
        </View> : null
    )
  }
}
