import React, { PureComponent } from 'react'
import { FlatList, StyleSheet, TouchableOpacity, View, Text, Image } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators }  from 'redux';
import * as homeActions from '../actions/HomeActions';
import deleteIcon from '../resources/assets/images/delete.jpg'

class Checkout extends PureComponent {

  static navigationOptions = {
    title: 'Checkout',
  };

    onRemoveItem = (item) => {
      const { actions } = this.props;
      actions.removeCheckoutItem(item);
    }

    renderCheckout = ({ item, index }) => (
      <View style={styles.menu}>
        <TouchableOpacity onPress={() => this.onRemoveItem(item, index)} style={styles.removeBtn} >
        <Image source={deleteIcon} style={styles.imageStyle}></Image>
      </TouchableOpacity>
        <View style={{ flex: 0.8 }}>
          <Text>{item.dish.name}</Text>
          <Text style={styles.price}>{`Price: ${item.dish.price}`}</Text>
          <Text style={styles.price}>{`quantity: ${item.dish.quantity}`}</Text>
        </View>
      </View>
    )

    render() {
        const { checkout } = this.props;
        return (
          <FlatList
            data={checkout}
            renderItem={this.renderCheckout}
            keyExtractor={item => item.dish.dish_id}
          />
        );
    }
}

export default connect((state) => ({
  checkout: state.hotels.checkout,
}), (dispatch) => ({
  actions: bindActionCreators(homeActions, dispatch),
}))(Checkout);

const styles = StyleSheet.create({
  menu: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: 'white',
    padding: 10,
  },
  price: {
    color: 'grey',
    fontSize: 12,
  },
  removeBtn: {
    width: 60,
    height: 20,
  },
  btnTxt: {
    color: 'red',
  },
  imageStyle: {
    width:40,
    height:40
  }
});