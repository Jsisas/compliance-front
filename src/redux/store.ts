import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducer';

export interface ApiWrapper<T> {
	data: T;
}

const store = configureStore({
	reducer: rootReducer,
});

export default store;
