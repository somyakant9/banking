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

// function acccountReducer(state = initialStateAccount, action) {
//   switch (action.type) {
//     case "account/deposit":
//       return {
//         ...state,
//         isLoading: false,
//         balance: state.balance + (+action.payload),
//       };
//     case "account/convertingCurrency":
//       return { ...state, isLoading: true };
//     case "account/withdraw":
//       return { ...state, balance: state.balance - (+action.payload) };
//     case "account/requestLoan":
//       if (state.loan > 0) return state;
//       return {
//         ...state,
//         loan: action.payload.amount,
//         balance: state.balance + action.payload.amount,
//         loanPurpose: action.payload.purpose,
//       };
//     case "account/payLoan":
//       if(state.loan>state.balance) return state;
//       return {
//         ...state,
//         loan: 0,
//         loanPurpose: "",
//         balance: state.balance - state.loan,
//       };
//     default:
//       return state;
//   }
// }

// export function deposit(amount, currency) {
//   if (currency === "INR") return { type: "account/deposit", payload: amount };

//   return async function (dispatch, getState) {
//     dispatch({ type: "account/convertingCurrency" });
//     //API call
//     const res = await fetch(
//       `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=INR`
//     );
//     const data = await res.json();
//     const converted = data.rates.INR;
//     dispatch({ type: "account/deposit", payload: converted });
//   };
// }
// export function withdraw(amount) {
//   return { type: "account/withdraw", payload: amount };
// }
// export function requestLoan(amount, purpose) {
//   return { type: "account/requestLoan", payload: { amount, purpose } };
// }
// export function payLoan() {
//   return { type: "account/payLoan" };
// }

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
