import { createEntityAdapter, createSlice, EntityState, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../reducer';

export interface Error {
	code: number;
	name: string;
	message: string;
}

const errorsAdapter = createEntityAdapter<Error>({
	selectId: (error) => error.code,
});

const errorInitialState: EntityState<Error> = errorsAdapter.getInitialState();
const errorSelectors = errorsAdapter.getSelectors((state: RootState) => state.error);

export const selectAllErrors = errorSelectors.selectAll;

const ErrorSlice = createSlice({
	name: 'error',
	initialState: { ...errorInitialState },
	reducers: {
		setError(state, action: PayloadAction<Error>) {
			errorsAdapter.upsertOne(state, action.payload);
		},
		clearError(state) {
			errorsAdapter.removeAll(state);
		},
	},
});

export const { setError, clearError } = ErrorSlice.actions;
export default ErrorSlice.reducer;
