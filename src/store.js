import { combineReducers, createStore } from "redux";
import acccountReducer from "./features/accounts/accountSlice";
import customerReducer  from "./features/customers/customerSlice";


const rootReducer = combineReducers({account:acccountReducer, customer:customerReducer})
const store = createStore(rootReducer);


export default store;