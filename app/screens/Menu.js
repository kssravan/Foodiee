import React, { PureComponent } from 'react'
import { FlatList, StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators }  from 'redux';
import * as homeActions from '../actions/HomeActions';

import InputSpinner from '../components/Spinner';

const styles = StyleSheet.create({
  menu: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 60,
    backgroundColor: 'white',
    padding: 10,
  },
  price: {
    color: 'grey',
    fontSize: 12,
  },
  addBtn: {
    width: 50,
    height: 30,
    borderWidth: 1,
    borderColor: 'green',
    alignContent:'center',
    justifyContent:'center',
  },
  btnTxt: {
    color: 'green',
    textAlign:'center'
  }
});

class Menu extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      menu: props.menu.map(item => ({ ...item, dish: { ...item.dish, quantity: 0 }})),
    }
  }

  static navigationOptions = {
    title: 'Menu',
  };
    componentDidMount() {
      const { actions, navigation } = this.props;
      actions.fetchMenu(navigation.getParam('id'));
    }

    componentDidUpdate(prevProps) {
      const { menu } = this.props;
      if (menu !== prevProps.menu) {
        this.setState({
          menu: menu.map(item => ({ ...item, dish: { ...item.dish, quantity: 0 }})),
        });
      }
    }

    onQuantityChange = (val, item, itemIndex) => {
      let selectedItem;
      const { menu } = this.state;
      const { actions } = this.props;
      const newMenu = menu.map((item, index) => {
        if (index === itemIndex) {
          selectedItem = { ...item, dish: { ...item.dish, quantity: val }};
          return selectedItem;
        }
        return item;
      });

      this.setState({ menu: newMenu }, () => {
        actions.addCheckoutItem(selectedItem);
      });

    }


    onAddItem = (item, itemIndex) => {
      let newItem;
      const { menu } = this.state;
      const { actions } = this.props;
      const newMenu = menu.map((item, index) => {
        if (index === itemIndex) {
          newItem = { ...item, dish: { ...item.dish, quantity: 1 }}
          return newItem;
        }
        return item;
      });

      this.setState({ menu: newMenu }, () => {
        actions.addCheckoutItem(newItem);
      });
    }

    renderMenu = ({ item, index }) => (
      <View style={styles.menu}>
        <View style={{ flex: 0.7 }}>
          <Text>{item.dish.name}</Text>
          <Text style={styles.price}>{`Price ${item.dish.price}`}</Text>
        </View>
        <View style={{ justifyContent: 'center' }}>
          {item.dish.quantity === 0 && <TouchableOpacity onPress={() => this.onAddItem(item, index)} style={styles.addBtn}><Text style={styles.btnTxt}>Add</Text></TouchableOpacity>}
          {item.dish.quantity !== 0 && <InputSpinner onChange={(val) => this.onQuantityChange(val, item, index)} value={item.dish.quantity} />}
        </View>
      </View>
    )

    render() {
        const { menu } = this.state;

        return (
          <FlatList
            data={menu}
            renderItem={this.renderMenu}
            keyExtractor={item => item.dish.dish_id}
          />
        );
    }
}

export default connect((state) => ({
  menu: state.hotels.menu,
}), (dispatch) => ({
  actions: bindActionCreators(homeActions, dispatch),
}))(Menu);


