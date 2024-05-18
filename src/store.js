import { applyMiddleware, combineReducers, createStore } from "redux";
import acccountReducer from "./features/accounts/accountSlice";
import customerReducer  from "./features/customers/customerSlice";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";

const rootReducer = combineReducers({account:acccountReducer, customer:customerReducer})
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));


export default store;