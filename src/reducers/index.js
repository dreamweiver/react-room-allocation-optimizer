import { reducer as reduxFormReducer } from 'redux-form';
import {combineReducers } from 'redux';
import guestListReducer from "./guestListReducer";

// Combine both the reducers and return a finalReducer
const finalReducer = combineReducers({
  form: reduxFormReducer, // mounted under "form"
  guestList : guestListReducer
});

export default finalReducer;
