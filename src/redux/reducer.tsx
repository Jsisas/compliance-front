import courseReducer from '../pages/Controls/ControlSlice'
import { combineReducers } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
    course: courseReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;