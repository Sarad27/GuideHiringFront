import { combineReducers } from 'redux';

import userReducer from "./Authentication/userReducer";
import profileReducer from "./Authentication/profileReducer"

const rootReducer = combineReducers({

    user: userReducer,
    profile: profileReducer

});

export default rootReducer;