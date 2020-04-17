import controlReducer from './Control/ControlSlice'
import userReducer from './User/UserSlice'
import regulationReducer from './Regulation/RegulationSlice'
import { combineReducers } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
    user: userReducer,
    control: controlReducer,
    regulation: regulationReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;