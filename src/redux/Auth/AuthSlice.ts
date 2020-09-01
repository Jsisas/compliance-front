import { createEntityAdapter, createSelector, createSlice, EntityState } from '@reduxjs/toolkit';

import { RootState } from '../reducer';
import { notifyError, notifySuccess } from '../../util/NotificationUtil';
import { authenticate } from './AuthService';

export interface Authentication {
	token: string;
	user: AuthUser;
}

export interface AuthUser {
	id: string;
	name: string;
	picture: string;
	username: string;
}

const authenticationsAdapter = createEntityAdapter<Authentication>({
	selectId: (auth) => auth.token,
	sortComparer: (a, b) => a.user.name.localeCompare(b.user.name),
});

const authenticationInitialState: EntityState<Authentication> = authenticationsAdapter.getInitialState();
const authenticationSelectors = authenticationsAdapter.getSelectors((state: RootState) => state.auth);

export const getAuthentication = createSelector(authenticationSelectors.selectAll, (items) => items[0]);

const AuthSlice = createSlice({
	name: 'authentication',
	initialState: { ...authenticationInitialState, isAuthenticated: false, loading: false },
	reducers: {
		clearAuth: (state) => {
			authenticationsAdapter.setAll(state, []);
			state.isAuthenticated = false;
			localStorage.removeItem('auth');
		},
	},
	extraReducers: (builder) => {
		builder.addCase(authenticate.fulfilled, (state, action) => {
			authenticationsAdapter.setAll(state, [action.payload]);
			state.isAuthenticated = true;
			localStorage.setItem('auth', JSON.stringify(action.payload));
			notifySuccess('Log in', 'Logging in was successful');
		});
		builder.addCase(authenticate.rejected, () => {
			clearAuth();
			notifyError('Log in', 'Logging in failed');
		});
	},
});

export const { clearAuth } = AuthSlice.actions;
export default AuthSlice.reducer;
