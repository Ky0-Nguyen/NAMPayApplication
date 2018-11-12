import {StyleSheet} from 'react-native'
import {width, height} from 'react-native-dimension'
import {COLOR} from 'common/GlobalConstants'

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    paddingVertical: height(5),
    backgroundColor: 'white'
  },
  messageModal: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    paddingVertical: height(3),
    width: width(100),
    backgroundColor: 'white'
  },
  viewAlertContainer: {
    width: width(10),
    padding: width(1)
  },
  messageStyle: {
    textAlign: 'center',
    opacity: 1,
    marginLeft: width(1),
    fontWeight: 'normal',
    color: 'black',
    backgroundColor: 'transparent'
  },
  androidMessageStyle: {
    opacity: 1,
    marginLeft: width(1),
    fontWeight: 'normal',
    color: 'black',
    backgroundColor: 'transparent'
  },
  viewContainer: {
    position: 'absolute',
    height: height(100),
    width: width(100),
    zIndex: 5
  },
  backDropContainer: {
    position: 'absolute',
    opacity: 0.5,
    backgroundColor: 'black',
    height: height(100),
    width: width(100)
  },
  defaultContainer: {
    justifyContent: 'center',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    alignItems: 'center',
    paddingTop: height(2),
    backgroundColor: 'white',
    opacity: 1,
    width: width(90),
    borderRadius: 10
  },
  textContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    paddingVertical: height(4),
    width: width(100),
    backgroundColor: 'white'
  },
  containerStyle: {
    flexDirection: 'row'

  },
  contAndroidText: {
    width: width(60),
    alignItems: 'center'
  },
  contAlertActive: {
    width: width(90),
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    top: height(35),
    paddingVertical: height(3)
  },
  contButton: {
    height: height(6),
    width: width(90),
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'black',
    flexDirection: 'row'
  },
  btn: {
    width: width(90),
    height: height(6),
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: COLOR.BUTTON
  },
  btnTry: {
    width: width(50),
    height: height(6),
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: '#FFFFFF'
  },
  txtButton: {
    fontSize: width(4),
    fontWeight: 'bold',
    color: '#fff'
  },
  internetContent: {
    height: height(100),
    width: width(100),
    backgroundColor: COLOR.BUTTON,
    padding: 5,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    position: 'absolute'
  },
  txtInternet: {
    opacity: 1,
    width: width(80),
    fontSize: width(5),
    color: '#FFFFFF',
    marginVertical: height(2),
    textAlign: 'center'
  },
  txtButtonTry: {
    opacity: 1,
    fontSize: width(5),
    color: COLOR.BUTTON
  }
})
export default styles
