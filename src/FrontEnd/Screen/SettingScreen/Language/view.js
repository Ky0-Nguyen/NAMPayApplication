import React from 'react'
import { View, StyleSheet } from 'react-native'
import {CustomLoading, CustomRadio} from 'frontend/Components'
import { width, height } from 'react-native-dimension'
// Custom view
import {CoreLayout} from 'frontend/Container'

import I18n from 'react-native-i18n'
// styles

// Language

class CurrencyLanguageScreen extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      data: props.listLanguageData,
      iValueDefault: null,
      isLoading: true
    }
    props.funcDefaultThis(this)
  }

  componentDidMount () {
    this.props.funcInitialData()
    console.log('data +', this.state.data)
  }
  render () {
    const {handleBackRoute, onClickChoose} = this.props

    // setting defaule value when load screen
    const {iValueDefault, isLoading, data} = this.state
    // -----end---
    // |------------------------------|
    // |--- RENDER MAIN VIEW START ---|
    // |------------------------------|
    console.log('dât +++++', data)
    return (
      <CoreLayout
        titleColor={'#ffffff'}
        title={I18n.t('setting_screen_setting_languages_title')}
        leftAction={handleBackRoute}>
        {/* Navigation Bar custom */}
        <View style={styles.bottomViewMenu}>
          {/* radio button view */}
          <CustomRadio
            options={{ id: 'key', value: 'lang_name', disabled: 'selected', contentName: 'lang_name' }}
            innerStyle={styles.innerStyle}
            txtColor={'blue'}
            textStyle={styles.txtStyle}
            noneColor={'#efefef'}
            key={iValueDefault}
            selectedValue={iValueDefault}
            onValueChange={(id) => onClickChoose(id)}
            dataOption={data}
          />
        </View>
        <CustomLoading style={styles.modalLoading} isProcess={isLoading}/>
      </CoreLayout>
    )
  }
}

const styles = StyleSheet.create({
  bottomViewMenu: {
    height: height(87),
    width: width(100),
    backgroundColor: '#FFFFFF',
    alignItems: 'center'
  },
  innerStyle: {
    width: width(90),
    height: height(8),
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    alignSelf: 'center'
  },
  txtStyle: {
    color: '#111111',
    fontSize: width(4)
  },
  modalLoading: {
    top: height(25),
    backgroundColor: 'transparent'
  }
})
export default CurrencyLanguageScreen
