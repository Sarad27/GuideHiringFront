import { combineReducers } from 'redux';

import userReducer from "./Authentication/userReducer";
import profileReducer from "./Authentication/profileReducer"
import socketReducer from "./Authentication/socketReducer"

const rootReducer = combineReducers({

    user: userReducer,
    profile: profileReducer,
    socket: socketReducer

});

export default rootReducer;