import React from 'react'
import {View, FlatList, Text, Image, TouchableOpacity} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import {width} from 'react-native-dimension'
import {STYLE} from 'common/GlobalConstants'
import I18n from 'react-native-i18n'
// style
import styles from './styles'
const _keyExtractor = (item, index) => item.token_id
class ListTokenScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      selected: undefined,
      tokenList: props.tokenList,
      dataSymbol: []
    }
  }
  componentDidMount () {
    const {tokenListOfUser} = this.props
    let dataSymbol = tokenListOfUser.map(item => item.token_symbol)
    console.log('dataSymbol', dataSymbol)
    this.setState({ dataSymbol })
  }
  onClickSelect =(index) => () => {
    console.log('index', index)
    this.setState({ selected: index })
  }
  onClickAdd = () => {
    this.props._closeModal()
    this.props.handleAddToken(this.state.tokenList[this.state.selected])
  }
  _renderItem =({item, index}) => {
    let styleImg = [styles.img, { opacity: this.state.selected === index ? 0.5 : 1 }]
    let styleContItem = [styles.contItem, {opacity: this.state.dataSymbol.includes(item.token_symbol) ? 0.5 : 1}]
    return (
      <View pointerEvents={this.state.dataSymbol.includes(item.token_symbol) ? 'none' : 'box-none'}>
        <TouchableOpacity onPress={this.onClickSelect(index)}>
          <View style={styleContItem}>
            <View style={styles.contChildItem}>
              <Image
                style={styleImg}
                resizeMode={'contain'}
                source={{
                  uri: item.token_photo
                }}/>
              {this.state.selected === index && <FontAwesome style={styles.icon} name={'check-circle'} size={width(10)} color={'green'}/>}
            </View>
            <Text>{item.token_name}</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
  render () {
    const {tokenList, selected} = this.state
    return (
      <View style={styles.container}>
        <View style={styles.contList}>
          <FlatList
            data={tokenList}
            extraData={this.state}
            keyExtractor={_keyExtractor}
            renderItem={this._renderItem}
            numColumns={3}
            contentContainerStyle={styles.contentContainerStyle}
            columnWrapperStyle={styles.columnWrapperStyle}
          />
        </View>
        <View style={styles.contButton}>
          <TouchableOpacity style={[STYLE.BUTTON, STYLE.BUTTON_DISABLE, styles.btn]} onPress={this.props._closeModal}>
            <Text style={styles.txtButton}>{I18n.t('common_button_cancel')}</Text>
          </TouchableOpacity>
          <View pointerEvents={selected !== undefined ? 'box-none' : 'none'}>
            <TouchableOpacity onPress={this.onClickAdd}>
              <View style={[STYLE.BUTTON, selected === undefined && STYLE.BUTTON_DISABLE, styles.btn]}>
                <Text style={styles.txtButton}>{'Add'}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}
export default ListTokenScreen
