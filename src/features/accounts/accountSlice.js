import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

const accountSlice = createSlice({
  name: "account",
  initialState: initialState,
  reducers: {
    deposit(state, action) {
      state.balance = state.balance + action.payload;
      state.isLoading=false;
    },
    convertingCurrency(state){
      state.isLoading = true;
    },
    withdraw(state, action) {
      state.balance = state.balance - action.payload;
    },
    requestLoan: {
      prepare(amount, purpose) {
        return { payload: { amount, purpose } };
      },
      reducer(state, action) {
        if (state.loan > 0) return;
        state.loan = action.payload.amount;
        state.balance = state.balance + action.payload.amount;
        state.loanPurpose = action.payload.purpose;
      },
    },
    payLoan(state, action) {
      if (state.loan > state.balance) return;
      state.balance = state.balance - state.loan;
      state.loan = 0;
      state.loanPurpose = "";
    },
  },
});

export function deposit(amount, currency) {
    if (currency === "INR") return { type: "account/deposit", payload: amount };
  
    return async function (dispatch, getState) {
      dispatch({ type: "account/convertingCurrency" });
      //API call
      const res = await fetch(
        `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=INR`
      );
      const data = await res.json();
      const converted = data.rates.INR;
      dispatch({ type: "account/deposit", payload: converted });
    };
  };

export const {withdraw, requestLoan, payLoan } = accountSlice.actions;
export default accountSlice.reducer;
