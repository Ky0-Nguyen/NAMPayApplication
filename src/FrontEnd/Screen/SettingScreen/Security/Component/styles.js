import { StyleSheet } from 'react-native'
import { width, height } from 'react-native-dimension'

export default styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
    alignItems: 'center',
    zIndex: 500
  },
  subContainer: {
    height: height(100),
    width: width(100),
    position: 'absolute',
    zIndex: 550,
    backgroundColor: 'black',
    opacity: 0.5
  },
  contentContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    height: height(25),
    width: width(90),
    marginHorizontal: width(5),
    borderRadius: 10,
    marginTop: height(25),
    zIndex: 600
  },
  viewLogo: {
    height: height(7),
    width: width(90),
    justifyContent: 'center',
    alignItems: 'center'
  },
  viewBtn: {
    height: height(7),
    width: width(90),
    borderTopWidth: 1,
    borderColor: '#b9b8b8',
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    height: width(8),
    width: width(8)
  },
  heading: {
    textAlign: 'center',
    fontSize: width(4.5),
    fontWeight: 'bold',
    color: 'black'
  },
  txtContent: {
    textAlign: 'center',
    color: 'black'
    // fontSize: width(4)
  },
  description: {
    textAlign: 'center',
    color: '#a5a5a5',
    height: 65,
    fontSize: 18,
    marginVertical: 10,
    marginHorizontal: 20
  },
  buttonContainer: {
    height: height(7),
    width: width(90),
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: '#007ff7',
    fontSize: 15,
    fontWeight: 'bold'
  },
  viewTxt: {
    height: height(11) - 1,
    width: width(90),
    justifyContent: 'center',
    alignItems: 'center'

  },
  // application
  containerApp: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00a4de'
  },
  headingApp: {
    color: '#ffffff',
    fontSize: 22,
    marginTop: 30,
    marginBottom: 5
  },
  subheading: {
    color: '#ffffff',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 30
  },
  fingerprint: {
    padding: 20,
    marginVertical: 30
  }

})
