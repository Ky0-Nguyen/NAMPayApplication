// import liraries
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import CustomModal from 'frontend/Components/CustomModal'
import {width, height} from 'react-native-dimension'
import Spinner from 'react-native-spinkit'
import I18n from 'react-native-i18n'
import {COLOR} from 'common/GlobalConstants'

const MyClass = ({isProcess, style}) => {
  return (
    <CustomModal style={[styles.modalLoading, style]} isShowModal={isProcess}>
      <View style={styles.loadingPage}>
        <Spinner isVisible={isProcess} size={width(6)} type={'Circle'} color={COLOR.BUTTON}/>
        <Text style={styles.txtLoading}>{I18n.t('common_loading_data')}</Text>
      </View>
    </CustomModal>
  )
}
// define your styles
const styles = StyleSheet.create({
  modalLoading: {
    top: height(25),
    backgroundColor: 'transparent'
  },
  txtLoading: {
    top: height(2),
    fontSize: width(6),
    color: '#111'
  },
  loadingPage: {
    padding: height(3),
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    alignSelf: 'center'
  }
})

// make this component available to the app
export default MyClass
