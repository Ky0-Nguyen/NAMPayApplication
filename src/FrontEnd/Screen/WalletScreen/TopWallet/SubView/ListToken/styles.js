import {StyleSheet} from 'react-native'
import {width, height} from 'react-native-dimension'
// import {COLOR} from 'common/GlobalConstants'

const SubStyles = StyleSheet.create({
  contianer: {
    flex: 1,
    justifyContent: 'space-between'
  },
  contItem: {
    padding: height(3),
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  contentContainerStyle: {
    justifyContent: 'space-between'
  },
  columnWrapperStyle: {
    justifyContent: 'space-between'
  },
  contList: {
    height: height(43)
  },
  contButton: {
    height: height(7),
    flexDirection: 'row'
  },
  img: {
    width: width(18),
    height: width(18)
  },
  icon: {
    position: 'absolute'
  },
  contChildItem: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: height(1)
  },
  txtButton: {
    fontSize: width(4.5),
    color: '#ffffff'
  },
  btn: {
    width: width(45),
    borderRadius: 0,
    borderLeftWidth: 1,
    borderLeftColor: '#d3d3d3'
  }
})
export default SubStyles
