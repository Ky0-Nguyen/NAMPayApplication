import { StyleSheet } from 'react-native'
import {width, height} from 'react-native-dimension'
import {COLOR} from 'common/GlobalConstants'
// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginBottom: height(7)
  },
  body: {
    flex: 9
  },
  footer: {
    flex: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -1 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    borderTopColor: '#c3c3c3',
    borderTopWidth: 1,
    backgroundColor: COLOR.BUTTON,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: height(1)
  },
  contTitle: {

  },
  btnSend: {
    justifyContent: 'center',
    alignItems: 'center',
    height: height(6),
    flex: 2
  },
  inp: {
    flex: 8,
    height: height(6),
    borderRadius: height(3),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: width(3),
    fontSize: width(4.5)
  },
  txtButton: {
    fontSize: width(4.5),
    color: '#FFFFFF',
    fontWeight: 'bold'
  },
  headerStyle: {
    backgroundColor: COLOR.BUTTON
  }
})
export default styles
