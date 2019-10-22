import React, { Component } from 'react'
import { FlatList, StyleSheet, View, PermissionsAndroid, Platform, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators }  from 'redux';
import NetInfo from '@react-native-community/netinfo'
import Geolocation from '@react-native-community/geolocation';
// import { getHotels } from './app.selectors';
import * as homeActions from '../actions/HomeActions';
import Hotel from '../components/Hotel';

class RestaurantsNearMe extends Component {
    state = {
        currentLongitude: 'unknown',//Initial Longitude
        currentLatitude: 'unknown',//Initial Latitude
    }

    static navigationOptions = {
        title: 'Home',
      };

    componentDidMount() {
        NetInfo.fetch().then(state => {
            console.log("Connection type", state.type);
            this.setState({ isInternetConnected: state.isConnected })
            console.log("Is connected?", state.isConnected);
            //Checking for the permission just after component loaded

            if (Platform.OS === 'ios') {
                this.callLocation();
            } else {
                const requestLocationPermission = async () => {
                    try {
                        const granted = await PermissionsAndroid.request(
                            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
                            'title': 'Location Access Required',
                            'message': 'This App needs to Access your location'
                        }
                        )
                        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                            //To Check, If Permission is granted
                            this.callLocation();
                        } else {
                            alert("Permission Denied");
                        }
                    } catch (err) {
                        alert("err", err);
                        console.warn(err)
                    }
                }
                requestLocationPermission();
            }


        });
    }

    callLocation = () => {
        Geolocation.getCurrentPosition(
            //Will give you the current location
            (position) => {
                this.updateLocation(position)
            },
            (error) => alert(error.message),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
        this.watchID = Geolocation.watchPosition((position) => {
            //Will give you the location on location change
            this.updateLocation(position)
        });
    }

    updateLocation = (position) => {
        console.log(position);
        const { latitude, longitude } = position.coords;

        this.setState({ currentLongitude: longitude, currentLatitude: latitude });
        this.fetchRestaurants();
    }

    componentWillUnmount = () => {
        Geolocation.clearWatch(this.watchID);
    }

    fetchRestaurants = () => {
        const { actions } = this.props;
        const { currentLatitude, currentLongitude } = this.state;
        actions.fetchRestaurants({ lat: currentLatitude, lon: currentLongitude });
    }

    onHotelPress = (hotel) => {
        const { navigation } = this.props;
        navigation.push('menu', { id: hotel.id });
    }

    render() {
        const { hotels } = this.props;
        return (
            <FlatList
                data={hotels}
                style={styles.mainContainerStyle}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => this.onHotelPress(item.restaurant)}>
                        <Hotel data={item} />
                    </TouchableOpacity>
                )}
                keyExtractor={item => item.restaurant.id}
            />
        );
    }
}

const styles = StyleSheet.create({
    mainContainerStyle: {
        flex: 1,
        backgroundColor: 'lightgrey',
    },
});

export default connect((state) => ({
    hotels: state.hotels.data.nearby_restaurants || [],
}), (dispatch) => ({
    actions: bindActionCreators(homeActions, dispatch),
}))(RestaurantsNearMe);

