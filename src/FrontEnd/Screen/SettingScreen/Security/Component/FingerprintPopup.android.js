import React, { Component } from 'react'
import {
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import FingerprintScanner from 'react-native-fingerprint-scanner'
import { width } from 'react-native-dimension'
import styles from './styles'
import {COLOR} from 'common/GlobalConstants'
import I18n from 'react-native-i18n'
import Ionicons from 'react-native-vector-icons/Ionicons'

class FingerprintPopup extends Component {
  constructor (props) {
    super(props)
    this.state = { errorMessage: undefined }
  }

  componentDidMount () {
    FingerprintScanner
      .authenticate({ onAttempt: this.handleAuthenticationAttempted })
      .then(() => {
        this.props.handlePopupDismissed()
        this.props.actionRouter()
      })
      .catch((error) => {
        this.props.funcShowAlert(error)
        this.props.funcClosePopup()
      })
  }

  handleAuthenticationAttempted = (error) => {
    this.props.funcShowAlert(error.message)
    this.props.funcClosePopup()
  };

  render () {
    // const { errorMessage } = this.state
    const { style, handlePopupDismissed } = this.props
    const customFontSize = { fontSize: width(4) }
    return (
      <View style={styles.container}>
        <View style={styles.subContainer}/>
        <View style={[styles.contentContainer, style]}>
          {/* finger_print.png */}
          <View style={styles.viewLogo}>
            <Ionicons name={'ios-finger-print'} size={width(8)} color={COLOR.BUTTON}/>
          </View>
          <View style={styles.viewTxt}>
            <Text style={styles.heading}>{`Touch ID for “NAM Pay”`}</Text>
            <Text style={[ styles.txtContent, customFontSize ]}>{`Unlock NAM Pay with your fingerprint`}</Text>
          </View>
          <View style={styles.viewBtn}>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={handlePopupDismissed}
            >
              <Text style={styles.buttonText}>{I18n.t('common_button_cancel')}</Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>
    )
  }
}

export default FingerprintPopup
