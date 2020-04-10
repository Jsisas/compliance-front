import courseReducer from './contorlSlice'
import { combineReducers } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
    course: courseReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;