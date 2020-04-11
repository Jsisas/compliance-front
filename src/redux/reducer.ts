import controlReducer from './Control/ControlSlice'
import userReducer from './User/UserSlice'
import { combineReducers } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
    user: userReducer,
    control: controlReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;