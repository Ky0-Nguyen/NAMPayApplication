import { StyleSheet } from 'react-native'

import { height, width } from 'react-native-dimension'

const scanCoverColor = '#44444488'
const scanRectWidth = width(70)

const styles = StyleSheet.create({
  cameraContainer: {
    width: width(100),
    height: height(100)
  },
  headerStyle: {
    backgroundColor: 'transparent'
  },
  lineScanner: {
    width: scanRectWidth
  },
  lineScannerAnim: {
    width: scanRectWidth,
    height: 2,
    backgroundColor: '#1dacf9'
  },
  scanContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
    // backgroundColor: '#FFFFFF',
  },
  scanLineLeftTop: {
    width: width(100),
    height: scanRectWidth / 2,
    backgroundColor: scanCoverColor,
    flexDirection: 'row'
  },
  lineTop: {
    borderBottomWidth: 4,
    borderBottomColor: 'blue',
    width: scanRectWidth / 7 + 4,
    height: scanRectWidth / 2,
    marginLeft: (width(100) - scanRectWidth) / 2 - 4
  },
  lineBottom: {
    borderBottomWidth: 4,
    borderBottomColor: 'blue',
    width: scanRectWidth / 7 + 4,
    height: scanRectWidth / 2,
    marginLeft: scanRectWidth - (scanRectWidth / 3.5)
  },
  scanLineCenter: {
    width: width(100),
    height: scanRectWidth,
    flexDirection: 'row'
  },
  lineCenter: {
    flex: 1,
    backgroundColor: scanCoverColor
  },
  lineCenterTop: {
    borderRightWidth: 4,
    borderRightColor: 'blue',
    height: scanRectWidth / 7
  },
  lineCenterBottom: {
    borderRightWidth: 4,
    borderRightColor: 'blue',
    height: scanRectWidth / 7,
    marginTop: scanRectWidth - (scanRectWidth / 3.5)
  },
  lineLeftTop: {
    borderLeftWidth: 4,
    borderLeftColor: 'blue',
    height: scanRectWidth / 7
  },
  lineLeftBottom: {
    borderLeftWidth: 4,
    borderLeftColor: 'blue',
    height: scanRectWidth / 7,
    marginTop: scanRectWidth - (scanRectWidth / 3.5)
  },
  lineRightContainer: {
    flex: 1,
    width: width(100),
    backgroundColor: scanCoverColor,
    flexDirection: 'row'
  },
  lineRightTop: {
    borderTopWidth: 4,
    borderTopColor: 'blue',
    width: scanRectWidth / 7 + 4,
    height: scanRectWidth / 2,
    marginLeft: (width(100) - scanRectWidth) / 2 - 4
  },
  lineRightBottom: {
    borderTopWidth: 4,
    borderTopColor: 'blue',
    width: scanRectWidth / 7 + 4,
    height: scanRectWidth / 2,
    marginLeft: scanRectWidth - (scanRectWidth / 3.5)
  }
})
export default styles
