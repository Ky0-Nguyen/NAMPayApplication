import { StyleSheet } from 'react-native'
import { height, width } from 'react-native-dimension'

const PADDING = height(1)
const styles = StyleSheet.create({
  txtPlaceHolder: {
    color: '#C2C2C2'
  },
  textLabelStyle: {
    alignSelf: 'center',
    alignItems: 'flex-end',
    flexDirection: 'row'
  },
  placeHolderStyle: {
    alignSelf: 'center',
    justifyContent: 'center',
    position: 'absolute',
    flexDirection: 'row',
    width: width(90)
  },
  errorStyle: {
    alignItems: 'center',
    height: height(3),
    width: height(3),
    borderRadius: height(1.5),
    backgroundColor: 'red',
    justifyContent: 'center',
    alignSelf: 'center'
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    overflow: 'hidden'
  },

  textInput: {
    flex: 1,
    paddingHorizontal: PADDING,
    paddingVertical: 0
  }

})

export default styles
