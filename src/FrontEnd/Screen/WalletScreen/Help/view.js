import React from 'react'
import {View, ScrollView} from 'react-native'
import {CoreLayout} from 'frontend/Container'

import styles from './styles'
import HTMLView from 'react-native-htmlview'
import Spinner from 'react-native-spinkit'
import {width} from 'react-native-dimension'

class Help extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      htmlView: null,
      isLoading: true
    }
    props.funcDefaultThis(this)
  }
  componentDidMount () {
    this.props.loadInitData()
  }
  render () {
    const {htmlView, isLoading} = this.state
    return (
      <CoreLayout title={'Help'} headerStyle={styles.headerStyle} titleColor={'#ffffff'}>
        <View style={styles.container}>
          {
            isLoading
              ? <View style={styles.contLoading}>
                <Spinner isVisible={isLoading} size={width(8)} type={'Circle'} color={'#111111'}/>
              </View>
              : <ScrollView
                style={styles.containerContent}>
                <HTMLView
                  value={htmlView}
                  stylesheet={styles}/>

              </ScrollView>
          }
        </View>
      </CoreLayout>
    )
  }
}
export default Help
