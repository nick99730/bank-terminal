import {createStore, applyMiddleware} from 'redux';
import rootReducer from "../reducers/index";
import {initialState} from "../reducers/index"
import thunk from 'redux-thunk';


const store = createStore(rootReducer, initialState, applyMiddleware(thunk));
export default store;