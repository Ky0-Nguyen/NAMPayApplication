import React from 'react'
import {View, ScrollView, StyleSheet} from 'react-native'
import {CoreLayout} from 'frontend/Container'
import HTMLView from 'react-native-htmlview'
import Spinner from 'react-native-spinkit'
import LinearGradient from 'react-native-linear-gradient'
import {width, height} from 'react-native-dimension'

export default class view extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      title: '',
      htmlView: '',
      enableBtn: false,
      isLoading: true
    }
    props.funcDefaultThis(this)
  }
  componentDidMount () {
    this.props.loadingInittialData()
  }
  render () {
    const {handleBackRoute} = this.props
    const {htmlView, isLoading, title} = this.state
    console.log('htmlView +++', htmlView)
    return (
      <CoreLayout title={title} leftAction={handleBackRoute}>
        <LinearGradient colors={['#299DFE', '#3CB8FD', '#45C3FC']} style={styles.container}>
          <View style={styles.contLoading}>
            {
              isLoading
                ? <Spinner isVisible={isLoading} size={width(8)} type={'Circle'} color={'#111111'}/>
                : <ScrollView
                  style={styles.containerContent}>
                  <HTMLView
                    value={htmlView}
                    stylesheet={styles}/>
                </ScrollView>
            }
          </View>
        </LinearGradient>
      </CoreLayout>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  containerContent: {
    alignSelf: 'center',
    height: height(68),
    width: width(84),
    marginVertical: height(2),
    backgroundColor: '#FFFFFF',
    borderRadius: 5
  },
  contLoading: {
    height: height(84),
    width: width(90),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    marginVertical: height(2),
    padding: width(3)
  }
})
