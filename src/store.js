import { applyMiddleware, combineReducers, createStore } from "redux";
import acccountReducer from "./features/accounts/accountSlice";
import customerReducer  from "./features/customers/customerSlice";
import { thunk } from "redux-thunk";


const rootReducer = combineReducers({account:acccountReducer, customer:customerReducer})
const store = createStore(rootReducer, applyMiddleware(thunk));


export default store;