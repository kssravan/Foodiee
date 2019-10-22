import React from 'react';
import { Text, StyleSheet, View, Image } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex:1,
    flexDirection:'row'
  },
  hotelStyle: {
    flex:1,
    flexDirection:'row',
    backgroundColor: 'white',
    padding: 10,
    // height: 60,
    margin: 5,
  },
  locationImage: {
    width: 80,
    height: 80,
  },
  contextView: {
    flex:1,
    paddingLeft:10
  },
  hotelName: {
    flex:1,
  },
});

const Hotel = ({ data }) => {
  const { name, thumb, cuisines, user_rating } = data.restaurant;
  console.log(user_rating)

  return (
    <View style={styles.hotelStyle}>
      <Image source={{ uri: thumb }} style={styles.locationImage}></Image>
      <View style = {styles.contextView}> 
        <Text style = {styles.hotelName}>{name}</Text>
        <Text style = {styles.hotelName}>{cuisines}</Text>
      </View>
      <Text style = {styles.hotelName, {color: user_rating.rating_color}}>{user_rating.aggregate_rating}</Text>

    </View>
  );
}

export default Hotel;