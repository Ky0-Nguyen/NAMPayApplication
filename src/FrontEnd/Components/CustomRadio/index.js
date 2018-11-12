import React, {Component} from 'react'
import {
  View,
  TouchableHighlight,
  Text, StyleSheet
} from 'react-native'
import { COLOR } from 'common/GlobalConstants'
import { width, height } from 'react-native-dimension'
const size = width(5)
const sizeChild = width(3)

export default class RadioModal extends Component {
  constructor (props) {
    super(props)
    this.state = {
      clicked: true,
      radioInit: props.radioInit,
      indexa: props.selectedValue === undefined ? '0' : props.selectedValue
    }
  }

  componentDidMount () {
    const {selectedValue} = this.props
    const indexInit = selectedValue === undefined ? '0' : selectedValue
    this.setState({
      indexa: indexInit
    })
    // this.props.onValueChange(indexInit)
  }

  click (id, item) {
    this.setState({indexa: id})
    this.props.onValueChange(id, item)
  }

  createInner (child, index, props) {
    const {
      options, textStyle,
      innerStyle, txtColor,
      noneColor, isCurrency, isSweepPrivateKey, customTextStyle } = this.props
    const {indexa} = this.state
    const disabled = props ? child[options.disabled] : child.props.disabled
    const childC = props ? child[options.value] : child.props.children
    const childContentName = props ? child[options.contentName] : child.props.textValue
    const values = props ? child[options.id] : child.props.value
    const hightlight = props ? indexa === child[options.id] : indexa === child.props.value
    // Custom style for sweep private key screen
    const balance = props ? child[options.balance] : null
    return <Raio2
      child={childC}
      index={index}
      value={values}
      key={index}
      initStyle={innerStyle}
      txtColor={txtColor}
      noneColor={noneColor}
      onclick={this.click.bind(this)}
      hightlight={hightlight}
      disabled={disabled}

      textStyle = {textStyle}
      textValue= {childContentName}
      isCurrency={isCurrency}
      // custom sweep private key screen
      customTextStyle={customTextStyle}
      isSweepPrivateKey={isSweepPrivateKey}
      balance={balance}
    />
  }
  render () {
    // const that = this
    const {style, children, dataOption} = this.props
    return (
      <View {...style}>
        {
          !dataOption && React.Children.map(children, (child, index) => this.createInner(child, index))
        }
        {
          dataOption && dataOption.map((item, index) => this.createInner(item, index, true))
        }</View>
    )
  }
}

class Raio2 extends Component {
  click (id, item) {
    if (!this.props.disabled) {
      this.props.onclick(id, item)
    }
  }

  get _renderRadioIconSelected () {
    return (
      <View style={styles.contSelected}>
        <View style={styles.contChildSelected}/>
      </View>
    )
  }

  get _renderRadioIconUnSelected () {
    return (
      <View style={styles.contUnSelected}/>
    )
  }
  render () {
    const {
      initStyle, value,
      child, textStyle,
      disabled,
      noneColor, hightlight, txtColor, customTextStyle, isSweepPrivateKey, balance
    } = this.props
    var imgUrl = hightlight
      ? this._renderRadioIconSelected
      : this._renderRadioIconUnSelected

    return (
      <TouchableHighlight
        underlayColor='transparent'
        style={[styles.btnStyle, initStyle]}
        onPress={this.click.bind(this, value, child)}>
        <View style={styles.viewBtn} >
          {disabled && !hightlight && this._renderRadioIconUnSelected}
          {disabled && hightlight && imgUrl}
          {!disabled && imgUrl}

          <Text numberOfLines={1} style={[{
            color: disabled
              ? noneColor || '#dfdfdf'
              : txtColor || '#414141'
          }, styles.txtStyle, textStyle]}> { `${child} `}</Text>
          {isSweepPrivateKey && <Text style={customTextStyle}>{balance} </Text> }

        </View>
      </TouchableHighlight>
    )
  }
}

const styles = StyleSheet.create({
  contSelected: {
    height: size,
    width: size,
    borderRadius: size / 2,
    borderColor: '#C3C3C3',
    borderWidth: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center'
  },
  contChildSelected: {
    height: sizeChild,
    width: sizeChild,
    borderRadius: sizeChild / 2,
    borderColor: '#C3C3C3',
    borderWidth: 1,
    backgroundColor: COLOR.BUTTON
  },
  contUnSelected: {
    height: size,
    width: size,
    borderRadius: size / 2,
    borderColor: '#C3C3C3',
    borderWidth: 1,
    backgroundColor: 'transparent'
  },
  btnStyle: {
    marginRight: width(3),
    width: (width(100) - width(10)) / 2,
    height: height(2.5)
  },
  viewBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  txtStyle: {
    width: width(100),
    marginRight: width(25),
    marginLeft: width(2),
    fontSize: width(3)
  }
})
