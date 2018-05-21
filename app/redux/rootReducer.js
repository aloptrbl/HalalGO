import { combineReducers } from 'redux';

import { reducer as authReducer } from "../modules/auth"
import { reducer as homeReducer } from "../modules/home"
import { reducer as addReducer } from "../modules/add"
import { reducer as navigateReducer } from "../modules/navigate"
import { reducer as profileReducer } from "../modules/profile"
import { reducer as searchReducer } from "../modules/search"

// Combine all the reducers
const rootReducer = combineReducers({ authReducer, homeReducer, addReducer, navigateReducer, profileReducer, searchReducer });

export default rootReducer;