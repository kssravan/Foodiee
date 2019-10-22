import { api, API_KEY, BASE_URL, getHeaders } from '../app.config';

const endPoints = {
    fetchHotels: {
        url: `${BASE_URL}/geocode`,
        actionType: 'FETCH_HOTELS',
    },
    fetchMenu: {
        url: `${BASE_URL}/dailymenu`,
        actionType: 'FETCH_MENU',
    }
}

export function fetchRestaurants(params) {
    return (dispatch) => {
        const { url, actionType: type } = endPoints.fetchHotels;
        return api.get(url, { params })
            .then(function (response) {
                console.log('Request Response', response.data);
                dispatch({ type, payload: { data: response.data }})
                return { response: response.data };
            })
            .catch(function (error) {
                console.log(error.response);
                console.log('Response error reading data from json file.');
                return { error: error.response };
            });
    }
}

export function fetchMenu(id) {
    const params = { res_id: 16507624 };
    return (dispatch) => {
        const { url, actionType: type } = endPoints.fetchMenu;
        return api.get(url, { params })
            .then(function (response) {
                dispatch({ type, payload: { data: response.data }})
                return { response: response.data };
            })
            .catch(function (error) {
                console.log(error.response);
                return { error: error.response };
            });
    }
}

export const addCheckoutItem = (item) => dispatch => {
    dispatch({ type: 'ADD_CHECKOUT_ITEM', payload: { data: item }});
}

export const removeCheckoutItem = (item) => dispatch => {
    dispatch({ type: 'REMOVE_CHECKOUT_ITEM', payload: { data: item }});
}


