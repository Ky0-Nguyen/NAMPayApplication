import React from 'react'
import {TouchableHighlight, View, Text, StyleSheet} from 'react-native'
import {width, height} from 'react-native-dimension'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons'
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
/* ----------  constants Image  ---------- */
/* Top screen */

const icHome = <FontAwesome name={'home'} size={width(6)} color={'#111111'}/>
// const icPayment = <MaterialIcons name={'payment'} size={width(6)} color={'#111111'}/>
const icMore = <Ionicons name={'ios-more'} size={width(6)} color={'#111111'}/>

const icHomeBlue = <FontAwesome name={'home'} size={width(6)} color={'#299DFE'}/>
// const icPaymentBlue = <MaterialIcons name={'payment'} size={width(6)} color={'#104BBC'}/>
const icMoreBlue = <Ionicons name={'ios-more'} size={width(6)} color={'#299DFE'}/>

// |------------------------------|
// |--- RENDER MAIN VIEW START ---|
// |------------------------------|
const TabbarScreen = (props) => {
  const { goToPage, activeTab, style, tabs } = props
  const icons = [
    { key: 0, image: activeTab === 0 ? icHomeBlue : icHome },
    // { key: 1, image: activeTab === 1 ? icPaymentBlue : icPayment },
    { key: 3, image: activeTab === 3 ? icMoreBlue : icMore }
  ]
  return (
    <View style={[ styles.tabs, style ]}>
      {
        tabs.map((tab, i) => {
          const colorActive = {
            opacity: activeTab === i ? 1 : 0.5,
            justifyContent: 'center',
            alignItems: 'center'
          }
          colorTextActive = {
            color: activeTab === i ? '#104BBC' : '#111111'
          }
          return (
            <TouchableHighlight
              underlayColor={'#ffffff'}
              disabled={activeTab === i}
              ref={(icon) => { icons[i] = icon }}
              key={tab}
              onPress={() => goToPage(i)}
              style={styles.tab}>
              <View style={colorActive} >
                {icons[i].image}
                <Text numberOfLines={1} style={[styles.txtStyle, colorTextActive]}>{tab}</Text>
              </View>
            </TouchableHighlight>
          )
        })
      }
    </View>
  )
}
const styles = StyleSheet.create({
  tab: {
    flex: 1,
    height: height(8),
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#F0F0F0'
  },
  tabs: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    width: width(100),
    height: height(8),
    marginBottom: 0,
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: -2
  },
  txtStyle: {
    textAlign: 'center',
    fontSize: width(3)
  }
})
export default TabbarScreen
