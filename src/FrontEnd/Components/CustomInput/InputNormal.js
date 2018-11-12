import React from 'react'
import { Animated, Text, TextInput,
  TouchableWithoutFeedback, View, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
// Base Components
import BaseInput from './BaseInput'
import baseStyles from './BaseStyles'
import { width } from 'react-native-dimension'

class InputNormal extends BaseInput {
  // Render Label View
  renderLabel (isRight) {
    const {txtLabel, btnViewRender, renderRight, value} = this.props
    const {focusedAnim} = this.state
    return (
      txtLabel
        ? <View style={[styles.textLabelStyle, {width: width(10)}]}>
          <Text>{txtLabel}</Text>
        </View>
        : <Animated.View style={[styles.textLabelStyle, {
          transform: [{
            translateX: focusedAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [!value ? -width(10) : width(2), width(2)]
            })
          }],
          width: width(10)}]}>
          {isRight
            ? renderRight
            : btnViewRender
          }

        </Animated.View>

    )
  }

  // Render PlaceHolder View
  get renderPlaceHolder () {
    const { txtHolder, placeHolderStyle, placeHolderTextStyle } = this.props
    const { valueActive } = this.state
    return (
      <TouchableWithoutFeedback onPress={this.focus}>
        <Animated.View style={[placeHolderStyle || styles.placeHolderStyle, {
          opacity: valueActive.interpolate({
            inputRange: [0, 1],
            outputRange: [!this.props.value && 1, this.props.value && 0]
          })
        }]}>
          <Text style={[styles.txtPlaceHolder, placeHolderTextStyle]}>{txtHolder}</Text>
        </Animated.View>
      </TouchableWithoutFeedback>
    )
  }

  render () {
    const {containerStyle, value, inputStyle, underlineColorAndroid,
      renderRight, btnViewRender} = this.props
    const { focusedAnim } = this.state
    return (
      <View>
        <Animated.View style={[styles.container, containerStyle, {
          borderColor: focusedAnim.interpolate({
            inputRange: [0, 1],
            outputRange: ['#797b86', 'white']
          })
        }]} onLayout={this._onLayout}>
          {this.renderPlaceHolder}
          {btnViewRender && this.renderLabel(false)}
          <TextInput
            {...this.props}
            ref='inputNormal'
            style={[ styles.textInput, inputStyle ]}
            value={value}
            onBlur={this._onBlur}
            onFocus={this._onFocus}
            onChange={this._onChange}
            underlineColorAndroid={underlineColorAndroid || 'transparent'}
          />
          {renderRight && this.renderLabel(true)}
        </Animated.View>

      </View>
    )
  }
}
var inputNormalStyles = StyleSheet.create({
  placeHolderStyle: {
    alignSelf: 'center',
    justifyContent: 'center',
    position: 'absolute',
    flexDirection: 'row',
    width: width(90)
  }
})

var styles = Object.assign(baseStyles, inputNormalStyles)

InputNormal.propTypes = {
  txtLabel: PropTypes.string,
  value: PropTypes.string
}
InputNormal.defaultProps = {
  txtLabel: '',
  value: '',
  btnViewRender: null,
  renderRight: null
}
export default InputNormal
