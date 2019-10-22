/**
 * @format
 */

import 'react-native';
import React from 'react';
import Restaurants from '../app/screens/RestaurantsNearMe';
import Menu from '../app/screens/Menu';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(<Restaurants />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('Menu renders correctly', () => {
  renderer.create(<Menu />);
});


const dish = {
  dish: {
    name: 'Hotel1',
    price: '25 $',
    quantity: 0,
  }
}
// Add Menu
it('Add Menu success', () => {
  const tree = renderer.create(<App />).getInstance();
  tree.onAddItem(dish, 0);
  setTimeout(() => {
    expect(tree.state.menu.length).toBeGreaterThan(0);
  }, 2000)
});