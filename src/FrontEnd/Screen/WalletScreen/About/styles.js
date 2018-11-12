import {StyleSheet} from 'react-native'
import {width, height} from 'react-native-dimension'
import {COLOR} from 'common/GlobalConstants'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerStyle: {
    backgroundColor: COLOR.BUTTON
  },
  containerContent: {
    alignSelf: 'center',
    height: height(70),
    width: width(90)
  },
  contLoading: {
    flex: 8.5,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
export default styles
