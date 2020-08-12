import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducer';
import { Authentication } from './Auth/AuthSlice';
import { getPreloadedState } from '../util/ObjectToStateEntityUtil';

export interface ApiWrapper<T> {
	data: T;
}

const initialAuthentication = JSON.parse(localStorage.getItem('auth') || '{}') as Authentication;
const preloadedState = initialAuthentication.token ? getPreloadedState({ auth: [initialAuthentication] }) : {};

const store = configureStore({
	reducer: rootReducer,
	preloadedState: preloadedState,
});

export default store;
