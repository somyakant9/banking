import acccountReducer from "./features/accounts/accountSlice";
import customerReducer  from "./features/customers/customerSlice";

import { configureStore } from "@reduxjs/toolkit";


const store = configureStore({reducer:{account:acccountReducer, customer:customerReducer}});


export default store;