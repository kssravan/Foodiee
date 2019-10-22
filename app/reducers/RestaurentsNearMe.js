const initialState = {
    data: [],
    menu: [],
    checkout: []
};

const restaurentsNearMeReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch(type) {
        case 'FETCH_HOTELS':
            return { ...state, data: payload.data };
        case 'FETCH_MENU':
            const { daily_menus } = payload.data;
            const menu = daily_menus.reduce((acc, item) => {
                return [...acc, ...item.daily_menu.dishes];
            }, []);
            return { ...state, menu };
        case 'ADD_CHECKOUT_ITEM':
            const checkoutItem = payload.data;
            const item = state.checkout.find(item => item.dish.dish_id === checkoutItem.dish.dish_id);
            let checkout = [];
            if (item) {
                checkout = state.checkout.map(item => {
                    if (item.dish.dish_id === checkoutItem.dish.dish_id) {
                        return checkoutItem;
                    }
                    return item;
                });
            } else {
                checkout = [...state.checkout, checkoutItem];
            }
            return { ...state, checkout: checkout.filter(item => item.dish.quantity > 0)};
        case 'REMOVE_CHECKOUT_ITEM':
            const { data } = payload;
            const newCheckout = state.checkout.filter(item => item.dish.dish_id !== data.dish.dish_id);
            return { ...state, checkout: newCheckout };
        default:
            return state;
    }
}

export default restaurentsNearMeReducer;