import { combineReducers } from 'redux';
import restaurentsNearMe from './RestaurentsNearMe';

const rootReducer = combineReducers({
    hotels: restaurentsNearMe,
});

export default rootReducer;